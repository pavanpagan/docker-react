import React, { Component } from 'react';
import { Icon } from "react-icons-kit";
import Switch from "react-switch";
import { Button } from "react-bootstrap";
import { filter } from "react-icons-kit/fa/filter";
import {
    MenuItem,
    Form,
    FormGroup,
    FormControl,
    InputGroup,
    Glyphicon,
    ButtonToolbar,
    DropdownButton
  } from "react-bootstrap";
  import axios from 'axios';
  const API_URL = process.env.REACT_APP_API_URL;
  let menu=["breakfast","lunch","brunch","supper","dinner"];
  let menu_list=[];
export default class MenuContHeader extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      search_item:'',
      filter_item:'All',
      menu_list:[{
        menu_name:'',
        menu_status:'',
        menu_bool:false
      }],
      mstatus:false,
      menu:[]
    }
    this.handleSearch.bind(this);
    this.handleSwitch.bind(this);
  }

  async componentWillMount()
  {
    let data=await axios.get(API_URL+'/hms/kot/getMenuList')
    this.setState({
      menu:data.data
    })
  }
handleSearch(e)
{
 let value = e.target.value;
  this.setState({
    search_item:value
  })
   this.props.handleSearch(value,this.state.filter_item);
}
handleFilter(eventKey)
{
   this.props.handleFilter(eventKey);
   this.setState({
    filter_item:eventKey
  })
}
async handleSwitch(e,id)
{
 let status;
 let state;
 if(e)
 {
   state=false
   status='notavailable'
 }
 else
 {
  state=true
  status='available'
 }
 let menu_id=id;
 let d={
   menu_state:state,
   menu_status:status
 }
 await axios.put(API_URL+'/hms/kot/update_menu_status/'+menu_id,{d})
 let data=await axios.get(API_URL+'/hms/kot/getMenuList')
    this.setState({
      menu:data.data
    })

 this.props.handleSwitch(this.state.menu);
}
  render() {
    return (
        <div className="menuHeader">
          <div className="menuHeaderLeft">
            <div className="filterButton">
            <ButtonToolbar>
                    <DropdownButton
                      bsStyle="default"
                      noCaret
                      id="dropdown-no-caret"
                      title={
                        <div>
                          <Icon size={18} icon={filter} />
                          <span> Item Filter {this.state.filter_item} </span>
                        </div>
                      }
                    >
                      <MenuItem eventKey="All" onSelect={this.handleFilter.bind(this)} active >All</MenuItem>
                      <MenuItem eventKey="available" onSelect={this.handleFilter.bind(this)} active >Available</MenuItem>
                      <MenuItem eventKey="notavailable" onSelect={this.handleFilter.bind(this)}>Not Available</MenuItem>
                    </DropdownButton>
                  </ButtonToolbar>
            </div>
          </div>
          {
            this.state.menu.map(menu=>{
              return(
                <div>
                  <Button className={"availItem"+" "+menu.mbool}
                  id={menu.status_id}
                  name={menu.menu_name}
                  ref={menu.menu_name}
                  value={menu.menu_name}
                  checked={menu.mbool}
                  onClick={this.handleSwitch.bind(this,menu.mbool,menu.status_id)}>{menu.menu_name}</Button>
              </div>
              )
            })
          }
          <div className="menuHeaderRight">
            <Form>
            <FormGroup>
                <InputGroup>
                <FormControl 
                 type="text"
                 placeholder="Search Item"
                 maxLength="50"
                 id="search_item"
                 name="search_item"
                 ref="search_item"
                 value={this.state.search_item}
                 onChange={this.handleSearch.bind(this)}
                  />
                  <InputGroup.Addon>
                    <Glyphicon glyph="search"/>
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
        </div>
    )
  }
}
