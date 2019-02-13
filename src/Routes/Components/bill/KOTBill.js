import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import KOTItemList from '../list/KOTItemList'
let itemListArray = [];

export default class KOTBill extends Component 
{
  
  handleRemoveItem(itemName,price,q_id,q_type,itemQty)
  {
    this.props.handleRemoveItem(itemName,price,q_id,q_type,itemQty);
  }
 handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
  this.props.handleReduceItem(itemName,price,q_id,q_type,itemQty);
 }

  addTOKOTItem()
  {
   itemListArray = [];
   let itemList = [];
   let priceList=[];
   for(let i = 0; i < this.props.itemName.length; i++)
    {
     let count = 0;
     for (let j = 0; j < this.props.itemName.length; j++)
      {
       if(this.props.itemName[j] == this.props.itemName[i] && this.props.price[j]==this.props.price[i] && this.props.q_id[j]==this.props.q_id[i])
       {
         count++;
       }
     }
     

    if(!itemList.includes(this.props.itemName[i]+this.props.price[i]))
     {
      itemList.push(this.props.itemName[i]+this.props.price[i]);
       itemListArray.push
       (
         <KOTItemList tax={this.props.tax} itemName={this.props.itemName[i]} itemQty={count} price={this.props.price[i]} q_id={this.props.q_id[i]} q_type={this.props.q_type[i]} handleRemoveItem={this.handleRemoveItem.bind(this)} handleReduceItem={this.handleReduceItem.bind(this)}/>
       );
     }
   }
   return itemListArray;
 }
  render() 
  {
    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>KOT Slip {this.props.eventKey}</Panel.Title>
        </Panel.Heading>
        <Panel.Body className="panelbodynew" >
          <ul className="KOTList">
          {this.addTOKOTItem()}
          </ul>
        </Panel.Body>
      </Panel>
    );
  }
}