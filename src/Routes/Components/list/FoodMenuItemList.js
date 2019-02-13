import React, { Component } from 'react'
import Switch from "react-switch";
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
export default class FoodMenuItemList extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      item_switch:false,
      item_status:'notavailable',
      item_id:0,
      switch_state:false
    }
  }
  componentWillMount()
  {

    if(this.props.status==="available")
    {
      this.setState({
        item_switch:true
      })
    }
    if(this.props.status==="notavailable")
    {
      this.setState({
        item_switch:false
      })
    }
    this.setState({
      item_status:this.props.status,
      item_id:this.props.item_id
    })
  }

  componentDidUpdate()
{
     if(this.state.item_switch!==this.props.switch)
      {
       this.setState({
         item_switch:this.props.switch
       })
      }
}

handleSwitchItem(e)
  {
    this.props.handleSwitchItem(this.state.item_switch,this.props.item_id);
  }
 
  render() {
 
    return (
        <tr>
        <td>{this.props.slNo}</td>
        <td>{this.props.itemName}</td>
        <td>{this.props.itemCategory}</td>
        <td className="center">{this.props.itemType}</td>
        <td  className="center">
         <Switch
        checked={this.state.item_switch}
        onChange={this.handleSwitchItem.bind(this)}
        className="react-switch"
        id="switch"
        />
        </td>
      </tr>
    )
  }
}
