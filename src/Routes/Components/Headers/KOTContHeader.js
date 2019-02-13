import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/fa/plus";
export default class KOTContHeader extends Component {
 constructor(props)
 {
   super(props);
   this.state={
    table_number:0,
    split_series:''
   }
 }
  componentWillReceiveProps()
  {
    let ss;
    if(this.props.split_series===null)
    {
     ss=''
    }
    else
    {
      ss="-"+this.props.split_series
    }
    this.setState({
      table_number:this.props.table_number,
      split_series:ss
    })
  }
  render() {
    return (
      <div className="kotContainerHeader">
        <div className="tableNumDiv">
          <div>
            <p>Table {this.state.table_number+this.state.split_series}</p>
          </div>
        </div>
      </div>
    );
  }
}
