import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Tab from "./Tab";
import { th } from "react-icons-kit/fa/th";
import { listUl } from "react-icons-kit/fa/listUl";
import { bell } from "react-icons-kit/fa/bell";
import {table} from 'react-icons-kit/icomoon/table'
import {ic_restaurant_menu} from 'react-icons-kit/md/ic_restaurant_menu'
import { cutlery } from "react-icons-kit/fa/cutlery";
import {ic_playlist_add} from 'react-icons-kit/md/ic_playlist_add'
import {ic_add_circle_outline} from 'react-icons-kit/md/ic_add_circle_outline'
export default class Tabs extends Component {
  render() {
    return (
      <div>
        <Col sm={1} className="tabSidebar">
          <div className="tabSegments">
            <Tab label={th} path="home"/>
            {/* <label className="tabfonts">DashBoard</label> */}
            <Tab label={cutlery} path="takeouts" />
            {/* <label className="tabfonts">Takeouts</label> */}
            <Tab label={listUl} path="foodmenu" />
            {/* <label className="tabfonts">Menu</label> */}
            <Tab label={table} path="orders" />
            {/* <label className="tabfonts">Orders</label> */}
            <Tab label={ic_restaurant_menu} path="menu"/>
            {/* <label className="tabfonts">Edit Menu</label> */}
            <Tab label={ic_add_circle_outline} path="menucreate" />
            {/* <label className="tabfonts">New Menu</label> */}

            {/* <Tab label={bell} path="notifications" /> */}

          </div>
        </Col>
      </div>
    );
  }
}
