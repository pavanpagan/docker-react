import React, { Component } from 'react';
import { Icon } from "react-icons-kit";
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
export default class MenuHeader extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      search_item:'',
      filter_item:'All'
    }
    this.handleSearch.bind(this)
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
                      <MenuItem eventKey="Veg" onSelect={this.handleFilter.bind(this)}>Veg</MenuItem>
                      <MenuItem eventKey="Nonveg" onSelect={this.handleFilter.bind(this)}>Nonveg</MenuItem>
                      <MenuItem eventKey="Hotdrink" onSelect={this.handleFilter.bind(this)}>Hotdrink</MenuItem>
                    </DropdownButton>
                  </ButtonToolbar>
            </div>
          </div>
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
                    <Glyphicon glyph="search" />
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
        </div>
    )
  }
}
