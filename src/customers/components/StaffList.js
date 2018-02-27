import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { customerActions } from '../actions';

import { ContextMenu, MenuItem } from "react-contextmenu";

require('../../assets/styles/react-contextmenu.css');


export const STAFF_CONTEXTMENU_ID = 'STAFF_CONTEXTMENU_ID';
//添加横向滚动条
const divStyle = {
    // style="overflow-x:scroll;width:200px;white-space:nowrap;"
    overflowX: 'scroll',
    whiteSpace: 'nowrap',  
    height: '100%',
}

const staffAvatarStyle = {
    marginLeft: 3,
    marginRight: 5,
    fontSize: 15,
    minWidth:50,
    color:'green',
}

const starStyle = {
    marginLeft: 3,
    fontSize: 15,
    color: 'blue',
}



class StaffList extends Component {

    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("StaffList componetDidMount");
        if (appContext.currentStaff != null) {
            const { dispatch } = this.props;
            dispatch(customerActions.fetchStaffList());
        }
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.staffs != null;
    }


    onOpenChat(userId) {
        alert(userId);
    }

    isSelf(staff) {
        return staff.StaffId == appContext.currentStaff.StaffId;
    }

    getStaffNameStyle(staff) {
        return {
            color: this.isSelf(staff)? 'orange':'black',
        }
       
      }
    

    handleClick(e, data, target) {
        // const customerId = target.getAttribute('customerId');
        // const { customers } = this.props;
        // const customer = customers.find((x) => {
        //     return x.CustomerId == customerId;
        // });
        // alert(customer.CustomerName);
    }


    /**
     * 填充客户数量
     * @param {number} count 
     */
    fillCustomerCount(count) {
        let rows = [];
        count++;
        let capacity = 5;
        for (let i = 0; i < capacity; i++) {
            const cn = (i < count) ? "fa fa-star" : "fa fa-star-o";
            rows.push(<i class={cn} style={starStyle} aria-hidden="true" />);
        }
        return rows;
    }

    render() {
        const { staffs } = this.props;
        return (
            <div style={divStyle} >
                {staffs &&
                    <ul className="list-unstyled">
                        {staffs.map((item) => (

                            <li key={item.StaffId}>
                                <i className="fa fa-user-o" style={staffAvatarStyle} aria-hidden="true"></i> 
                                <span style={this.getStaffNameStyle(item)}>{item.StaffName}</span>
                                {
                                    this.fillCustomerCount(item.AssignedCustomerNumber)
                                    // user.deleting ? <em> - Deleting...</em>
                                    // : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    // : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        ))
                        }
                    </ul>
                }

                {/* <ContextMenu id={STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleClick}>转接</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick}>复制</MenuItem>
                    <MenuItem onClick={this.handleClick}>复制单元格 </MenuItem>
                </ContextMenu> */}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state.customer;
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * CustomerList实例
 */
export { page as StaffList }; 
