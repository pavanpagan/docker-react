import React, { Component } from 'react'
import {Well,Glyphicon,Button} from 'react-bootstrap';
import { Icon } from "react-icons-kit";
import {glass} from 'react-icons-kit/fa/glass'

export default class MenuItemList extends Component {
  constructor(props)
  {
    super(props);
    this.props.price_list.map(list=>{
    this.state={
      [list.quantitytype]:true,
       price:0,
       q_id:0,
       q_type:''
    }
   })
  }
  handleItemSelect()
  {
    this.props.handleItemSelect(this.props.itemname,this.props.itemnumber,this.state.price,this.state.q_id,this.state.q_type,this);
  }
  typeRender()
  {
    if(this.props.itemtype==='Hotdrink')
    {
      return(
        <Icon size={12} className='Hotdrink' icon={glass}/>
      )
    }
    else
    {
      return(
          <Glyphicon glyph="stop" className={this.props.itemtype+"Item"}/>
      )
    }
  }
  quntitySelect(e)
  {
    if(this.props.price_list.length>1)
    {
      this.props.price_list.map(list=>{
        this.setState({
          [list.quantitytype]:false,
        })
      })
    if(this.state[e.target.id])
    {
      console.log("dsd",e.target.id,this.state[e.target.id]);
      this.setState({
      [e.target.id]:true
      })
    }
    else
    {
      this.setState({
        [e.target.id]:true,
         
        })
    }
  this.props.price_list.filter(list=>{
    if(list.quantitytype==[e.target.id])
    {
      this.setState({
        price:list.price,
        q_id:list.quantity_id,
        q_type:list.quantitytype
      })
      }
     })
    }
  }

  componentWillMount()
  {
    this.props.price_list.map(list=>{
      if(this.state[list.quantitytype])
      {
       this.props.price_list.map(list=>{
        this.setState({
          [list.quantitytype]:false,
          q_id:list.quantity_id,
          q_type:list.quantitytype
        })
      })
        this.setState({
          price:list.price,
        })
        this.setState({
          [list.quantitytype]:true
        })
      }
    })
  }

 renderButton()
  {
  
    return(
   this.props.price_list.map((list,index)=>{
    if(this.state[list.quantitytype]==true || this.state[list.quantitytype]==false)
    {
      return(
        <Button onClick={this.quntitySelect.bind(this)}  id={list.quantitytype} name={list.quantitytype} className={"buttonSelect"+" "+this.state[list.quantitytype]}>{list.quantitytype}</Button>
      )
    }
    else
    {
      if(this.props.price_list.length!=(index+1))
      {
        return(
          <Button onClick={this.quntitySelect.bind(this)}  id={list.quantitytype} name={list.quantitytype} className={"buttonSelect"+" "+false}>{list.quantitytype}</Button>
        )
      }
      else
      {
        return(
          <Button onClick={this.quntitySelect.bind(this)}  id={list.quantitytype} name={list.quantitytype} className={"buttonSelect"+" "+true}>{list.quantitytype}</Button>
        )
      }
    }
      })
    )
  }
  render() 
  {

    return (
        <Well bsSize="small" >
        <p onClick={this.handleItemSelect.bind(this)}>{this.props.itemname}</p>
        <div onClick={this.handleItemSelect.bind(this)} className="itemSection">
          <p>{this.props.itemcategory}</p>
        </div>
        <div onClick={this.handleItemSelect.bind(this)} className="itemDetails">
        <div   className="itemPrice">
        ₹{this.state.price}
          </div>
          <div  className="itemCategory">
             {this.typeRender()}
          </div>
        </div>
        <div className="quantityClass">
            {
              this.renderButton()
            }
        </div>
      </Well>
    )
  }
}
