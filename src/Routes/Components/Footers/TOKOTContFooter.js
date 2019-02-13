import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from'axios';
import  SweetAlert from 'react-bootstrap-sweetalert';
import ReactToPrint from "react-to-print";
import moment  from 'moment-timezone';
import Billing from '../extra/Billing';
let p=0;
let items=[]
const API_URL = process.env.REACT_APP_API_URL;

export default class TOKOTContHeader extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      total_price:'',
      alert_message:null ,
      alert_state_success: false,
      alert_state_warning:false,
      alert_state_danger:false,
      resp_billno:0,
      resp_date:'',
      resp_tableNumber:'takeout',
      resp_totalAmount:0,
      resp_tax:0,
      resp_taxaAmount:0,
      resp_kotList:[],
      resp_biilamount:0,
      resp_kotid:0
    }
  }
  handleClear(itemName)
  {
    this.props.handleClear(itemName);
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
  async submitData(e)
  {
    if(items[0])
    {
      try
      {
        const data=
        {
            tab_id:0,
            e_id:0,
            order_to:this.props.order_to,
            order_from:this.props.order_from,
            items:items,
            order_place:'takeout'
        }
        const res = await axios.post(API_URL+'/hms/kot/order',{data});
        let order_id=  await res.data[0].order_id
        let status=  await res.status
        if(status!==200)
        {
          this.setState({
            alert_message:"Order Not Done..!",
            alert_state_danger:true
          })
        }
        let data_tax=
        {
          tax:this.props.tax,
          table_split:false,
          table_number:0,
          tab_id:0,
          order_status:'Closed',
          table_status:'takeaway',
          pay_status:'paid',
          room_show:false
        }
        const resp= await axios.put(API_URL+'/hms/kot/bill/'+order_id,{data_tax});
        let allitem=[]
       await resp.data[0].billing_data.kot_list.map(list=>{
            list.items.map(item=>{
             allitem.push(item);
            })
        })
       await this.setState({
            resp_billno:resp.data[0].billing_data.billing_id,
            resp_date:resp.data[0].billing_data.date_time,
            resp_tableNumber:'takeout',
            resp_totalAmount:resp.data[0].billing_data.total_amount,
            resp_biilamount:resp.data[0].billing_data.billing_amount,
            resp_tax:resp.data[0].billing_data.tax,
            resp_taxaAmount:resp.data[0].billing_data.tax_amount,
            resp_kotList:allitem,
            resp_kotid:resp.data[0].billing_data.kot_list[0].kot_id
        })
          if(resp.status===200)
          {
              this.setState({
                alert_message:"Order Success..!",
                alert_state_success:true
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
      catch(error)
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
    alert_message:"Please Select Items..!",
    alert_state_warning:true
  })
}
  }

  beforePrint()
  {
    console.log("called");
  }
  render()
  {
    return (
      <div className="kotContainerFooter">
        <div className="orderTicketButtons">
       
        <ReactToPrint
            trigger={() =><Button
            onFocus={this.submitData.bind(this)}>
            Order Kot ₹ {this.state.total_price+((this.state.total_price*this.props.tax)/100)}
            </Button>}
            content={()=> this.componentRef}
        />
        
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
      <div hidden value="">
          <div value="componentRef" id="componentRef" ref={el => (this.componentRef = el)}>
            {/* <Billing
              bill_no={this.state.resp_billno}
              date={this.state.resp_date}
              kot_list={this.state.resp_kotList}
              kot_id={this.state.kot_id_list}
              table_number={this.state.resp_tableNumber}
              total_amount={parseFloat(this.state.resp_totalAmount)}
              tax={parseFloat(this.props.tax)}
              tax_amount={(parseFloat(this.state.resp_totalAmount)*parseFloat(this.props.tax))/100}
              /> */}
              	<div className="Billdiv">
    <div className="Billnew">
      <div>
        <div className="Billheader">
           <center>
              <img className="Billimg" src={require('../assets/images/download.png')} />
            </center>
        </div>
      <div>
        <center>
            <h4>
                <br/>
                 <b>Hotel Ashlesh</b> <br/> </h4>
                 <h5>  Opp. MIT,Manipal-karkala Road,<br/>
                   Manipal
                </h5>
        </center>
      </div>
      <div>
          <center>
               <div className="A3 Portrait">
                <div className="Billcolumn left">Billno:{this.state.resp_billno}</div>
                <div className="Billcolumn middle">Date:{moment(this.state.resp_date).format('llll')}</div>
                <div className="Billcolumn right"> Tableno:{this.state.resp_tableNumber}</div>
                </div>
          </center>
      <br/>
      <br/>
      <br/>
      </div>
      <div >
      <table className="table table-condensed Billtable">
    						<thead>
                      <tr className="text-center Billtable">
        							<td className="Billtable"><strong>SNo</strong></td>
        							<td className="text-center Billtable"><strong>Description</strong></td>
        							<td className="text-center Billtable"><strong>Qty</strong></td>
                      <td className="text-center Billtable"><strong>Price</strong></td>
        							<td className="text-right Billtable"><strong>Amount</strong></td>
                       </tr>
    						</thead>
    						<tbody>
                {
                    this.state.resp_kotList.map((list,index)=>{
                      console.log("values",list)
                     return(
                        <tr>
                        <td>{index+1}</td>
                        <td className="text-center">{list.item_name}</td>
                        <td className="text-center">{list.quantity}</td>
                        <td className="text-center">{list.price}</td>
                        <td className="text-right">{parseFloat(parseInt(list.quantity)*parseInt(list.price))}</td>
                      </tr>
                       )
                      })
                    }
                    <br/>
    							<tr>
                  <td className="thick-line"></td>
                  <td className="thick-line"></td>
    								<td className="thick-line"></td>
    								<td className="thick-line text-center"><strong>Total amount</strong></td>
    								<td className="thick-line text-right">{this.state.resp_biilamount}</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line"></td>
    								<td className="no-line text-center"><strong>CGST@{this.props.tax/2}%</strong></td>
    								<td className="no-line text-right">{this.state.resp_taxaAmount/2}</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line text-center"><strong>SGST@{this.props.tax/2}%</strong></td>
    								<td className="no-line text-right">{this.props.resp_taxaAmount/2}</td>
    							</tr>
                  <tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line text-center"><strong>Service Tax @10%</strong></td>
    								<td className="no-line text-right">0</td>
    							</tr>
                  <tr>
                  <td className="thick-line"></td>
                  <td className="thick-line"></td>
    								<td className="thick-line"></td>
    								<td className="thick-line text-center"><strong>Net amount</strong></td>
    								<td className="thick-line text-right">{this.props.total_amount}</td>
    							</tr>
    						</tbody>
    					</table>
      </div>
     <div>
       <br/>
       <p className="Billkot">KOT NO:{this.state.resp_kotid}</p>
      </div>
   <div>
<p className="Billsign" >Sign:</p>
<br/>
<hr className="Billhr"/>
</div>
  <div><center> ashleshhotelmanipal@gmail.com</center>
  <footer><center><b>Thank You visit again</b></center>  </footer>
  </div>      
        </div>
     
      </div>
      
			</div>
         </div> 
      </div>
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
