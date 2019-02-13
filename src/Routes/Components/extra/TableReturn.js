import React, { Component } from "react";
import HotelTables from "./HotelTables";
import {Col} from 'react-bootstrap'
export default class TableReturn extends Component
 {
  handleItemSelect(table_number,emp_id) 
  {
    this.props.handleItemSelect(table_number,emp_id);
  }
  handleSplit(emp_id,table_number,f_id)
  {
    this.props.handleSplit(emp_id,table_number,f_id); 
  }
 
  handleTableDelete(table_id)
  {
    this.props.handleTableDelete(table_id); 
  }
  checkboxSelect(addList)
  {
    this.props.checkboxSelect(addList)
  }
  
  render() 
  {
    return (
      <div>
        {this.props.elements.map(element => {
   return(
    <Col sm={3}>
        <HotelTables
        table_number={element.table_number}
        tables={element.tables}
        emp_id={element.emp_id}
        employee_name={element.employee_name}
        addEmployee={this.props.addEmployee}
        checkboxSelect={this.checkboxSelect.bind(this)}
        handleSplit={this.handleSplit.bind(this)}
        room_with_name={this.props.room_with_name }
        handleTableDelete={this.handleTableDelete.bind(this)}
        />
    </Col>
      )
})}
   </div>
    );
  }
 }
 