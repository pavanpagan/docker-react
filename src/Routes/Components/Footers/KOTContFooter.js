import React, { Component } from "react";
import { Grid, Row, Col, Table, Button,FormGroup,FormControl,Form,InputGroup,Glyphicon ,Modal} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import  SweetAlert from 'react-bootstrap-sweetalert';
import axios from'axios';
import { Icon } from "react-icons-kit";
import validator from 'validator';
import {ic_send} from 'react-icons-kit/md/ic_send'
import Select from 'react-select';
import ReactToPrint from "react-to-print";
import moment  from 'moment-timezone';
import Billing from '../extra/Billing';
let p=0;
let items=[]
const API_URL = process.env.REACT_APP_API_URL;
let arr=[]
 class KOTContFooter extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      total_price:'',
      order_id:0,
      alert_message:null ,
      alert_state_success: false,
      print_confirm:false,
      alert_state_warning:false,
      alert_state_danger:false,
      bill_confirm:false,
      bill_show:false,
      room_show:false,
      show: false,
      room_number:[],
      room_num_selected:'Room',
      room_id_selected:'',
      cust_name_selected:'',
      table_call:false,

      resp_billno:'',
      resp_date:'',
      resp_tableNumber:'',
      resp_totalAmount:'',
      resp_tax:'',
      resp_taxaAmount:'',
      resp_kotList:[{
        items:[]
      }]
    }
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose()
  {
    this.setState({ show: false,
      room_num_selected:'Room' });
  }

  handleClear(itemName)
  {
    this.props.handleClear(itemName);
  }

 checkAndAdd(ids,names,prices)
  {
  //  var id = arr.length + 1;
  let name=names;
  let price=prices;
  let id=ids;

  
    var found = arr.some(function (el) 
    {
      if(el.name == name && el.price==price)
      {
        return el.name;
      }
    });
 
    if (!found) 
    { 
      arr.push({ id: id, name: name,quantity:1,price:price}); 
    }
    else
    {
      for (let i=0;i<arr.length;i++)
      {
        if (arr[i].name == name && arr[i].price==price) 
        {
           arr[i].quantity = arr[i].quantity+1;
           break; 
        }
      }
  }
  console.log("array",arr);
  }
  componentDidUpdate()
  {
      let item_name=this.props.itemName;
      let item_price=this.props.price;
      let item_id=this.props.id;
      let q_id=this.props.q_id;

      p=this.props.price;
      let f=0;
      let allitems=[];
      for(var i=0;i<item_name.length;i++)
      {
           allitems.push({
            "item_name": item_name[i],
            "item_price": item_price[i],
            "id":item_id[i],
            "q_id":q_id[i]
       });
      }
      var temp = [];
 
      var newhh = [];
      
     for(var i=0;i<allitems.length;i++)
      {
        if(temp.indexOf(allitems[i].item_name+allitems[i].item_price) == -1)
        {
          temp.push(allitems[i].item_name+allitems[i].item_price);
           var _data = {};
           _data.it_id = allitems[i].id;
           _data.price = allitems[i].item_price;
           _data.q_id = allitems[i].q_id;
           _data.note = '';
           _data.quantity = 1;
           newhh.push(_data);
        }
        else
        {
          for(var j=0;j<newhh.length;j++)
          {
              if(newhh[j].it_id === allitems[i].id && newhh[j].price === allitems[i].item_price )
              {
                 var _x = parseInt(newhh[j].quantity) + 1;
                 newhh[j].quantity = _x;
              }
          }
        }
      }
       items=newhh;
       let prices = [this.props.price];
        let sum = 0;
        let k=sum;
        for (var i = 0; i < prices[0].length; i++)
        {
          sum += prices[0][i]
        }
        if(sum!==this.state.total_price)
        {
          this.setState({
            total_price:sum
          })
        }
  }

  async componentWillMount()
  {
    const resp= await axios.get(API_URL+'/hms/kot/order_id/'+this.props.table_id);
    if(resp.data[0])
    {
     this.setState({
        order_id:resp.data[0].order_id
      })
    }

    if(this.props.table_status==='Billed')
    {
      this.setState({
        bill_show:true
      })
    }
    if(this.props.floor_name==='ROOM')
    {
      this.setState({
        room_show:true
      })
    }

    let options=[];
    this.props.room_with_name.map(data=>{
      options.push({value:data.customer_fname,label:data.room_num,id:data.rooms_id})
     })
     this.setState({
       room_number:options
     })
   this.setState({
    table_split:this.props.table_split,
    table_number:this.props.table_number,
    tab_id:this.props.table_id
   })


  }
  handleSelect = (room_number) => {
    this.setState({
      cust_name_selected:room_number.value,
      room_id_selected:room_number.id,
      room_num_selected:room_number.label

     });
  }
  printCall(e)
  {
    this.submitData('Ordered','Billed','waiting')
  }

  paidCall(e)
  {
    this.submitData('Closed','Empty','paid');
  }

  async submitData(ostatus,tstatus,billstatus)
  {
  try
  {
    if(this.state.order_id!==0)
    {
     let data_tax={
       tax:this.props.tax,
       table_split:this.state.table_split,
       table_number:this.state.table_number,
       tab_id:this.state.table_id,
       order_status:ostatus,
       table_status:tstatus,
       pay_status:billstatus,
       room_show:this.state.room_show
     }

     const resp= await axios.put(API_URL+'/hms/kot/bill/'+this.state.order_id,{data_tax});
     if(resp.status===200)
     {
       let itemsAll=[];
      await resp.data[0].billing_data.kot_list.map(list=>{
        list.items.map(items=>{
          return(
            itemsAll.push({
              "item_name":items.item_name,
              "quantity":parseInt(items.quantity),
              "price":parseInt(items.price),
            })
          )
        })
        })
      await this.setState({
        resp_billno:resp.data[0].billing_data.billing_id,
        resp_date:resp.data[0].billing_data.date_time,
        resp_totalAmount:resp.data[0].billing_data.total_amount,
        resp_taxaAmount:resp.data[0].billing_data.tax_amount
       })
       await setTimeout(async()=>{ 
        if(ostatus==='Closed' || this.state.table_call)
        {
         await  this.setState({
           alert_message:"Billing Success..!",
           bill_confirm:true
         })
         await this.handleClear(this.props.itemName)
        }
        else
        {
         await  this.setState({
           alert_message:"Billing successfull..!",
           print_confirm:true,
           bill_show:true
         })
        }
      }, 100);
     }
     else
     {
       this.setState({
         alert_message:"Billing Not Done..!",
         alert_state_danger:true
       })
     }
    }
    else
    {
     this.setState({
       alert_message:"Order Not Done..!",
       alert_state_warning:true
     })
    }
  }
  catch(error)
  {
    this.setState({
      alert_message:"Billing Not Done..!",
      alert_state_danger:true
    })
  }
  }
 
  async Order(e)
  {
    try
    {
      if(items[0])
      {
        const data=
        {
            tab_id:this.props.table_id,
            e_id:this.props.emp_id,
            order_to:this.props.order_to,
            order_from:this.props.order_from,
            items:items,
            order_place:'hotel'
        }
        const res = await axios.post(API_URL+'/hms/kot/order',{data});
        let order_id=  await res.data[0].order_id
        this.setState({
          order_id:order_id
        })
        if(res.status===200)
        {
          this.setState({
            alert_message:"Order Success..!",
            alert_state_success:true,
            bill_show:false
          })
          this.handleClear(this.props.itemName)
        }
        else
        {
          this.setState({
            alert_message:"Order Not Done..!",
            alert_state_danger:true
          })
        }
      }
      else
      {
        this.setState({
          alert_message:"Please Select items..!",
          alert_state_warning:true
        })
      }
    }
    catch(error)
    {
      this.setState({
        alert_message:"Order Not Done..!",
        alert_state_warning:true
      })
    }
  }
 printRender()
 {
   if(this.state.bill_show)
   {
     if(this.state.room_show)
     {
       return(
        <Button hidden className="chargeBillButton"
          >
         Bill Added 
        </Button>
       )
     }
     else
     {
       return(
        <div className="chargeBills"  >
        <span className="chargeBillButtonnew"   >
        <Button 
                onClick={this.paidCall.bind(this)}>
                Paid 
                </Button>
        </span>
        <span className="chargeBillButtonnewh">
                <Button  onClick={this.roomPay.bind(this)}
                >
                 {this.state.room_num_selected}{' '}<Icon size={14} icon={ic_send}/>
                </Button>
        </span>
        </div>
      )
     }
  
   }
 }
 async roomPay()
 {
   
   if(this.state.room_num_selected>0)
   {
    let data={
      current_table_number:this.props.table_number,
      current_tab_id:this.props.table_id
     }
    let resp=await axios.put(API_URL+"/hms/kot/getPreviousOrder/"+this.state.room_num_selected,{data});
     if(resp.status===200)
     {
     await this.setState({
        table_split:false,
        table_number:resp.data[0].table_number,
        tab_id:resp.data[0].table_id,
        room_show:true,
        order_id:resp.data[0].order_id,
        table_call:true
       })
     await this.submitData('Ordered','Billed','waiting')
     }
   }
   else if(this.props.room_with_name.length<1)
   {
    this.setState({
      alert_message:'Occupied Rooms Not Available.!',
      alert_state_warning:true
    })
   }
   else
   {
    this.setState({
      show:true
    })
   }
 }
  selectRoom()
  {
    if(this.state.room_num_selected>0)
    {
      this.setState({
        show:false
      })
    }
    else
    {
      this.setState({
        alert_message:'Please Select Room.!',
        alert_state_warning:true
      })
    }
     
  }
  render()
  {
   console.log("KOTContFooter",this.props)
    return (
      <div className="kotContainerFooter">
      <div className="orderTicketButton" >
      <Modal backdrop="static" show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Choose Room Number</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                    <Form horizontal >
                        <FormGroup controlId="formHorizontalPassword">
                          <Col sm={2}>
                            Menu name
                          </Col>
                          <Col sm={10}>
                          <Select className="selectSearch" options={this.state.room_number}   id="room_number"   name="language" placeholder="Choose Room Number" onChange={this.handleSelect.bind(this)}/>
                        
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Button  onClick={this.selectRoom.bind(this)}>Select</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                      </Modal.Body>
                      
                    </Modal>
      <Button
       onClick={this.Order.bind(this)} >Order</Button>
      </div>
        <div className="chargeBillButton">

        {!this.state.bill_show && <ReactToPrint
          trigger={() => <Button className="chargeBillButton" onFocus={this.printCall.bind(this)}
          >
           Print Bill {parseFloat((this.props.total_price+this.state.total_price)+(((this.state.total_price+this.props.total_price)*this.props.tax)/100))}
          </Button>}
          content={() => this.componentRef}
        />}
      
         <div hidden value="">
         <div value="componentRef" id="componentRef" ref={el => (this.componentRef = el)}>
          <Billing
          bill_no={this.props.bill_id}
          date={this.props.bill_date_time}
          kot_list={this.props.printItems}
          kot_id={this.props.kot_id_list}
          table_number={this.state.table_number}
          total_amount={parseFloat(this.props.totalamount)}
          tax={parseFloat(this.props.tax)}
          tax_amount={(parseFloat(this.props.totalamount)*parseFloat(this.props.tax))/100}
          />}
      </div>
      </div>
        {this.state.bill_show && this.printRender()}

         <SweetAlert 
          success title={this.state.alert_message} show={this.state.bill_confirm} onConfirm={()=>{
                          this.setState({
                            bill_confirm:false
                          })
                          this.props.history.push("/home");  
            }}/>

             <SweetAlert 
          success title={this.state.alert_message} show={this.state.print_confirm} onConfirm={()=>{
                          this.setState({
                            print_confirm:false
                          })
            }}/>
         <SweetAlert 
          success title={this.state.alert_message} show={this.state.alert_state_success} onConfirm={()=>{
                          this.setState({
                            alert_state_success:false
                          })
            }}/>
             <SweetAlert 
          danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={()=>{
                          this.setState({
                            alert_state_danger:false
                          })
            }}/>
             <SweetAlert 
             warning title={this.state.alert_message} show={this.state.alert_state_warning} onConfirm={()=>{
                          this.setState({
                            alert_state_warning:false
                          })
            }}/>

        </div>
      </div>
    );
  }
}




export default withRouter(KOTContFooter);
