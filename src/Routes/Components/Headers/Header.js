import React, { Component } from "react";
import { Col } from "react-bootstrap";
import LoginIcon from "../assets/images/sign-out-alt-solid.svg";
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
 class Header extends Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(e){
    e.preventDefault();
    //let token = sessionStorage.getItem('token')
    let login_id = sessionStorage.getItem('login_id')
    Axios.put(API_URL+'/hms/kot/logout/'+login_id)
    .then((response)=>{
      // console.log(response.status)
      if(response.status === 200){ 
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('login_id');
        this.props.history.replace('/')
      }
    })
    .catch((e)=>{
      console.log(e.response.status)
    })
  }

  render() {
    return (
      <div>
        <Col lg={2} xs={3} className="outerHeadingDiv">
          <div className="headingDiv">
            <h4>Main KOT</h4>
          </div>
        </Col>
        <Col lg={1} lgOffset={9} xs={3} xsOffset={6}>
          <div className="loginButtonDiv">
            <button className="logoutButton" onClick={this.handleLogout}>
              <img src={LoginIcon} alt="LoginIcon" className="loginIcon" />
            </button>
          </div>
        </Col>
      </div>
    );
  }
}
 
export default withRouter(Header)