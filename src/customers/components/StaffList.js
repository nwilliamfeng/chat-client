import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { customerActions } from '../actions';
import { authActions } from '../../auth/actions';
import { staffStateValues } from '../../auth/constants';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";
export const SELF_STAFF_CONTEXTMENU_ID = 'SELF_STAFF_CONTEXTMENU_ID';
export const OTHER_STAFF_CONTEXTMENU_ID = 'OTHER_STAFF_CONTEXTMENU_ID';


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
            color: this.isSelf(staff) ? 'orange' : 'black',
            width: 75,
        }
    }

    handleContextMenuClick(e, data, target) {
        const staff = JSON.parse(target.getAttribute('staffdata'));
        alert(staff.StaffName);
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
                    <ul className="list-group">
                        {staffs.map((item) => (

                            <li key={item.StaffId} style={{ padding: 0, }} className='list-group-item'>
                                <ContextMenuTrigger  id={this.isSelf(item) ? SELF_STAFF_CONTEXTMENU_ID : OTHER_STAFF_CONTEXTMENU_ID} attributes={this.getAttributes(item)}>
                                    <div style={liStyle}>
                                        <i className="fa fa-user-o" style={staffAvatarStyle} aria-hidden="true"></i>
                                        <span style={this.getStaffNameStyle(item)}>{item.StaffName}</span>
                                        <span>{this.fillCustomerCount(item.AssignedCustomerNumber)}</span>
                                    </div>
                                </ContextMenuTrigger>
                            </li>
                        )) }
                    </ul>
                }

                <ContextMenu id={SELF_STAFF_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleContextMenuClick} data={{ newStaffSate: staffStateValues.ONLINE }}>在线</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick} data={{ newStaffSate: staffStateValues.LEAVE }}>离开</MenuItem>
                    <MenuItem onClick={this.handleContextMenuClick} data={{ newStaffSate: staffStateValues.TRANSFER }}>转接</MenuItem>
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
    const {staffs} = state.customer;
    return {staffs};
}


const page = connect(mapStateToProps, null)(StaffList);

/**
 * StaffList实例
 */
export { page as StaffList }; 
