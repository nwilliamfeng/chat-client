import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { authActions } from '../../auth/actions';
import { staffStateValues } from '../../auth/constants/staffStates';
import { ContextMenu, SubMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import AvatarImg from '../../assets/imgs/avatar.png';
import { appContext } from '../../util';
import { StaffStateIcon } from './StaffStateIcon';
import {AutoReplyMenu}  from './AutoReplyMenu';
require('../../assets/styles/button.css');
require('../../assets/styles/menu.css');
require('../../assets/styles/nav_ul.css');

const avatarStyle = {
    margin: 12,
    marginTop: 18,
    cursor: 'pointer',
    backgroundImage: `url(${AvatarImg})`,
    backgroundSize: '100% 100%',
    height: 36,
    width: 36,
}

const STAFF_PROFILE_CONTEXTMENU_ID = 'STAFF_CONTEXTMENU_ID';



class StaffProfile extends Component {

    constructor(props) {
        super(props);
    }

    createNaviLi(fontIconName) {
        return (<li className='nav_li'> <i className={fontIconName} aria-hidden="true"></i>  </li>)
    }

    getStaffStateStyle(staffState) {
        return { fontWeight: appContext.currentStaff.StaffState === staffState ? 'bold' : 'normal' };
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
    * 注销
    */
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }


    render() {
        const { user } = this.props;
        return (
            <div>
                <ContextMenuTrigger id={STAFF_PROFILE_CONTEXTMENU_ID}>
                    <Popup
                        trigger={
                            <div style={avatarStyle}>
                                {user && <StaffStateIcon state={user.StaffState} />}
                            </div>}
                        position="right top"
                        on="click"
                        closeOnDocumentClick
                        arrow={false} >
                        <div>此人深不可测~ </div>
                    </Popup>
                </ContextMenuTrigger>
                <ContextMenu id={STAFF_PROFILE_CONTEXTMENU_ID}>

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
                    <AutoReplyMenu/>          
                    <MenuItem divider />
                    <MenuItem onClick={this.handleLogout}>注销</MenuItem>
                </ContextMenu>
            </div>

        )

    }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}


const page = connect(mapStateToProps)(StaffProfile);
export { page as StaffProfile }; 
