import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { customerActions } from '../actions';
import { CustomerListItem } from './CustomerListItem';
import { ContextMenu, MenuItem } from "react-contextmenu";
require('../../assets/styles/react-contextmenu.css');

export const CUSTOMER_CONTEXTMENU_ID = 'CUSTOMER_CONTEXTMENU_ID';
//添加横向滚动条
const divStyle = {
    // style="overflow-x:scroll;width:200px;white-space:nowrap;"
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    height: '100%',
}



class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props;
            dispatch(customerActions.fetchCustomerList());
        }
    }

    

    onOpenChat(userId) {
        alert(userId);
    }

    handleClick(e, data, target) {
        const customer =JSON.parse( target.getAttribute('customer'));
     
        alert(customer.CustomerName);
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        return nextProps.customers!=null ;       
    }

    render() {
        const { customers } = this.props;
        return (
            <div style={divStyle} >
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th >来源</th>
                            <th >状态</th>
                            <th >业务来源</th>
                            <th >客服姓名</th>
                            <th >客户ID</th>
                            <th >三方ID</th>
                            <th >姓名</th>
                            <th >IP地址(位置)</th>
                            <th >进入时刻</th>
                        </tr>
                    </thead>
                    {customers &&
                        <tbody >
                            {
                                customers.map((item) => (
                                    <CustomerListItem
                                        key={item.CustomerId}
                                        customer={item}
                                      
                                    />
                                ))
                            }
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

    return state.customer;
}


const page = connect(mapStateToProps, null)(CustomerList);

/**
 * CustomerList实例
 */
export { page as CustomerList }; 
