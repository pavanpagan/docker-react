import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
export default class KOTCancelledList extends Component {
 constructor(props)
 {
   super(props);
   this.state={
     item_id:'',
     item_price:'',
     quantity:'',
     kot_itemid:''
   }
 }
 componentWillMount()
 {
   this.setState({
     item_id:this.props.item_id,
     item_price:this.props.itemName,
     quantity:this.props.itemQty,
     kot_itemid:this.props.kotitem_id
   })
 }
/* handleCancelOrder()
 {
  let data={
    item_id:this.props.itemId,
    item_price:this.props.price,
    quantity:this.props.itemQty-1,
    kot_itemid:this.props.kotitem_id,
    kot_id:this.props.kot_id,
    option:'cancel'
   }
   this.props.handleCancelOrder(data);
 }
 handleDeleteOrder()
 {
  let data={
    item_id:this.props.itemId,
    item_price:this.props.price,
    quantity:this.props.itemQty,
    kot_itemid:this.props.kotitem_id,
    kot_id:this.props.kot_id,
    option:'delete'
   }
   this.props.handleCancelOrder(data);
 }*/
  render()
   {
    return (
      <li className="KOTItem">
        <div className="KOTItemName">
          <span>{this.props.itemQty}</span>
          <span> x {this.props.itemName}</span>
        </div>
        <div >
        <span>{(this.props.price*this.props.itemQty)+(((this.props.price*this.props.itemQty)*this.props.tax)/100)}</span>
        </div>
        {/* <div  className="KOTItemButton">
          <span onClick={this.handleCancelOrder.bind(this)}>
          <Glyphicon glyph="minus-sign" />
          </span>
          <span onClick={this.handleDeleteOrder.bind(this)}>
            <Glyphicon glyph="trash"/>
          </span>
        </div> */}
      </li>
    );
  }
}
