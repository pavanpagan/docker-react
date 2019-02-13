import React, { Component } from 'react'
import {Pagination} from 'react-bootstrap';

export default class FoodMenuFooter extends Component 
{
  render() {
    let active = 1;
    let items = [];
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item active={number === active}>{number}</Pagination.Item>
      );
    }
    return (
      <div className="menuFooter">
        <Pagination bsSize="medium">{items}</Pagination>
      </div>
    )
  }
}
