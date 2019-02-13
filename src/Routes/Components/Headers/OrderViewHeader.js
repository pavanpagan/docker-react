import React, { Component } from 'react'

export default class OrderViewHeader extends Component {
  render() {
    return (
        <thead>
        <tr>
          <th className="center">#</th>
          <th className="center">Order Date</th>
          <th  className="center">Number Of Kot</th>
          <th className="center">Kot Numbers</th>
          <th className="center">Table Number</th>
          <th className="center">Total Amount (₹)</th>
          <th className="center">Print Bill</th>
        </tr>
      </thead>
    )
  }
}
