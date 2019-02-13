import React, { Component } from "react";
import {Table} from "react-bootstrap";
import axios from 'axios';
import OrderViewHeader from "../Headers/OrderViewHeader";
import OrderMenuHeader from "../Headers/OrderMenuHeader";
import OrderItemList from "../list/OrderItemList";
import  SweetAlert from 'react-bootstrap-sweetalert';
const API_URL = process.env.REACT_APP_API_URL;
//let items=[];
export default class OrderviewBody extends Component {
 constructor(props)
 {
     super(props);
     this.state={
        orders:[],
        old_orders:[],
        alert_message:'',
        alert_state_danger:false
     }
 }
    async componentWillMount()
  {
    try
    {
      const resp = await axios.get(API_URL+'/hms/kot/getAllOrders');
      const { data } = await resp;
      
      this.setState({
        orders:data,
        old_orders:data
       })
    }
    catch(error)
    {

    }
   

  }

  handleSearch(e)
  {
  
 
  }

  handleFilter(eventKey)
  {
   let itemall = this.state.old_orders.filter(function(data)
      {
          if(eventKey==='All')
          {
            return data
          }
          else
          {
            return data.order_place===eventKey;
          }
      });
      this.setState({
        orders:itemall
      })
  }
  
  render()
  {
    return (
      <div>
        <OrderMenuHeader handleSearch={this.handleSearch.bind(this)}  handleFilter={this.handleFilter.bind(this)} />
      <div className="foodmenuBody">
      
        <Table className="foodmenuTable">
          <OrderViewHeader />
          <SweetAlert 
                danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={()=>{
                this.setState({
                alert_state_danger:false
                })
                }}
           />
          <tbody>
              {this.state.orders.map((order,index)=>
            <OrderItemList
              slNo={index+1}
              date_time={order.date_time}
              kot_list={order.kot_list}
              table_number={order.table_number}
              total_amount={order.total_amount}
              employee_name={order.employee_name}
            />
            )}
          </tbody>
        </Table>
      </div>
      </div>
    );
  }
}
