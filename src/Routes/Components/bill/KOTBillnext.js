import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import KOTItemListNext from '../list/KOTItemListNext'
let itemListArray = [];

export default class KOTBillnext extends Component 

{
 
  handleRemoveItem(itemName,itemQty)
  {
    this.props.handleRemoveItem(itemName,itemQty);
  }
 handleReduceItem(itemName)
 {

  this.props.handleReduceItem(itemName);
 }
 handleCancelOrder(data)
 {
  this.props.handleCancelOrder(data);
 }
  addTOKOTItem()
  {
    itemListArray = [];
    let itemList = [];
    for(let i = 0; i < this.props.items.length; i++)
      {
        let k=this.props.items[i];
    
        itemListArray.push
        (
          <KOTItemListNext handleCancelOrder={this.handleCancelOrder.bind(this)}  kot_id={this.props.kot_id} tax={this.props.tax} item_status={k.item_status} kotitem_id={k.kotitem_id} itemId={k.item_id} itemName={k.item_name} itemQty={k.quantity} price={k.price} qtype={k.qtytype}  q_id={k.q_id} />
        );
    }
    return itemListArray;
  }

  render()
  {
    return (
      <Panel >
        <Panel.Heading>
          <Panel.Title toggle>KOT Slip {this.props.index}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <ul className="KOTList">
          {this.addTOKOTItem()}
          </ul>
        </Panel.Body>
      </Panel>
    );
  }
}