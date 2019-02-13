import React, { Component } from "react";
import Header from "../Headers/Header";
import HCMenuContainer from "./HCMenuContainer";
import TOKOTContainer from "./TOKOTContainer";
import { Grid, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Tabs from "../extra/Tabs";
const API_URL = process.env.REACT_APP_API_URL;
export default class TakeoutItemSelect extends Component {
  constructor(props)
   {
    super(props);
    this.state = {
      itemName: [],
      price:[],
      id:[],
      itemQty:[],
      tax:0,
      q_id:[],
      q_type:[],
      f_id:0,
      service_tax:0
    };
  }

  handleItemSelect(itemname,itemnumber,price,q_id,q_type,itemQty) 
  {
    let newItemName = this.state.itemName.concat(itemname);
    let newPrice = this.state.price.concat(price);
    let ids= this.state.id.concat(itemnumber);
    let quantity=this.state.itemQty.concat(itemQty);
    let qid=this.state.q_id.concat(q_id);
    let qtype=this.state.q_type.concat(q_type);

    this.setState({ 
      itemName: newItemName,
      price:newPrice,
      id:ids,
      itemQty:quantity,
      q_id:qid,
      q_type:qtype
    });
  }

  async handleReduceItem(itemName,price,q_id,q_type,itemQty)
  {
    let itemNameArray = this.state.itemName;
       let priceArray=this.state.price;
       let quantity_array=this.state.itemQty;
      let quantity_id_array=this.state.q_id;
      let quantity_type_array=this.state.q_type;
       let newArray=[];
     
        let indexs;
       await itemNameArray.filter((list,index)=>{
            priceArray.filter((data,index1)=>{
              quantity_id_array.filter(item=>{
                quantity_type_array.filter(i=>{
                  if(data==price && list==itemName && index===index1 && item==q_id && i==q_type)
                    {
                      indexs=index;
                    }
                })
              })
            })
        })
        if (indexs > -1)
        {
          quantity_array.splice(indexs,1);
          itemNameArray.splice(indexs,1);
          priceArray.splice(indexs,1);
          quantity_id_array.splice(indexs,1);
        }
      
       this.setState({
         itemName: itemNameArray,
         price: priceArray,
         itemQty:quantity_array,
         q_id: quantity_id_array
        });
  }
  handleClear(itemName)
  {
    let itemNameArray = [];
    let price=[];
    let ids=[];
    let quantity=[];
    this.setState({ 
     itemName: itemNameArray,
     price:price,
     id:ids,
     itemQty:quantity
   });
  }
  handleRemoveItem(itemName,prices,q_id,q_type,itemQty)
  {
    let itemNameArray = this.state.itemName;
    let price=this.state.price;
    let ids=this.state.id;
    let quantity=this.state.itemQty;
    let quantity_id_array=this.state.q_id;
    let quantity_type_array=this.state.q_type;
 
    let newItemArray=[];
    let newPrice=[];
    let newQid=[];
    let newQtype=[];
 
    for(let i=0;i<itemNameArray.length;i++)
    {
      if(itemNameArray[i]!=itemName || quantity_id_array[i]!=q_id || prices!=price[i])
      {
       newItemArray.push(itemNameArray[i]);
       newPrice.push(price[i]);
       newQid.push(quantity_id_array[i]);
       newQtype.push(quantity_type_array[i])
      }
    }
  
   this.setState({
     itemName: newItemArray,
     price:newPrice,
     id:ids,
     itemQty:quantity,
     tax:0,
     q_id:newQid,
     q_type:newQtype
   });
  }
  async get()
  {
    try
    {
    const res = await axios.get(API_URL+'/hms/kot/tax/'+this.state.f_id);
      const {data}  = await res;
      if(data[0])
      {
        this.setState({
          tax:data[0].item_tax,
          service_tax:data[0].service_tax
        })
      }
    }
    catch(err)
    {
      
    }
  }
  componentWillUpdate()
  {
    if(this.state.tax===0)
    {
      this.get();
    }
  }
  render() {
    return (
      <div className="App">
        <Grid fluid>
          <Row className="headerRow">
            <Header />
          </Row>
          <Row>
            <Tabs />
            <Col xs={11} className="tabContainer">
              <div className="homeItemSelect">
                <Row>
                  <Col xs={9} className="menuContOuterDiv">
                    <HCMenuContainer
                      handleItemSelect={this.handleItemSelect.bind(this)}
                    />
                  </Col>
                  <Col xs={3} className="kotContOuterDiv">
                    <TOKOTContainer
                      itemName={this.state.itemName}
                      price={this.state.price}
                      id={this.state.id}
                      itemQty={this.state.itemQty}
                      tax={this.state.tax}
                      service_tax={this.state.service_tax}
                      q_id={this.state.q_id}
                      q_type={this.state.q_type}
                      order_from="Restaurant"
                      order_to="Kitchen"
                      handleRemoveItem={this.handleRemoveItem.bind(this)}
                      handleReduceItem={this.handleReduceItem.bind(this)}
                      handleClear={this.handleClear.bind(this)}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
