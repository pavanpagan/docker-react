import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
export default class KOTItemListNext extends Component {
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
   //console.log("props paseed",this.props.item_status)
   this.setState({
     item_id:this.props.item_id,
     item_price:this.props.itemName,
     quantity:this.props.itemQty,
     kot_itemid:this.props.kotitem_id
   })
 }
 handleCancelOrder()
 {
  let data={
    item_id:this.props.itemId,
    item_price:this.props.price,
    quantity:this.props.itemQty-1,
    kot_itemid:this.props.kotitem_id,
    kot_id:this.props.kot_id,
    q_id:this.props.q_id,
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
    q_id:this.props.q_id,
    option:'delete'
   }
   this.props.handleCancelOrder(data);
 }
 addOptions()
 {
   if(this.props.item_status==='Cancelled')
   {
      return(
        <div  className="KOTItemButton">
          <label className="deleteicons">Cancelled</label>
        </div>
      )
   }
   else
   {
     return(
    <div  className="KOTItemButton">
        <span onClick={this.handleCancelOrder.bind(this)}>
        <Glyphicon glyph="minus-sign" />
        </span>
        <span onClick={this.handleDeleteOrder.bind(this)}/*onClick={this.handleRemoveItem.bind(this,this.props.itemName,this.props.itemQty)}*/>
          <Glyphicon glyph="trash"/>
        </span>
      </div>
     )
   }
 }
  render()
   {
    return (
      <li className="KOTItem">
        <div className="KOTItemName">
          <span>{this.props.itemQty}</span>
          <span> x {this.props.itemName}-{this.props.qtype}</span>
        </div>
        <div className="KOTprice">
        <span>{(this.props.price*this.props.itemQty)+(((this.props.price*this.props.itemQty)*this.props.tax)/100)}</span>
        </div>
        {
          this.addOptions()
        }
       
      </li>
    );
  }
}
