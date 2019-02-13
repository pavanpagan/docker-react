import React, { Component } from 'react'

export default class FoodMenuTableHeader extends Component {
  render() {
    return (
        <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Category</th>
          <th  className="center">Veg/Non-Veg</th>
          <th  className="center">Availability</th>
        </tr>
      </thead>
    )
  }
}
