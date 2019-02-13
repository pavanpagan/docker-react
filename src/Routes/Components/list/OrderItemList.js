import React, { Component } from 'react'
import Switch from "react-switch";
import axios from 'axios';
import { Button } from "react-bootstrap";

import moment  from 'moment-timezone';
//import {print} from 'react-icons-kit/iconic/print'
import {ic_print} from 'react-icons-kit/md/ic_print'
import { Icon } from "react-icons-kit";
const API_URL = process.env.REACT_APP_API_URL;

export default class OrderItemList extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      item_switch:false,
      item_status:'notavailable',
      item_id:0
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
    this.setState({
      item_status:this.props.status,
      item_id:this.props.item_id
    })
  }

  render() {
    return (
        <tr >
        <td className="center">{this.props.slNo}</td>
        <td className="center">{moment(this.props.date_time).format('MMM Do YY')}</td>
        <td className="center">{this.props.kot_list.length}</td>
        <td className="center">{this.props.kot_list.map(kot=>{
          return kot.kot_id
        })+" "}</td>
        <td className="center">{this.props.table_number}</td>
        <td   className="center">{this.props.total_amount}</td>
        <td  className="center">
        <Icon size={21} icon={ic_print} />
        </td>
      </tr>
    )
  }
}
