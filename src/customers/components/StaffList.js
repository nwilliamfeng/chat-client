import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rx from 'rx';
import { appContext } from '../../util';
import { customerActions } from '../actions';
import { authActions } from '../../auth/actions';
import { staffStateValues, loginStates } from '../../auth/constants';

import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";
export const SELF_STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
export const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';
require('../../assets/styles/li.css');


const staffAvatarStyle = {
    marginLeft: 3,
    marginRight: 5,
    fontSize: 15,
    color: 'green',
}

const starStyle = {
    marginLeft: 3,
    fontSize: 15,
    color: 'blue',
}

const liStyle = {
    height: 36,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 5,
}


class StaffList extends Component {

    constructor(props) {
        super(props);

        this.handleChangeStaffStateClick = this.handleChangeStaffStateClick.bind(this);

    }

    componentDidMount() {
        console.log("StaffList componetDidMount");

        const { loginState } = this.props;
        if (loginState != null && loginState == loginStates.LOGGED_IN) {
            this.subscribeStaffList();
        }

    }



    componentWillUnmount() {
        if (this.subscription != null) {
            this.subscription.dispose();
        }

    }


    subscribeStaffList() {
        const source = Rx.Observable
            .interval(3000 /* ms */)
            .timeInterval();

        this.subscription = source.subscribe(
            () => {
                if (appContext.currentStaff != null) {
                    const { dispatch } = this.props;
                    dispatch(customerActions.fetchStaffList());
                }
                else {
                    this.subscription.dispose();
                }
            },
            (err) => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }

    componentWillUpdate() {
        const { loginState } = this.props;
        if (loginState != null && loginState == loginStates.LOGGED_OUT) {
            if (this.subscription != null) {
                this.subscription.dispose();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.staffs != nextProps.staffs;
    }

    onOpenChat(userId) {
        alert(userId);
    }

    isSelf(staff) {
        return staff.StaffId == appContext.currentStaff.StaffId;
    }

    getStaffNameStyle(staff) {
        return {
            color: this.isSelf(staff) ? 'orange' : 'black',
            width: 75,
            cursor:'default',
        }
    }

    getStaffStateStyle(staffState) {
        return { fontWeight: appContext.currentStaff.StaffState == staffState ? 'bold' : 'normal' };

    }

    handleContextMenuClick(e, data, target) {
        const staff = JSON.parse(target.getAttribute('staffdata'));
        alert(staff.StaffName);
    }

    handleChangeStaffStateClick(e, data, target) {
        const { dispatch } = this.props;
        dispatch(authActions.changeStaffState(data.newStaffSate));
    }


    /**
     * 发送自动回复信息
     * @param {*} e 
     * @param {*} data 
     */
    sendAutoReplyMessage(e, data) {
        console.log(data.autoReplyMessage);
        alert(data.autoReplyMessage);
    }

    /**
     * 通知更改客服状态
     * @param {number} staffState 
     */
    notifyToChangeState(staffState) {
        const { dispatch } = this.props;
        alert(staffState);
        //  dispatch(authActions.changeStaffState(staffState));
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
            rows.push(<i key={i} className={cn} style={starStyle} aria-hidden="true" />);
        }
        return rows;
    }

    getAttributes(staff) {
        return { staffdata: JSON.stringify(staff) };
    }

    render() {
        const { staffs } = this.props;

        return (
            <div >
            
                {staffs &&
                    <ul className="list-group list-group-hover">
                        {staffs.map((item) => (

                            <li key={item.StaffId} style={{ padding: 0, }} className='list-group-item'>
                                <ContextMenuTrigger id={this.isSelf(item) ? SELF_STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={this.getAttributes(item)}>
                                    <div style={liStyle}>
                                        <i className="fa fa-user-o" style={staffAvatarStyle} aria-hidden="true"></i>
                                        <span style={this.getStaffNameStyle(item)}>{item.StaffName}</span>
                                        <span>{this.fillCustomerCount(item.AssignedCustomerNumber)}</span>
                                    </div>
                                </ContextMenuTrigger>
                            </li>
                        ))}
                    </ul>
                }

                <ContextMenu id={SELF_STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.ONLINE }}>
                        <span style={this.getStaffStateStyle(staffStateValues.ONLINE)}>在线</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.LEAVE }}>
                        <span style={this.getStaffStateStyle(staffStateValues.LEAVE)}>离开</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleChangeStaffStateClick} data={{ newStaffSate: staffStateValues.TRANSFER }}>
                        <span style={this.getStaffStateStyle(staffStateValues.TRANSFER)}>转接</span>
                    </MenuItem>
                    <MenuItem divider />
                    <SubMenu title='自动回复'>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '马上回来' }}>马上回来</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '现在忙' }}>现在忙</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '正在会议中' }}>正在会议中</MenuItem>
                    </SubMenu>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleContextMenuClick}>注销</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick}>退出 </MenuItem>
                </ContextMenu>
                <ContextMenu id={OTHER_STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleContextMenuClick}>客服聊天</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick}>转接</MenuItem>
                </ContextMenu>

            </div>
        );
    }
}


function mapStateToProps(state) {
    const { staffs } = state.customer;
    const { loginState } = state.auth;
    return { staffs, loginState };
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * StaffList实例
 */
export { page as StaffList }; 
