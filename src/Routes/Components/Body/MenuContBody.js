import React, { Component } from 'react'
import MenuBodyRow from './MenuBodyRow'
import axios from 'axios';
import { kotAdd } from '../../../kotAdd'
import MenuContHeader from '../Headers/MenuContHeader';
import SweetAlert from 'react-bootstrap-sweetalert';
let items = [];
const API_URL = process.env.REACT_APP_API_URL;

export default class MenuContBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            old_items: [],
            menu: [],
            alert_message: '',
            alert_state_danger: false
        }
    }
    handleItemSelect(itemname, itemnumber, price, q_id, q_type, itemQty) {
        this.props.handleItemSelect(itemname, itemnumber, price, q_id, q_type, itemQty);
    }
  
    async componentWillMount() {
        this.get()
    }
    async componentDidMount() {
        kotAdd((err, message) => {
            this.get();
        })
    }
    async get() {
        try {
            const res = await axios.get(API_URL + '/hms/kot/viewItems');
            const { data } = await res;
            let list = await axios.get(API_URL + '/hms/kot/getMenuList')
            this.setState({
                menu: list.data
            })
            let itemhold = [];
            data.map(item => {
                this.state.menu.map(m => {
                    if (item[m.menu_name]) {
                        if (m.mbool) {
                            itemhold.push(item);
                        }
                    }
                })
            })
            let items_unique = itemhold.filter(function (item, index) {
                if (item.item_status === 'available') {
                    return itemhold.indexOf(item) >= index;
                }
            });
            this.setState({
                items: items_unique,
                old_items: items_unique
            })
        }
        catch (error) {
            this.setState({
                alert_message: "Server Error.!",
                alert_state_danger: true
            })
        }
    }

    handleSearch(e, filterItem) {
        let itemall = this.state.old_items.filter(function (data) {
            if (data.itemname.toLowerCase().includes(e.toLowerCase()) ||
                data.itemmaincategory.toLowerCase().includes(e.toLowerCase()) ||
                data.itemsubcategory.toLowerCase().includes(e.toLowerCase()) ||
                data.itemtype.toLowerCase().includes(e.toLowerCase()) ||
                data.itemcode.toLowerCase().includes(e.toLowerCase())
            ) {
                if (filterItem !== 'All') {
                    return data.itemtype === filterItem
                }
                else {
                    return data
                }
            }
        });
        this.setState({
            items: itemall
        })
    }

    handleFilter(eventKey) {

        let itemall = this.state.old_items.filter(function (data) {
            if (eventKey === 'All') {
                return data.table_status !== ''
            }
            else {
                return data.itemtype === eventKey;
            }
        });
        this.setState({
            items: itemall
        })
    }
    render() {
        let j = 0;
        let i = 0;
        return (
            <div className="menuBody">
                <SweetAlert
                    danger title={this.state.alert_message} show={this.state.alert_state_danger} onConfirm={() => {
                        this.setState({
                            alert_state_danger: false
                        })
                    }} />

                <MenuContHeader handleFilter={this.handleFilter.bind(this)} handleSearch={this.handleSearch.bind(this)} />
                <div className="menuBodyRows">
                    {
                        this.state.items.map((item, index) => {
                            i = j;
                            j = j + 4;
                            if (this.state.items.length > j - 4) {
                                return (
                                    <MenuBodyRow handleItemSelect={this.handleItemSelect.bind(this)} elements={this.state.items.slice(i, j)} />
                                )
                            }

                        })
                    }
                </div>
            </div>
        )
    }
}
