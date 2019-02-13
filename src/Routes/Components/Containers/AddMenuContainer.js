import React, { Component } from "react";
import Header from "../Headers/Header";
import { Icon } from "react-icons-kit";

import {ic_mode_edit} from 'react-icons-kit/md/ic_mode_edit'
import {ic_delete} from 'react-icons-kit/md/ic_delete'
import FoodMenuFooter from '../Footers/FoodMenuFooter';
import Switch from 'react-switch';
import { Grid, Row, Col, Table, Button,FormGroup,FormControl,Form,InputGroup,Glyphicon ,Modal} from "react-bootstrap";
import Tabs from "../extra/Tabs";
import axios from 'axios';
import validator from 'validator';
import  SweetAlert from 'react-bootstrap-sweetalert';
import { func } from "prop-types";
const API_URL = process.env.REACT_APP_API_URL;

export default class AddMenuContainer extends Component {
constructor(props,context)
 {
     super(props,context);
     this.state={
        index:'',
        new:'',
        menu:[],
        value:'',
        show: false,
        alert_message:'',
        alert_state_warning:false,
        alert_state_success:false,
        menu_name:
        {
          value:"",
          valid:true
        },
        old_menu_name:
        {
          value:"",
          valid:true
        },
       new_menu_name:
       {
        value:"",
        valid:true
       }
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.Deletefunc=this.Deletefunc.bind(this);
     this.handleShow = this.handleShow.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.updatemodel = this.updatemodel.bind(this);
     this.valueChange=this.valueChange.bind(this);
 }
 handleClose() {
  this.setState({ show: false });
}

handleShow(value) 
{
  this.setState({
    "old_menu_name":{
      value:value,
      valid:true
    },
    "new_menu_name":{
      value:value,
      valid:true
    },
    show:true
  });
}

 handleChange(event)
 {
  
  let valid;
  let value= event.target.value;
   if (validator.isAlpha(value) || value.length===0)
     {
       valid = true;
     }
     else 
     {
       valid = false;
     }
   this.setState({
     [event.target.id]: {
       value,
       valid
     }
   });
 }

valueChange(event)
{
   let valid;
   let value= event.target.value;
  if (validator.isAlpha(value) || value.length===0)
    {
      valid = true;
    }
    else 
    {
      valid = false;
    }
  this.setState({
    [event.target.id]:
    {
      value,
      valid
    }
  });
}

handleEnterCall(event)
{
  let code = event.keyCode || event.which;
  if(code===13)
  {
    this.handleSubmit()
  }
}
handleModalEnterCall(event)
{
  let code = event.keyCode || event.which;
  if(code===13)
  {
    this.updatemodel()
  }
}
async handleSubmit()
{
  if(this.state.menu_name.valid && this.state.menu_name.value.length>0)
  {
    try
    {
      let res=await axios.post(API_URL+'/hms/kot/addMenu', { data:this.state.menu_name.value.toLowerCase()})
      if(res.data)
      {
          if(res.data[0])
          {
              this.setState({
                  alert_message:"Already Exist.!",
                  alert_state_warning:true,
                  "menu_name":{
                    value:"",
                    valid:true
                  }
                })
          }
          else
          {
              this.setState({
                  alert_message:"Added.!",
                  alert_state_success:true,
                  "menu_name":{
                    value:"",
                    valid:true
                  }
                })
          }
      }
      await this.get();
    }
    catch(error)
    {
      this.setState({
          alert_message:"Server Error.!",
          alert_state_warning:true
        })
    }
  }
  else
  {
    this.setState({
      alert_message:"Please Enter Valid Menu Name.!",
      alert_state_warning:true,
      menu_name:
      {
        value:"",
        valid:true
      }
    })
  }
}

async Deletefunc(value)
{
  await axios.delete(API_URL+'/hms/kot/DeleteMenu/'+value);
  await this.get();
}

async updatemodel()
{
  if(this.state.new_menu_name.valid && this.state.new_menu_name.value.length>0)
  {
    let res=await axios.put(API_URL+'/hms/kot/UpdateMenu',{data:this.state.new_menu_name.value.toLocaleLowerCase(),data1:this.state.old_menu_name.value})
    this.setState({
      show:false
    })
    if(res.data)
    {
       if(res.data.rows[0])
          {
              this.setState({
                  alert_message:"Already Exist.!",
                  alert_state_warning:true,
                  "new_menu_name":{
                    value:"",
                    valid:true
                  }
                })
          }
          else
          {
              this.setState({
                  alert_message:"Added.!",
                  alert_state_success:true,
                  "new_menu_name":{
                    value:"",
                    valid:true
                  }
                })
          }
    }
    await this.get();
  }
  else
  {
    this.setState({
      alert_message:"Please Enter Valid Menu Name.!",
      alert_state_warning:true,
      new_menu_name:
      {
        value:"",
        valid:true
      }
    })
  }
  
}

async get()
{
  let list=await axios.get(API_URL+'/hms/kot/getMenuList')
  this.setState({
    menu:list.data
  })
}
async componentWillMount()
{
this.get();
}
  render() {

    return (
      <div className="App">
        <SweetAlert 
                warning title={this.state.alert_message} show={this.state.alert_state_warning} onConfirm={()=>{
                this.setState({
                alert_state_warning:false
                })
           }}/>
           <SweetAlert 
                success title={this.state.alert_message} show={this.state.alert_state_success} onConfirm={()=>{
                this.setState({
                alert_state_success:false
                })
           }}/>
        <Grid fluid>
          <Row className="headerRow">
            <Header />
          </Row>
          <Row>
            <Tabs />
            <Col xs={11} className="tabContainer">
            <Row>
              <Col sm={6}>
              <div className="menuCard">
              <Table>
                <thead className="center">
                  <tr>
                    <th>Menu Name</th>
                    <th  className="center">Update</th>
                    <th  className="center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.menu.map((data,key)=>{
                    return(
                      <tr>
                      <th>{data.menu_name}</th>
                      <th  className="spliticons"><Icon size={21} icon={ic_mode_edit} onClick={this.handleShow.bind(this,data.menu_name)} /> </th>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Menu Status</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                    <Form horizontal >
                        <FormGroup controlId="formHorizontalPassword">
                          <Col sm={2}>
                            Menu name
                          </Col>
                          <Col sm={10}>
                          <FormGroup validationState={this.state.new_menu_name.valid ? "success" : "error" }>
                            <FormControl type="text" id="new_menu_name" name="new_menu_name" value={this.state.new_menu_name.value} /*onKeyDownCapture={this.handleModalEnterCall.bind(this)}*/ onChange={this.valueChange}/>
                          </FormGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Button  onClick={this.updatemodel}>Update</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                      </Modal.Body>
                      
                    </Modal>
                      <th  className="deleteicons" ><Icon size={21} icon={ic_delete}  onClick={this.Deletefunc.bind(this,data.menu_name)}/> </th>
                       </tr>
                    )
                })}
                </tbody>
              </Table>
                <th className="center" style={{width : "80%"}}>
                <FormGroup validationState={this.state.menu_name.valid ? "success" : "error" }>
                <FormControl type="text" id="menu_name"   name="menu_name" value={this.state.menu_name.value} onKeyDownCapture={this.handleEnterCall.bind(this)} onChange={this.handleChange}/>
                </FormGroup>
                </th>
                <th  className="center" style={{marginLeft :"100px"}}>
                <Button bsStyle="success"  onClick={this.handleSubmit}>ADD</Button>
                </th>
            </div>
              </Col>
            </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}