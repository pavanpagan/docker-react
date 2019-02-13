import React, { Component } from 'react';

import '../assets/css/bill.css';
import {Table,Row,Col} from 'react-bootstrap'

import moment  from 'moment-timezone';
import ReactToPrint from "react-to-print";

class Billing extends Component {
    constructor(props)
    {
        super(props);
    }
   
  render() {
   
    return (
	<div className="Billdiv">
    <div className="Billnew">
      <div>
        <div className="Billheader">
           <center>
              <img className="Billimg" src={require('../assets/images/download.png')} />
            </center>
        </div>
      <div>
        <center>
            <h4>
                <br/>
                 <b>Hotel Ashlesh</b> <br/> </h4>
                 <h5>  Opp. MIT,Manipal-karkala Road,<br/>
                   Manipal
                </h5>
        </center>
      </div>
      <div>
          <center>
               <div className="A3 Portrait">
                <div className="Billcolumn left">Billno:{this.props.bill_no}</div>
                <div className="Billcolumn middle">Date:{moment(this.props.date).format('llll')}</div>
                <div className="Billcolumn right"> Tableno:{this.props.table_number}</div>
                </div>
          </center>
      <br/>
      <br/>
      <br/>
      </div>
      <div >
      <table className="table table-condensed Billtable">
    						<thead>
                      <tr className="text-center Billtable">
        							<td className="Billtable"><strong>SNo</strong></td>
        							<td className="text-center Billtable"><strong>Description</strong></td>
        							<td className="text-center Billtable"><strong>Qty</strong></td>
                      <td className="text-center Billtable"><strong>Price</strong></td>
        							<td className="text-right Billtable"><strong>Amount</strong></td>
                       </tr>
    						</thead>
    						<tbody>
                {
                    this.props.kot_list.map((list,index)=>{
                    
                     return(
                        <tr>
                        <td>{index+1}</td>
                        <td className="text-center">{list.item_name}</td>
                        <td className="text-center">{list.quantity}</td>
                        <td className="text-center">{list.price}</td>
                        <td className="text-right">{parseFloat(parseInt(list.quantity)*parseInt(list.price))}</td>
                      </tr>
                       )
                      })
                    } 
                    <br/>
    							<tr>
                  <td className="thick-line"></td>
                  <td className="thick-line"></td>
    								<td className="thick-line"></td>
    								<td className="thick-line text-center"><strong>Total amount</strong></td>
    								<td className="thick-line text-right">{this.props.total_amount}</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line"></td>
    								<td className="no-line text-center"><strong>CGST@{this.props.tax/2}%</strong></td>
    								<td className="no-line text-right">{this.props.tax_amount/2}</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line text-center"><strong>SGST@{this.props.tax/2}%</strong></td>
    								<td className="no-line text-right">{this.props.tax_amount/2}</td>
    							</tr>
                  <tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
                    <td className="no-line"></td>
    								<td className="no-line text-center"><strong>Service Tax @10%</strong></td>
    								<td className="no-line text-right">0</td>
    							</tr>
                  <tr>
                  <td className="thick-line"></td>
                  <td className="thick-line"></td>
    								<td className="thick-line"></td>
    								<td className="thick-line text-center"><strong>Net amount</strong></td>
    								<td className="thick-line text-right">{this.props.total_amount+this.props.tax_amount}</td>
    							</tr>
    						</tbody>
    					</table>
      </div>
     <div>
       <br/>
       <p className="Billkot">KOT NO:{this.props.kot_id.map(kot=>{
          return kot
        })+" "}</p>
      </div>
<div>
<p className="Billsign" >Sign:</p>
<br/>
<hr className="Billhr"/>
</div>
  <div><center> ashleshhotelmanipal@gmail.com</center>
  <footer><center><b>Thank You visit again</b></center>  </footer>
  </div>      
        </div>
     
      </div>
      
			</div>
    );
  }
}
export default Billing;