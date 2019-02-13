import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
export default class KOTItemList extends Component {
  handleRemoveItem(itemName,price,q_id,q_type,itemQty)
 {
    this.props.handleRemoveItem(itemName,price,q_id,q_type,itemQty);
 }
 handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
  this.props.handleReduceItem(itemName,price,q_id,q_type,itemQty);
 }

 componentWillMount()
 {
   console.log("called");
 }
  render()
   {
    return (
      <li className="KOTItem">
        <div className="KOTItemName">
          <span>{this.props.itemQty}</span>
          <span> x {this.props.itemName}-{this.props.q_type}</span>
        
        </div>
        <div>
        <span>{(this.props.price*this.props.itemQty)+(((this.props.price*this.props.itemQty)*this.props.tax)/100)}</span>
        </div>
        <div  className="KOTItemButton">
          <span onClick={this.handleReduceItem.bind(this,this.props.itemName,this.props.price,this.props.q_id,this.props.q_type,this.props.itemQty)}>
          <Glyphicon glyph="minus-sign" />
          </span>
          <span onClick={this.handleRemoveItem.bind(this,this.props.itemName,this.props.price,this.props.q_id,this.props.q_type,this.props.itemQty)}>
            <Glyphicon glyph="trash"/>
          </span>
        </div>
      </li>
    );
  }
}
