import React, { Component } from "react";
import KOTContHeader from "../Headers/KOTContHeader";
import KOTContFooter from "../Footers/KOTContFooter";
import KOTContBody from "../Body/KOTContBody";
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
export default class HCKOTContainer extends Component {
  constructor(){
    super();
    this.state = {
      slipCount : 1,
      addBtnState:true,
      items:[],
      total_price:0,
      printItems:[],
      bill_id:'',
      bill_date_time:'',
      kot_id_list:[],
      totalamount:0
    }
  }
 
  handleRemoveItem(itemName,price,q_id,q_type,itemQty)
  {
    this.props.handleRemoveItem(itemName,price,q_id,q_type,itemQty);
  }
  handleClear(itemName)
  {
    this.props.handleClear(itemName);
  }

 handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
  this.props.handleReduceItem(itemName,price,q_id,q_type,itemQty);
 }
 async get()
 {
  const resp= await axios.get(API_URL+'/hms/kot/kot_list/'+this.props.table_id);
 let newitems=[];
 let kotid=[]
 let price=0;
  if(resp.data[0])
  {
    resp.data[0].kot_data.kot_list.map(items=>{
     kotid.push(items.kot_id)
      items.items.map(item=>{
        newitems.push(item)
        price=price+parseFloat(parseInt(item.quantity)*parseInt(item.price))
      })
    })

  let items=resp.data[0].kot_data.kot_list;
    this.setState({
      items:items,
      bill_id:resp.data[0].kot_data.bill_id,
      bill_date_time:resp.data[0].kot_data.date_time,
      printItems:newitems,
      kot_id_list:kotid,
      totalamount:price
    })
 }
}
async getPrice()
{
  await this.get();
  let total_price=0;
  await this.state.items.map((item)=>{
    item.items.map(l=>{
      if(l.item_status==='Cancelled')
      {
        total_price=total_price+(0*l.quantity) 
      }
      else
      {
        total_price=total_price+(l.price*l.quantity)
      }
    })
  })
    await this.setState({
      total_price:total_price
    })
}
async componentWillReceiveProps()
{
  this.getPrice();
}
componentWillMount()
{
 this.getPrice();
}
async handleCancelOrder(data)
{
  try{
    let respo=await axios.put(API_URL+'/hms/kot/canceOrder/'+data.item_id,{data});
    this.get();
    this.getPrice();
  }
  catch(error)
  {
    alert("getting");
  }
}


  render() {
    return (
      <div className="kotContainer">
        <KOTContHeader split_series={this.props.split_series} table_number={this.props.table_number}disAddButton={this.state.addBtnState}/>
        <KOTContBody handleCancelOrder={this.handleCancelOrder.bind(this)} items={this.state.items} itemName={this.props.itemName} price={this.props.price} id={this.props.id} q_id={this.props.q_id} q_type={this.props.q_type} tax={this.props.tax} table_id={this.props.table_id} emp_id={this.props.emp_id} handleRemoveItem={this.handleRemoveItem.bind(this)} handleReduceItem={this.handleReduceItem.bind(this)}  />
        <KOTContFooter totalamount={parseFloat(this.state.totalamount)} kot_id_list={this.state.kot_id_list} bill_id={this.state.bill_id} bill_date_time={this.state.bill_date_time} q_id={this.props.q_id} printItems={this.state.printItems} room_with_name={this.props.room_with_name} floor_name={this.props.floor_name} table_status={this.props.table_status} table_split={this.props.table_split} table_number={this.props.table_number} total_price={this.state.total_price} itemName={this.props.itemName} price={this.props.price} id={this.props.id} itemQty={this.props.itemQty} order_from={this.props.order_from} order_to={this.props.order_to} tax={this.props.tax} table_id={this.props.table_id} emp_id={this.props.emp_id} handleClear={this.handleClear.bind(this)} />
      </div>
    );
  }
}