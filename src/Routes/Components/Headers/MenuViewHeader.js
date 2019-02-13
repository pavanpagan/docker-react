import React, { Component } from 'react'

export default class OrderViewHeader extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            menu:[]
        }
    }
    // componentWillMount()
    // {style={{paddingRight:"80px"}}

    // }
    componentWillReceiveProps()
    {
        this.setState({
            menu:this.props.menu
        })
    }
  render() {
    return (
        <thead>
        <tr>
          <th className="">#</th>
          <th className="center">Type</th>
          <th className="center">Item Name</th>
          {
              this.state.menu.map(menu=>{
                  return(
                    <th  className="center">{menu.menu_name}</th>
                  )
              })
          }
        </tr>
      </thead>
    )
  }
}
