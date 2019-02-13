import React, { Component } from "react";
import { ticket } from "react-icons-kit/entypo/ticket";
import { Icon } from "react-icons-kit";
import { Panel } from "react-bootstrap";

import {ic_donut_small} from 'react-icons-kit/md/ic_donut_small'
import  SweetAlert from 'react-bootstrap-sweetalert';
import AllTables from "./allTables";
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl } from "@material-ui/core";
import waiter from "../assets/images/waiter.png";
const API_URL = process.env.REACT_APP_API_URL;
let i='@';
let addList=[]
class HotelTables extends Component 
{ 
  constructor(props)
  {
    super(props);
    this.state={
      table_id:0,
      emp_id:0,
      check:false,
      table_number:0
    }
  }
  componentWillMount()
  {
   
    this.setState({
      table_id:this.props.table_id,
      emp_id:this.props.emp_id,
      table_number:this.props.table_number
    })
    if(this.state.check)
    {
      this.setState({
        check:false
      })
    }
  }
  componentWillReceiveProps()
  {
    if(this.props.addEmployee)
    {
      this.setState({
        check:false
      })
    }
  }
  
  async handleSplit()
  {
      this.props.handleSplit(this.props.emp_id,this.props.table_number,this.props.tables[0].f_id); 
  }
  async handleTableDelete(table_id)
  {
     this.props.handleTableDelete(table_id); 
  }
 
  buttonRender(table_id)
  {
    if(!this.props.table_split && this.props.tables.length<4 && this.props.tables[0].floor_name!=='ROOM')
    {
        return(
          <Icon className="spliticons"  size={21} onClick={this.handleSplit.bind(this)} icon={ic_donut_small} ></Icon>
       )
      
    }
  }



  checkProcess()
  {
    if(this.state.check)
    {
      addList=addList.filter(list=>{
        if(list.table_list!=this.state.table_number)
        {
         return list
        }
      })
      this.setState({
        check:false
      })
    }
    else
    {
      this.setState({
        check:true
      })
      addList.push(
        {
          "table_list":parseInt(this.props.table_number),
          "floor_id":this.props.tables[0].f_id
        }
      )
    }
  }
  async checkboxSelect()
  {
   if(!this.props.addEmployee)
   {
   await this.checkProcess();
   await this.props.checkboxSelect(addList)
   }
  }
  CheckboxRender(addEmployee)
  {
    if(!addEmployee)
    {
      return(
      <Checkbox
      className="checkBox"
      checked={this.state.check}
      
      onClick={this.checkboxSelect.bind(this)}
      />
     )
    }
    else
    {
      addList=[]
    }
  }
  
  render() {
   
    return (
     <div>
        <Panel className="tbl">
        <div className="sp">
            <span className="sp1">{this.CheckboxRender(this.props.addEmployee)}</span>
            <span className="sp2">{this.props.employee_name}</span>
            <span className="sp3">{this.buttonRender(this.props.table_id)}</span>
        </div>
          <div>
          <Panel.Body  onClick={this.checkboxSelect.bind(this)} className={"panelbody"}>
            <AllTables
            className={"allTbl"}
             table_number={this.props.table_number}
             tables={this.props.tables}
             emp_id={this.props.emp_id}
             room_with_name={this.props.room_with_name }
             handleTableDelete={this.handleTableDelete.bind(this)}
            />
          </Panel.Body>
          </div> 
        </Panel>
      </div>
    );
  }
}

export default HotelTables;

