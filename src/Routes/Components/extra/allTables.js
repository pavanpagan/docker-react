import React, { Component } from "react";
import { ticket } from "react-icons-kit/entypo/ticket";
import { Panel } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {ic_print} from 'react-icons-kit/md/ic_print'
import {ic_call_split} from 'react-icons-kit/md/ic_call_split'
import {ic_delete} from 'react-icons-kit/md/ic_delete'
import {ic_donut_small} from 'react-icons-kit/md/ic_donut_small'
import {cancelCircle} from 'react-icons-kit/icomoon/cancelCircle'
import { Icon } from "react-icons-kit";

//import { Button } from "@material-ui/core";
import {
  Button
} from "react-bootstrap";
import { table } from "react-icons-kit/icomoon/table";
const API_URL = process.env.REACT_APP_API_URL;
let i='@';
class allTables extends Component 
{ 
  constructor(props)
  {
    super(props);
    this.state={
      table_id:0,
      emp_id:0,
    }
  }
  componentWillMount()
  {
    this.setState({
      table_id:this.props.table_id,
      emp_id:this.props.emp_id
    })
  }
  async handleTableDelete(table_id)
  {
     this.props.handleTableDelete(table_id); 
  }
  
  handleButtonNumber(status,table_split,split_series)
  {

    if(table_split)
    {
      return(
        <h5 className={status}>{this.props.table_number+'-'+split_series}</h5>
      )
    }
    else
    {
      return(
        <h5 className={status}>{this.props.table_number}</h5>
      )
    }
  }
  
  handleDeleteButton(counts,table_split,table_id)
  {
    if(table_split && counts===0)
    {
      return(
        <div className="tableFooter delete">
        <div className="kotsIcon">
          <Icon size={14} onClick={this.handleTableDelete.bind(this,table_id)} icon={cancelCircle} />
        </div>
      </div>
      )
    }
    else
    {
      return(
        <div className="tableFooter">
        <div className="kotsIcon">
          <Icon size={14} icon={ticket} />
        </div>
        <div className="noOfKots">
          <label>{counts}</label>
        </div>
      </div>
      )
    }
  }

  render() 
  {
    return (
        <div className="tableNum">
            {this.props.tables.map(tables=>{
                return(
                  <div>
                  <Link className="tbl3" to={{pathname:'/itemselect',state:{table_status:tables.table_status,table_id:tables.table_id,emp_id:tables.emp_id,table_number:tables.table_number,table_split:tables.table_split,split_series:tables.split_series,floor_name:tables.floor_name,floor_id:tables.f_id,room_with_name:this.props.room_with_name }}}>
                          <div className={"tableNumInner " + tables.table_status}>
                               {this.handleButtonNumber(tables.table_status,tables.table_split,tables.split_series)}
                          </div>
                  </Link>
                          {this.handleDeleteButton(tables.counts,tables.table_split,tables.table_id)}
                  </div>
                       )
                 })
              }
        </div>
    )
  }
}

export default allTables;
