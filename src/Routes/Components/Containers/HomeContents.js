import React, { Component } from "react";
import HCBody from "../Body/HCBody";
import Header from "../Headers/Header";

import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "../extra/Tabs";
export default class HomeContents extends Component {
  render() {
    return (
      <div className="App">
        <Grid fluid>
          <Row className="headerRow">
            <Header />
          </Row>
          <Row>
            <Tabs />
            <Col xs={11} className="tabContainer">
              <div>
                <HCBody/>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
