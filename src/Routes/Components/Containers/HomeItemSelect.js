import React, { Component } from "react";
import Header from "../Headers/Header";
import HCMenuContainer from './HCMenuContainer';
import HCKOTContainer from './HCKOTContainer';
import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "../extra/Tabs";
import axios from 'axios';
import  SweetAlert from 'react-bootstrap-sweetalert';
import {kotAdd} from '../../../kotAdd'

const API_URL = process.env.REACT_APP_API_URL;
let a = 0;
export default class HomeItemSelect extends Component {
  constructor(props)
  {
   super(props);
   this.state = {
     itemName: [],
     price:[],
     id:[],
     itemQty:[],
     tax:0,
     table_id:0,
     emp_id:0,
     table_number:0,
     table_split:0,
     split_series:'',
     table_status:'',
     floor_name:'',
     room_with_name:[],
     q_id:[],
     q_type:[],
     f_id:0,
     service_tax:0,
     alert_message:'',
     alert_warning:false
   };
 }
componentWillMount()
{
  const {table_id} = this.props.location.state
  const {emp_id} = this.props.location.state
  const {table_number}=this.props.location.state
  const {table_split}=this.props.location.state
  const {split_series}=this.props.location.state
  const {table_status}=this.props.location.state  
  const {floor_name}=this.props.location.state;
  const {room_with_name}=this.props.location.state;
  const {floor_id}=this.props.location.state;

  this.setState({
    table_id:table_id,
    emp_id:emp_id,
    table_number:table_number,
    table_split:table_split,
    split_series:split_series,
    table_status:table_status,
    floor_name:floor_name,
    room_with_name:room_with_name,
    f_id:floor_id
  })
  this.calls();
}

async calls()
{
  kotAdd((err, message) => {
    console.log("FDMRight",message)
    // this.setState({
    //     notificationdata:message
    // })
   // notificationdata.push(message)
})
}
handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty)
{
   let newItemName = this.state.itemName.concat(itemname);
   let newPrice = this.state.price.concat(price);
   let ids= this.state.id.concat(itemnumber);
   let quantity=this.state.itemQty.concat(itemQty);
   let qid=this.state.q_id.concat(q_id);
   let qtype=this.state.q_type.concat(q_type);

   this.setState({
     itemName: newItemName,
     price:newPrice,
     id:ids,
     itemQty:quantity,
     q_id:qid,
     q_type:qtype
   });
 }


 async handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
      let itemNameArray = this.state.itemName;
     let priceArray=this.state.price;
     let quantity_array=this.state.itemQty;
    let quantity_id_array=this.state.q_id;
    let quantity_type_array=this.state.q_type;
     let newArray=[];
   
      let indexs;
     await itemNameArray.filter((list,index)=>{
          priceArray.filter((data,index1)=>{
            quantity_id_array.filter(item=>{
              quantity_type_array.filter(i=>{
                if(data==price && list==itemName && index===index1 && item==q_id && i==q_type)
                  {
                    indexs=index;
                  }
              })
            })
          })
      })
  
      if (indexs > -1)
      {
        quantity_array.splice(indexs,1);
        itemNameArray.splice(indexs,1);
        priceArray.splice(indexs,1);
        quantity_id_array.splice(indexs,1);
      }
    
     this.setState({
       itemName: itemNameArray,
       price: priceArray,
       itemQty:quantity_array,
       q_id: quantity_id_array
      });
 }


 handleClear(itemName)
 {
   let itemNameArray = [];
   let price=[];
   let ids=[];
   let quantity=[];
   this.setState({
    itemName: itemNameArray,
    price:price,
    id:ids,
    itemQty:quantity
  });
 }
 async handleRemoveItem(itemName,prices,q_id,q_type,itemQty)
 {
   let itemNameArray = this.state.itemName;
   let price=this.state.price;
   let ids=this.state.id;
   let quantity=this.state.itemQty;
   let quantity_id_array=this.state.q_id;
   let quantity_type_array=this.state.q_type;

   let newItemArray=[];
   let newPrice=[];
   let newQid=[];
   let newQtype=[];

   for(let i=0;i<itemNameArray.length;i++)
   {
     if(itemNameArray[i]!=itemName || quantity_id_array[i]!=q_id || prices!=price[i])
     {
      newItemArray.push(itemNameArray[i]);
      newPrice.push(price[i]);
      newQid.push(quantity_id_array[i]);
      newQtype.push(quantity_type_array[i])
     }
   }
 
  this.setState({
    itemName: newItemArray,
    price:newPrice,
    id:ids,
    itemQty:quantity,
    tax:0,
    q_id:newQid,
    q_type:newQtype
  });
 }


  async get()
  {
    try
    {
    const res = await axios.get(API_URL+'/hms/kot/tax/'+this.state.f_id);
      const {data}  = await res;
      if(data[0])
      {
        this.setState({
          tax:data[0].item_tax,
          service_tax:data[0].service_tax
        })
      }
    }
    catch(err)
    {
   
    }
  }

  componentDidUpdate()
  {
    if(this.state.tax===0)
    {
     this.get();
    }
  }
  componentDidMount()
  {
    if(this.state.tax===0)
    {
     this.get();
    }
    
  }
  render() {
    return (
      <div className="App">
        <Grid fluid>
          <Row className="headerRow">
            <Header />
          </Row>
          <Row>
            <Tabs />
            <Col xs={11} className="tabContainer">
              <div className="homeItemSelect">
                <Row>
                <SweetAlert 
                           warning title={this.state.alert_message} show={this.state.alert_warning} onConfirm={()=>{
                          this.setState({
                            alert_warning:false
                          })
            }}/>
                  <Col xs={9} className="menuContOuterDiv">
                    <HCMenuContainer handleItemSelect={this.handleItemSelect.bind(this)}/>
                  </Col>
                  <Col xs={3} className="kotContOuterDiv">
                  <HCKOTContainer
                      itemName={this.state.itemName}
                      price={this.state.price}
                      id={this.state.id}
                      itemQty={this.state.itemQty}
                      q_id={this.state.q_id}
                      q_type={this.state.q_type}
                      tax={this.state.tax}
                      order_from="Restaurant"
                      order_to="Kitchen"
                      table_id={this.state.table_id}
                      table_split={this.state.table_split}
                      table_number={this.state.table_number}
                      split_series={this.state.split_series}
                      table_status={this.state.table_status}
                      room_with_name={this.state.room_with_name}
                      floor_name={this.state.floor_name}
                      emp_id={this.state.emp_id}
                      service_tax={this.state.service_tax}
                      handleRemoveItem={this.handleRemoveItem.bind(this)}
                      handleClear={this.handleClear.bind(this)}
                      handleReduceItem={this.handleReduceItem.bind(this)} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}