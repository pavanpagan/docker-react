import React, { Component } from "react";
import { PanelGroup } from "react-bootstrap";
import TOKOTBill from "../bill/TOKOTBill";
export default class TOKOTContBody extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state =
    {
      activeKey: "1"
    };
  }

  handleSelect(activeKey,orderStatus)
  {
    alert(orderStatus)
    this.setState({ activeKey });
  }
  handleRemoveItem(itemName,price,q_id,q_type,itemQty)
  {
    this.props.handleRemoveItem(itemName,price,q_id,q_type,itemQty);
  }
 handleReduceItem(itemName,price,q_id,q_type,itemQty)
 {
  
  this.props.handleReduceItem(itemName,price,q_id,q_type,itemQty);
 }
  render() 
  {
    return(
      <div>
        <div className="kotContainerBody">
          <PanelGroup
            accordion
            id="accordion-controlled"
            className="kotList"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}
          >
          <TOKOTBill eventKey="1" q_id={this.props.q_id} q_type={this.props.q_type} itemQty={this.props.itemQty} itemName={this.props.itemName} price={this.props.price} id={this.props.id} tax={this.props.tax} handleRemoveItem={this.handleRemoveItem.bind(this)} handleReduceItem={this.handleReduceItem.bind(this)}/>
          </PanelGroup>
        </div>
      </div>
    );
  }
}
