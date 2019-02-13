import React, { Component } from "react";

import Select from 'react-select';
import {
  Col,
  Row,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import { ic_call_split } from "react-icons-kit/md/ic_call_split";
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
let allFloors=[]
let i='a';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
export default class HCHeader extends Component {
constructor(props)
{
  super(props);
  this.state={
    filter:'All',
    Ordered:{
      value:'Ordered',
      state:true
    },
    Served:{
      value:'Served',
      state:true
    },
    Empty:{
      value:'Empty',
      state:true
    },
    Billed:{
      value:'Billed',
      state:true
    },
    floor:[],
    employee_name:'',
    employee_id:0
  }
}
async componentWillMount()
{
  let floor=await axios.get(API_URL+"/hms/kot/getFloor");
  this.setState({
    floor:floor.data
  })
  this.state.floor.map(floor=>{
    this.setState({
      [floor.floor_name]:{
        value:floor.floor_id,
        state:true
      },
      [floor.floor_name+'i']:true
    })
  allFloors.push(this.state[floor.floor_name])
  })
}
call(current_state)
{
  if(this.state[current_state].state)
  {
  this.setState({
    [current_state]:{
     value:current_state,
     state:false
    }
  })
  }
  else
  {
    this.setState({
      [current_state]:{
       value:current_state,
       state:true
      }
    })
  }
}   

async callFloor(current_state,fid)
{
 this.setState({
  [current_state]:{
    value:'',
    state:false
   }
 })
  if(this.state[current_state].state)
  {
  this.setState({
    [current_state]:{
     value:fid,
     state:false
     },
      [current_state+'i']:false
    })
  }
  else
  {
    this.setState({
      [current_state]:{
       value:fid,
       state:true
      },
      [current_state+'i']:true
    })
  }
 allFloors = await allFloors.filter(function(floor) 
  {
    return floor.value !== fid
  })
  await allFloors.push(this.state[current_state])
}

async handleStatus(eventKey)
{
  let current_state=eventKey.target.id;
  await this.call(current_state)
 await this.props.handleStatus(this.state.Ordered,this.state.Served,this.state.Empty,this.state.Billed,allFloors);
}

async handleFloors(fname,fid,event)
{
 let current_state=fname;
  await this.callFloor(current_state,fid);
  await this.props.handleFloors(allFloors);
}



handleSelect = (employee_name) => {
  this.setState({
    employee_name:employee_name.label,
    employee_id:employee_name.value
   });
   this.props.handleSelect(employee_name.label,employee_name.value)
}

render()
 {
    return (
      <Row>
        <Col xs={12}>
          <div className="homeHeader">
            <Row>
              <Col xs={4}>
                  {
                    this.state.floor.map(floor=>{
                      return(
                        <Button  className={"floors"+" "+this.state[floor.floor_name+'i']} onClick={this.handleFloors.bind(this,floor.floor_name,floor.floor_id)}>{floor.floor_name}</Button>
                      )
                    })
                  }
              </Col>
              <Col xs={4}>
              {!this.props.addEmployee &&<Select className="selectSearch" options={this.props.selectOptions}   id="employee_name"   name="language" placeholder="Choose Employee" onChange={this.handleSelect.bind(this)}/>}
              </Col>
              <Col xs={4} >
              <div class="statusFil">
                  <Button onClick={this.handleStatus.bind(this)} id="Billed" className={"availItem"+" "+"Billed"+" "+this.state.Billed.state}>Billed</Button>
                  <Button onClick={this.handleStatus.bind(this)} id="Ordered" className={"availItem"+" "+"Ordered"+" "+this.state.Ordered.state}>Ordered</Button>
                  <Button onClick={this.handleStatus.bind(this)} id="Served"  className={"availItem"+" "+"Served"+" "+this.state.Served.state}>Served</Button>
                  <Button onClick={this.handleStatus.bind(this)} id="Empty"  className={"availItem"+" "+"Empty"+" "+this.state.Empty.state} >Empty</Button>
              </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}
