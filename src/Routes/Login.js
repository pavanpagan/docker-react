import React, { Component } from "react";
import {withRouter } from "react-router-dom";

import Axios from 'axios';
import  SweetAlert from 'react-bootstrap-sweetalert';
import { Grid, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

class Login extends Component 
{
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <div className="outerGrid">
        <Grid>
          <Row>
         fdfdfdfdfdf
          </Row>
        </Grid>
      </div>
    );
  }
}
export default withRouter(Login);
