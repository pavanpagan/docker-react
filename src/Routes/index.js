import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "./Components/assets/css/index.css";
import Login from "./Login";
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
    </Switch>
  </BrowserRouter>
);
