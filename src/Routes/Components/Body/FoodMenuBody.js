import React, { Component } from "react";
import {Table} from "react-bootstrap";
import FoodMenuItemList from "../list/FoodMenuItemList";
import Switch from 'react-switch';
import FoodMenuHeader from '../Headers/FoodMenuHeader';
import FoodMenuTableHeader from "../Headers/FoodMenuTableHeader";
import axios from 'axios';
import {kotAdd} from '../../../kotAdd';
import  SweetAlert from 'react-bootstrap-sweetalert';
const API_URL = process.env.REACT_APP_API_URL;
export default class FoodMenuBody extends Component {
 constructor(props)
 {
     super(props);
     this.state={
        items:[],
        old_items:[],
        menu:[],
        items_unique:[],
        filter_item:'All',
        search_item:'',
        alert_message:'',
        alert_state_danger:false,
        alert_state_warning:false
     }
 }
async componentWillMount()
{
  this.get();
}
async componentDidMount() {
  kotAdd((err, message) => {
    this.get();
  })  
}
async get(){
  let list=await axios.get(API_URL+'/hms/kot/getMenuList')
  this.setState({
    menu:list.data
  })
  this.loadItems(this.state.menu);
}


  handleSearch(e,filter_item)
  {
   this.ViewItemsSort(filter_item);
   let itemall = this.state.items_unique.filter(function(data)
    {
        if(data.itemname.toLowerCase().includes(e.toLowerCase()) ||
        data.item_status.toLowerCase().includes(e.toLowerCase()) ||
        data.itemmaincategory.toLowerCase().includes(e.toLowerCase()) ||
        data.itemsubcategory.toLowerCase().includes(e.toLowerCase()) ||
        data.itemtype.toLowerCase().includes(e.toLowerCase()) ||
        data.item_status.toLowerCase().includes(e.toLowerCase()))
        {
          if(filter_item==='All')
          {
            return data;
          }
          else
          {
            return data.item_status===filter_item;
          }
        }
    });
    this.setState({
      items:itemall,
      filter_item:filter_item
    })
  }
  

  ViewItemsSort(filter)
  {
    let itemhold=[];
    this.state.old_items.map(item=>{
      if(filter==='All')
      {
        this.state.menu.map(m=>{
          if(item[m.menu_name])
          {
            if(m.mbool)
          {
              itemhold.push(item);
          }
          }
        })
      }
     else if(item.item_status===filter)
     {
      this.state.menu.map(m=>{
        if(item[m.menu_name])
        {
          if(m.mbool)
        {
            itemhold.push(item);
        }
        }
      })
     }
    })
    let items_unique = itemhold.filter(function(item, index)
    {
      return itemhold.indexOf(item) >= index;
    });
     this.setState({
       items:items_unique,
       items_unique:items_unique,
       filter_item:filter
     })
  }
  async loadItems(menu)
  { 
    try
    {
      const res = await axios.get(API_URL+'/hms/kot/viewItems');
      const { data } = await res;
      this.setState({
        items:data,
        old_items:data,
        menu:menu
      })
      this.ViewItemsSort(this.state.filter_item);
    }
    catch(error)
    {
      this.setState({
        alert_message:"Error Cannot Load Items..!",
        alert_state_danger:true
      })
    }
  }
  
  handleSwitch(menu)
  {
   
  this.setState({
    menu:menu
  })
  this.loadItems(this.state.menu)
  }

  async handleFilter(eventKey)
  {
    this.setState({
      filter_item:eventKey
    })
    await this.ViewItemsSort(eventKey);   
   let itemall = this.state.items.filter(function(data)
      {
          if(eventKey==='All')
          {
            return data
          }
          else
          {
            return data.item_status===eventKey;
          }
      });
      this.setState({
        items:itemall
      })
  }
 async handleSwitchItem(state,id)
  {
    if(state)
    {
    let status='notavailable';
    let data=
    {
      status:status
    }
    let res;
      try
      {
        res= await axios.put(API_URL+'/hms/kot/UpdateItem/'+id,{data})
      }
      catch(error)
      {
        this.setState({
          alert_message:"Server Error..!",
          alert_state_danger:true
        })
      }
      let code=  await res.status;
       if(res.data[0] && code===200 )
       {
        this.loadItems(this.state.menu);
       }
       else
       {
        this.setState({
          alert_message:"Not Updated..!",
          alert_state_warning:true
        })
       }
    }
    else
    {
    let status='available';
    let data=
    {
      status:status
    }
    let res;
    try
    {
      res= await axios.put(API_URL+'/hms/kot/UpdateItem/'+id,{data})
      let code=  await res.status;
      if(res.data[0] && code===200 )
        {
          this.loadItems(this.state.menu);
        }
        else
        {
          this.setState({
            alert_message:"Not Updated..!",
            alert_state_warning:true
          })
        }
    }
   catch(error)
   {
    this.setState({
      alert_message:"Server Error..!",
      alert_state_danger:true
    })
   }
   
    }
  }
  render()
  {
    return (
      <div> 
      <FoodMenuHeader  handleSearch={this.handleSearch.bind(this)} handleSwitch={this.handleSwitch.bind(this)} handleFilter={this.handleFilter.bind(this)} />
      <div className="foodmenuBody">
      
        <Table className="foodmenuTable">
          <FoodMenuTableHeader />
          <tbody>
              {this.state.items.map((item,index)=>
              <FoodMenuItemList
                slNo={index+1}
                itemName={item.itemname}
                itemCategory={item.itemmaincategory +" > "+ item.itemsubcategory}
                itemType={item.itemtype}
                status={item.item_status}
                item_id={item.itemnumber}
                switch={item.bool}
                handleSwitchItem={this.handleSwitchItem.bind(this)}
            />
            )}
             <SweetAlert 
                       danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={()=>{
                        this.setState({
                          alert_state_danger:false
                        })
                }}/>
                  <SweetAlert 
                       warning title={this.state.alert_message} show={this.state.alert_state_warning} onConfirm={()=>{
                        this.setState({
                          alert_state_warning:false
                        })
                }}/>
          </tbody>
        </Table>
      </div>
      </div>
    );
  }
}
