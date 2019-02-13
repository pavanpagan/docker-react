import React, { Component } from "react";
import { PanelGroup } from "react-bootstrap";
import KOTBill from "../bill/KOTBill";
import KOTBillnext from "../bill/KOTBillnext";
import KOTBillnextCancelled from "../bill/KOTBillnextCancelled";
import KOTItemList from "../list/KOTItemList";



export default class KOTContBody extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "1"
    };
  }
  
 
 handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
  this.props.handleReduceItem(itemName,price,q_id,q_type,itemQty);
 }
  handleSelect(activeKey,orderStatus)
   {
    this.setState({ activeKey });
  }
  handleRemoveItem(itemName,price,q_id,q_type,itemQty){
    this.props.handleRemoveItem(itemName,price,q_id,q_type,itemQty);
 }

 handleCancelOrder(data)
 {
   this.props.handleCancelOrder(data)
 }

  render() {
    return (
      <div>
        <div className="kotContainerBody">
          <PanelGroup
            accordion
            id="accordion-controlled"
            className="kotList"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}>
            <KOTBill eventKey={""} key={"a"} tax={this.props.tax} itemQty={this.props.itemQty}  price={this.props.price} id={this.props.id} q_id={this.props.q_id} q_type={this.props.q_type} itemName={this.props.itemName}  handleRemoveItem={this.handleRemoveItem.bind(this)} handleReduceItem={this.handleReduceItem.bind(this)}/>
          { 
          this.props.items.map((i,index)=>{
            // if(i.item_status='Cancelled')
            // {
            //   return(
            //     <KOTBillnextCancelled handleCancelOrder={this.handleCancelOrder.bind(this)} tax={this.props.tax} kot_id={i.kot_id} items={i.items} index={this.props.items.length-index}/>
            //   )
            // }
            // else
            // {
            //   return(
            //     <KOTBillnext handleCancelOrder={this.handleCancelOrder.bind(this)} tax={this.props.tax} kot_id={i.kot_id} items={i.items} index={this.props.items.length-index}/>
            //   )
            // }
              return(
                <KOTBillnext handleCancelOrder={this.handleCancelOrder.bind(this)} tax={this.props.tax} kot_id={i.kot_id} items={i.items} index={this.props.items.length-index}/>
              )
          })
          }
          </PanelGroup>
        </div>
      </div>
    );
  }
}