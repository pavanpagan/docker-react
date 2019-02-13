import React, { Component } from "react";
import TOKOTContHeader from "../Headers/TOKOTContHeader";
import TOKOTContFooter from "../Footers/TOKOTContFooter";
import TOKOTContBody from "../Body/TOKOTContBody";
export default class TOKOTContainer extends Component
{
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
 
  render()
  {
    return(
      <div className="kotContainer">
        <TOKOTContHeader />
        <TOKOTContBody q_id={this.props.q_id} q_type={this.props.q_type} itemName={this.props.itemName} price={this.props.price} id={this.props.id} tax={this.props.tax} handleRemoveItem={this.handleRemoveItem.bind(this)} handleReduceItem={this.handleReduceItem.bind(this)}/>
        <TOKOTContFooter q_id={this.props.q_id} q_type={this.props.q_type} itemName={this.props.itemName} price={this.props.price} id={this.props.id} itemQty={this.props.itemQty} order_from={this.props.order_from} order_to={this.props.order_to} tax={this.props.tax} handleClear={this.handleClear.bind(this)}/>
      </div>
    );
  }
}
