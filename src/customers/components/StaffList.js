import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rx from 'rx';
import { appContext } from '../../util';
import { customerActions } from '../actions';
import { authActions } from '../../auth/actions';
import { staffStateValues, loginStates } from '../../auth/constants';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fastar2 } from '@fortawesome/free-regular-svg-icons';
require('../../assets/styles/li.css');

const SELF_STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';


const starStyle = {
    marginLeft: 3,
    color: 'blue',
}

const liStyle = {
    height: 36,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 5,
}

const styles = {
    staffList: {
        padding: 0,
    }
}

const staffNameStyle = (isSelf) => {
    return {
        color: isSelf ? 'orange' : 'black',
        width: 75,
        cursor: 'default',
        marginLeft: 10,
        marginRight: 10,
    }
}

/**
 * 会话数组件
 * @param {*} param0 
 */
const ChatCounter = ({ count }) => {
    let result = [];
    count++;
    let capacity = 5;
    for (let i = 0; i < capacity; i++) {
        const cn = (i < count) ? faStar : fastar2;
        result.push(<FontAwesomeIcon key={i} icon={cn} style={starStyle} />);
    }
    return result;
}

/**
 * 客服项
 */
const StaffItem = ({ data }) => {
    const { StaffName, AssignedCustomerNumber, StaffId } = data;
    const isSelf = StaffId === appContext.currentStaff.StaffId;
    return (
        <li style={styles.staffList} className='list-group-item'>
            <ContextMenuTrigger id={isSelf ? SELF_STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={{ staffdata: JSON.stringify(data) }}>
                <div style={liStyle}>
                    <FontAwesomeIcon icon={faUser} color='gray' />
                    <span style={staffNameStyle(isSelf)}>{StaffName}</span>
                    <ChatCounter count={AssignedCustomerNumber} />
                </div>
            </ContextMenuTrigger>
        </li>)
}

class StaffList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const { loginState } = this.props;
        if (loginState != null && loginState === loginStates.LOGGED_IN) {
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
        if (loginState != null && loginState === loginStates.LOGGED_OUT) {
            if (this.subscription != null) {
                this.subscription.dispose();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.staffs !== nextProps.staffs;
    }

    onOpenChat(userId) {
        alert(userId);
    }
 
    getStaffStateStyle(staffState) {
        return { fontWeight: appContext.currentStaff.StaffState === staffState ? 'bold' : 'normal' };

    }

    handleContextMenuClick(e, data, target) {
        const staff = JSON.parse(target.getAttribute('staffdata'));
        alert(staff.StaffName);
    }

    handleChangeStaffStateClick = (e, data) => {
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
                        {staffs.map(item => <StaffItem key={item.StaffId} data={item} />)}
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
