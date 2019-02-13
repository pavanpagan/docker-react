import React, { Component, useCallback } from 'react'
import Switch from "react-switch";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import moment  from 'moment-timezone';
//import {print} from 'react-icons-kit/iconic/print'
import {ic_print} from 'react-icons-kit/md/ic_print'
import  SweetAlert from 'react-bootstrap-sweetalert';
import Checkbox from '@material-ui/core/Checkbox';
const API_URL = process.env.REACT_APP_API_URL;

export default class OrderItemList extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      item_switch:false,
      item_status:'notavailable',
      item_id:0,
      alert_message:null,
      alert_state_danger: false
    }
  }
  componentWillMount()
  {

    this.setState({
      id:this.props.item_id,
      key:this.props.keys,
      key_value:this.props.value
    })
  }

  async handleCheckbox()
   {
    await this.StateSet();
    await this.apiCal();
   }
    StateSet()
    {
          if (this.state.key_value)
          {
            this.setState({
              id:this.state.id,
              key:this.state.key,
              key_value:false
            })
        } 
        else {
          this.setState({
            id:this.state.id,
            key:this.state.key,
            key_value:true
          })

        }
    }
   async apiCal()
    {
      let  item_id=this.state.id;
      let data={
        key_name:this.state.key,
        value:this.state.key_value
      }
      try
      {
        await axios.put(API_URL+'/hms/kot/updateMenuStatus/'+item_id,{data})
      }
      catch(error)
      {
        this.setState({
          alert_message:"Server Error Cant Update..!",
          alert_state_danger:true
        })
      }
    }
 
  render() {
    return (
      <div>
      <Checkbox
      id="t"
      name="t"
      color="primary"
      checked={this.state.key_value}
      onChange={this.handleCheckbox.bind(this)}
      />
        <SweetAlert 
        danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={()=>{
                        this.setState({
                          alert_state_danger:false
                        })
          }}/>
     </div>
    )
  }
}
