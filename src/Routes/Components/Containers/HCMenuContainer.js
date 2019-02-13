import React, { Component } from "react";

import MenuContBody from '../Body/MenuContBody';
import MenuContFooter from '../Footers/MenuContFooter';
export default class HCMenuContainer extends Component 
{
  handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty)
  {
    this.props.handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty);
  }
  render() {
    return (
      <div className="menuContainer">
        <MenuContBody handleItemSelect={this.handleItemSelect.bind(this)}/>
      </div>
    );
  }
}
