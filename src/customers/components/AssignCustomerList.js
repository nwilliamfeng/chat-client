import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { customerActions } from '../actions';
import { AssignCustomerListItem } from './AssignCustomerListItem';
import { ContextMenu, MenuItem } from "react-contextmenu";
import { CustomerColumnHeader } from './CustomerColumnHeader';
import {chatActions} from '../../chat/actions';
require('../../assets/styles/scrollbar.css');

export const CUSTOMER_CONTEXTMENU_ID = 'CUSTOMER_CONTEXTMENU_ID';

const divStyle =width=> ({
     overflowX: 'auto',
     overflowY: 'auto',
    whiteSpace: 'nowrap',
    height:'100%',
     width: '100%',
     
    paddingLeft:5,
    paddingRight:5,
    
})

 


class AssignCustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = { sortColumn: null, sortOrder: 0, };       
        this.getSort = this.getSort.bind(this);

    }

    componentDidMount() {
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props;
            dispatch(customerActions.fetchCustomerList());
        }
    }

    componentWillUnmount() {
        //todo close query customerlist
    }

    handleOpenChat= customer=> {
        const {dispatch} =this.props;
        dispatch(chatActions.openAssignedCustomerChat(customer));
     }

    sortCustomerList(customers) {
        const { sortColumn, sortOrder } = this.state;
        if (sortColumn == null || sortOrder === 0) {
            return customers;
        }
        customers.sort((a, b) => {
            const result = sortOrder === 2 ? a[sortColumn] >= b[sortColumn] : a[sortColumn] <= b[sortColumn];
            return result === true ? -1 : 1;
        })
    }

    handleClick=({target})=> {
        const customer = JSON.parse(target.getAttribute('customer'));
        alert(customer.CustomerName);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.sortOrder !== nextProps.sortOrder || this.props.sortColumn !== nextProps.sortColumn) {
            return true;
        }
        if(this.props.customerListHeight!==nextProps.customerListHeight){
            return true;
        }
        if(this.props.customerListWidth!==nextProps.customerListWidth){
            return true;
        }
        const current = this.props.customers;
        const { customers } = nextProps;
        var result = current !== customers;
        return result;
    }

    handleColumnHeaderClick =(column, sortOrder)=> {
        this.setState({ sortColumn: column, sortOrder });
        this.forceUpdate(); //强迫render
    }

    getSort(column) {
        const { sortColumn, sortOrder } = this.state;
        return sortColumn === column ? sortOrder != null ? sortOrder : 0 : 0;
    }

    render() {
        const { customers,customerListWidth } = this.props;
        this.sortCustomerList(customers);//对列表进行排序
        return (
            <div  style={divStyle(customerListWidth)} className='scollContainer'>
                <table className="table table-bordered table-hover" >
                    <thead>
                        <tr>
                            <CustomerColumnHeader title='来源' getSort={this.getSort} name='Device' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='状态' getSort={this.getSort} name='CustomerState' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='业务来源' getSort={this.getSort} name='ProductName' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='客服姓名' getSort={this.getSort} name='StaffName' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='客户ID' getSort={this.getSort} name='CustomerId' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='三方ID' getSort={this.getSort} name='Uid' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='姓名' getSort={this.getSort} name='CustomerName' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='IP地址' getSort={this.getSort} name='CustomerIp' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='地理位置' getSort={this.getSort} name='CustomerIpMappingAddress' onHeaderSort={this.handleColumnHeaderClick} />
                            <CustomerColumnHeader title='进入时刻' getSort={this.getSort} name='EnterTime' onHeaderSort={this.handleColumnHeaderClick} />
                        </tr>
                    </thead>
                    {customers &&
                        <tbody >
                            { customers.map(item => ( <AssignCustomerListItem props={this.props} key={item.CustomerId} customer={item} openChat={this.handleOpenChat}/> ))}
                        </tbody>
                    }
                </table>

                <ContextMenu id={CUSTOMER_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleClick}>转接</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick}>复制</MenuItem>
                    <MenuItem onClick={this.handleClick}>复制单元格 </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { customers } = state.customer;
    const { customerListWidth} =state.home;
    return { customers , customerListWidth};
}


const page = connect(mapStateToProps, null)(AssignCustomerList);

/**
 * 客户分配列表
 */
export { page as AssignCustomerList }; 
