import React, { Component } from "react";
import MenuItemList from "../list/MenuItemList";
export default class MenuBodyRow extends Component {
  handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty) 
  {
    this.props.handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty);
  }
  
  render() 
  {
        return (
          <div className="menuBodyRow">
            {this.props.elements.map(element => {
                return(
                  <MenuItemList
                  itemnumber={element.itemnumber}
                  itemname={element.itemname}
                  itemcategory={element.itemmaincategory + " > " + element.itemsubcategory}
                  itemtype={element.itemtype}
                  price_list={element.price_list}
                  handleItemSelect={this.handleItemSelect.bind(this)}
                />

            )
                })}
          </div>
    );
  }
}
