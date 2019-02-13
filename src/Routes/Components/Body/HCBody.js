import React, { Component } from "react";
import HotelTables from "../extra/HotelTables";
import { Col, Row,Button } from "react-bootstrap";
import moment from 'moment-timezone';
import axios from "axios";
import TableReturn from "../extra/TableReturn";
import HCHeader from "../Headers/HCHeader";
import  SweetAlert from 'react-bootstrap-sweetalert';
import { ToastContainer, toast,Slide,Bounce,Zoom, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from "react-icons-kit";
import {kotAdd} from '../../../kotAdd'
import {upload} from 'react-icons-kit/iconic/upload'
import {checkCircle} from 'react-icons-kit/fa/checkCircle'
import {ic_person_add} from 'react-icons-kit/md/ic_person_add'
import { ic_call_split } from "react-icons-kit/md/ic_call_split";

const API_URL = process.env.REACT_APP_API_URL;
let current_date_time=moment.tz('Asia/Kolkata').format("YYYY-MM-DD hh:mm:ss a");

export default class HCBody extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      tables:[],
      old_state:[],
      alert_message:'',
      alert_state_danger:false,
      alert_state_warning:false,
      alert_state_success:false,
      statusLength:4,
      floorLength:0,
      allStatus:[],
      newStatus:["Ordered","Served","Empty","Billed"],
      newFloor:[],
      allFloors:[],
       Ordered:{
        value:"Ordered",
        state:true
      },
      Served:{
        value:"Served",
        state:true
      },
     Empty:{
      value:"Empty",
      state:true
     },
     Billed:{
      value:"Billed",
      state:true
     },
     selectOptions:[],
     addEmployee:true,
     addList:[],
     emp_id_selected:0,
     rooms:[],
     room_with_name:[]
    }
  }

  handleItemSelect(table_number,emp_id)
  {
    this.props.handleItemSelect(table_number,emp_id);
  }

  async get()
  {
    try
    {
      let employee_data;
      let data=await axios.get(API_URL+'/hms/kot/tableview')
      if(data.status===200)
      {
         employee_data=await axios.get(API_URL+'/hms/kot/ViewEmployee')
         if(employee_data.status===200)
         {
          let getRooms=await axios.get(API_URL+"/hms/kot/getBookedRooms");
          if(getRooms.status===200)
          {
            let allrooms=[];
            this.setState({
              room_with_name:getRooms.data
            })
            getRooms.data.map(room=>{
               allrooms.push(room.room_num)
            })
            this.setState({
              rooms:allrooms
            })
          }
         }
      }
      let options=[];
      employee_data.data.map(data=>{
        options.push({value:data.employee_id,label:data.employee_name})
       })

      let tables=data.data;
      let avail_room=[];
     tables= tables.filter(tables=>{
       if(tables.tables[0].floor_name==='ROOM')
       {
         if(this.state.rooms.toString().includes(tables.tables[0].table_number.toString())) 
         {
          avail_room.push(tables.tables[0].table_number);
          return tables;
         }
       }
       else
       {
         return tables;
       }
      })

      let roomwithname=[]
      roomwithname =this.state.room_with_name.filter(rooms=>{
       if(avail_room.toString().includes(rooms.room_num))
       {
            return rooms;
       }
      })
      this.setState({
        room_with_name:roomwithname
      })
      let sort= tables.sort(function(a, b)
      {
        return a.table_number-b.table_number
      })
      let table_all=[]
      sort.map(data=>{
        if(this.state.statusLength===0)
        {
         
        }
        else
        {
          let f=false;
          data.tables.map(tables=>{
            if(this.state.newStatus.includes(tables.table_status))
            {
              f=true
            }
          })
          if(f)
          {
            table_all.push(data) 
          }
        }
      })
  
      this.setState({
        tables:table_all,
        old_state:sort,
        selectOptions:options
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
  async componentDidMount()
  {
    kotAdd((err, message) => {
    //  let arr = [];
    //  arr = message.result;
    if(message === null){

    }
    else{
      if(message.message === 'waiter requested')
      {
        let msg = 'Table No.'+message.table_number+' requested waiter. Please Inform waiter '+message.employee_name;
        this.notify(msg)
      }
      else if(message.message === 'Bill Requested')
      {
        let msg = 'Table No.'+message.table_number+' requested Bill.';
        this.notify(msg)
      }
      else{
        
      }
      this.get();
    }
    })
  }

  notify(message){
    const Msg = ({ closeToast }) => (
        <div style={{fontSize:'16px'}}>
            {message}<br/>
            <button className='btn btn-default' onClick={closeToast}>OK</button>
        </div>
    )
    toast.info(<Msg/>)
}
   componentWillMount()
    {
        this.get();
        this.setState({
          allStatus:[this.state.Ordered,this.state.Served,this.state.Empty,this.state.Billed]
        })
    }
  //  componentWillMount()
  //   {
  //       this.get();
  //       this.setState({
  //         allStatus:[this.state.Ordered,this.state.Served,this.state.Empty,this.state.Billed]
  //       })
  //   }

    async handleTableDelete(table_id)
    {
      try
      {
        await axios.delete(API_URL+'/hms/kot/Splittable/'+table_id)
        await this.get();
      }
      catch(error)
      {
        this.setState({
          alert_message:"Server Error.!",
          alert_state_danger:true
        })
      }
    }

    
    async handleSplit(emp_id,table_number,f_id)
    {
        try
        {
          let data={
            table_number:table_number,
            emp_id:emp_id,
            table_split:true,
            f_id:f_id
          }
          await axios.post(API_URL+'/hms/kot/splitTable',{data});
          await  this.get();
        }
        catch(error)
        {
          this.setState({
            alert_message:"Server Error.!",
            alert_state_danger:true
          })
        }
    }


    
  handleStatus(Ordered,Served,Empty,Billed,allFloors)
  {
    let allStatus=[Ordered,Served,Empty,Billed];
    let allFloor=allFloors;                                 
   this.allFilters(allStatus,allFloor)
  }

  async handleFloors(allFloorss)
  {
    let allStatus=this.state.allStatus;
    let allFloor=allFloorss;  
    this.allFilters(allStatus,allFloor)
  }

  allFilters(aS,aF)
  {
    let allStatus=aS
    let allFloors=aF;
    let newStatus=[];
    let newFloor=[]

    allFloors.map(floor=>{
      if(floor.state)
      {
        newFloor.push(floor.value)
      }
    })
    allStatus.map((status,index)=>{
        if(status.state)
        {
          newStatus.push(status.value)
        }
    })
  
    let floorLength=newFloor.length;
    let statusLength=newStatus.length;
   
    let Floor_all = this.state.old_state.filter(function (data)
    {
      if(statusLength===0 && floorLength===0)
      {
        return data
      }
      else
      {
        let f=false;
        data.tables.map(tables=>{
          if(newFloor.includes(tables.f_id) && newStatus.includes(tables.table_status))
          {
            f=true
          }
        })
        if(f)
        {
          return data
        }
      }
    });

    this.setState({
      tables:Floor_all,
      allFloors:allFloors,
      allStatus:allStatus
     })
  }
  async handleEmployee()
  {
    if(this.state.addEmployee)
    {
      this.setState({
        addEmployee:false
      })

    }
    else
    {
      this.setState({
        addEmployee:true
      })
      
      if(this.state.emp_id_selected<1 || this.state.addList.length===0)
      {
        this.setState({
          alert_message:"Please Select Name and Tables.!",
          alert_state_warning:true,
          addList:[],
          emp_id_selected:0
        })
      }
      else
      {
      try
      {
        let data=
        {
          table_list:this.state.addList
        }
        let resp=await axios.put(API_URL+'/hms/kot/updateEmployeeTable/'+this.state.emp_id_selected,{data});
        if(resp.status===200)
        {
          this.setState({
            alert_message:"Employee Changed",
            alert_state_success:true,
            addList:[],
            emp_id_selected:0
          })
       setTimeout(async() => {
          this.get();
          }, 200);
        }
        else
        {
          this.setState({
            alert_message:"Employee Not Updated.!",
            alert_state_warning:true
          })
        }
      }
      catch(error)
      {
        this.setState({
          alert_message:"Server Error.!",
          alert_state_danger:true
        })
      }
    }
    }
  }
  
  handleSelect(empname,empid)
  {
    this.setState({
      emp_id_selected:empid
    })
  }
  addEmployeeRender()
  {
    if(this.state.addEmployee)
    {
      return(
        <div>
           <Icon className="addEmployee" size={30} onClick={this.handleEmployee.bind(this)} icon={ic_person_add} />
           </div>
      )
    }
      else
      {
        return(
          <div>
           <Icon className="addEmployee upload" size={30}  onClick={this.handleEmployee.bind(this)} icon={checkCircle} />
           </div>
        )
      }
    }
  checkboxSelect(addList)
  {
    console.log("values",addList)
    this.setState({
      addList:addList
    }
    )
  }
  render() {
    let j=0;
    let i=0;
    return (
      <div>
         <ToastContainer autoClose={false} newestOnTop={true} transition={Bounce}/>
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
            <SweetAlert 
          success title={this.state.alert_message} show={this.state.alert_state_success} onConfirm={()=>{
          this.setState({
          alert_state_success:false
           })
           }}/>
           <div>
        <HCHeader addEmployee={this.state.addEmployee} selectOptions={this.state.selectOptions} handleSelect={this.handleSelect.bind(this)} handleStatus={this.handleStatus.bind(this)} handleFloors={this.handleFloors.bind(this)} />
           </div>
           <div className="scroll">
       {
         this.state.tables.map((table,index)=>{
            i=j;
            j=j+4;
            if(this.state.tables.length>j-4)
            {
              return(
             <TableReturn room_with_name={this.state.room_with_name}checkboxSelect={this.checkboxSelect.bind(this)} addEmployee={this.state.addEmployee} handleTableDelete={this.handleTableDelete.bind(this)} handleItemSelect={this.handleItemSelect.bind(this)}   handleSplit={this.handleSplit.bind(this)}  elements={this.state.tables.slice(i, j)}/>
                )
            }
         })
       }
           </div>
           {this.addEmployeeRender()}
      </div>
    );
  }
}


