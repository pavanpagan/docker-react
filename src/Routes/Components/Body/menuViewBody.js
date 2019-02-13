import React, { Component } from "react";
import {Table,Radio,Glyphicon} from "react-bootstrap";
import axios from 'axios';
import MenuViewHeader from "../Headers/MenuViewHeader";
import MenuHeader from "../Headers/MenuHeader";
import MenuViewItemList from "../list/MenuViewItemList";
import  SweetAlert from 'react-bootstrap-sweetalert';
import {glass} from 'react-icons-kit/fa/glass'
import { Icon } from "react-icons-kit";
const API_URL = process.env.REACT_APP_API_URL;
let m=[];
export default class menuViewBody extends Component {
 constructor(props)
 {
     super(props);
     this.state={
        menu:[],
        items:[],
        old_items:[],
        t:true,
        d:false,
        keys:false,
        itt_id:[],
        alert_message:'',
        alert_state_danger:false
     }
  
 }
    async componentWillMount()
  {
    try
    {
        let list=await axios.get(API_URL+'/hms/kot/getMenuList')
        this.setState({
          menu:list.data
        })
        m=list.data;
       
        const res = await axios.get(API_URL+'/hms/kot/viewItems');
       const { data } = await res;
       this.setState({
         items:data,
         old_items:data
       })
    }
    catch(error)
    {
        this.setState({
            alert_message:"Server Error.!",
            alert_state_danger:true
          })
    }
  
  
  }

  handleSearch(e,eventKey)
  {
  let ordersall = this.state.old_items.filter(function(data)
    {
        if(data.itemname.toLowerCase().includes(e.toLowerCase()))
        {
            if(eventKey!=='All')
            {
              return data.itemtype===eventKey
            }
            else
            {
              return data
            }
        }
    });
    this.setState({
        items:ordersall
    })
  }

  handleFilter(eventKey)
  {
   let itemall = this.state.old_items.filter(function(data)
      {
        if(eventKey!=='All')
        {
          return data.itemtype===eventKey
        }
        else
        {
          return data
        }
      });
      this.setState({
        items:itemall
      })
  }

  renderIcon(type)
  {
    if(type==='Hotdrink')
    {
      return(
       
        <td className="center"><Icon size={12} className='Hotdrink' icon={glass}/></td>
      )
    }
    else
    {
      return(
        <td className="center"><Glyphicon glyph="stop" className={type+"Item"}/></td>
      )
    }
  }
  render()
  {
    return (
      <div>

        <MenuHeader  handleSearch={this.handleSearch.bind(this)}  handleFilter={this.handleFilter.bind(this)} />
      <div className="foodmenuBody">
        <Table className="foodmenuTable">
          <MenuViewHeader menu={this.state.menu}/>
          <SweetAlert 
                danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={()=>{
                this.setState({
                alert_state_danger:false
                })
                }}
           />
          <tbody>
                {
                 this.state.items.map((item,index)=>{
                  console.log("item",item);
                    return(

                        <tr>
                            <td className="left">{index+1}</td>
                            {this.renderIcon(item.itemtype)}
                            <td className="center">{item.itemname}
                            </td>
                            {
                                Object.keys(item).map(function(key, index) 
                                {
                                    let id=item["itt_id"];
                                    if(key!="bool" && key!="item_status" && key!="itemmaincategory" &&
                                        key!="itemnumber" && key!="itemsubcategory" &&  key!="itemtype" && key!="itemcode" &&
                                        key!="itt_id" && key!="menu_id" && key!="price_list" && key!="itemname")
                                     {
                                        if(item[key])
                                        {
                                            return(
                                                <td className="center" >
                                                <MenuViewItemList
                                                    keys={key}
                                                    value={item[key]}
                                                    item_id={id}
                                                />
                                                </td>
                                         )
                                        }
                                        else
                                        {
                                         return(
                                            <td className="center">                                      
                                            <MenuViewItemList
                                               keys={key}
                                               value={item[key]}
                                               item_id={id}
                                            />
                                            </td>
                                         )
                                        }
                                   }
                                })
                            }
                        </tr>
                    )
                   })
                }
          </tbody>
        </Table>
      </div>
      </div>
    );
  }
}
