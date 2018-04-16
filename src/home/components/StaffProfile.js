import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { authActions } from '../../auth/actions';
import { staffStateValues } from '../../auth/constants/staffStates';
import { ContextMenu,SubMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import AvatarImg from '../../assets/imgs/avatar.png';
import AuthHelper from '../../auth/authHelper';
import { appContext } from '../../util';
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

const STAFF_PROFILE_CONTEXTMENU_ID = 'STAFF_PROFILE_CONTEXTMENU_ID';


class StaffProfile extends Component {

    constructor(props) {
        super(props);

        this.handleLogout =this.handleLogout.bind(this);
        this.handleChangeStaffStateClick = this.handleChangeStaffStateClick.bind(this);
    }



    createNaviLi(fontIconName) {
        return (<li className='nav_li'> <i className={fontIconName} aria-hidden="true"></i>  </li>)
    }

    createStaffState(state) {
        let icon = null;
        let bg = 'transparent';
        switch (state) {
            case staffStateValues.LEAVE:
                icon = 'fa fa-clock-o';
                bg = '#AFEEEE';
                break;
            case staffStateValues.ONLINE:
                icon = 'fa fa-check';
                bg = '#39CE39';
                break;
            case staffStateValues.TRANSFER:
                icon = 'fa fa-share';
                bg = '#DAA520';
                break;
            case staffStateValues.OFFLINE:
                icon = 'fa fa-close';
                bg = '#D3D3D3';
                break;
            default:
                break;
        }
        return (
            <div style={{ marginLeft: 30, paddingTop: 25 }}><i className={icon} style={{ background: bg, padding: 1, color: 'white', fontSize: 10, borderRadius: 3 }} aria-hidden="true"></i></div>
        )
    }


    getStaffStateStyle(staffState) {
        return { fontWeight: appContext.currentStaff.StaffState === staffState ? 'bold' : 'normal' };

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
     * 注销
     */
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }



    render() {
        const staffName = this.props.user ? this.props.user.StaffName : '';
        const stateStr = this.props.user ? '(' + AuthHelper.getStaffStateString(this.props.user.StaffState) + ')' : '';

        return (
            <div>
                <ContextMenuTrigger id={STAFF_PROFILE_CONTEXTMENU_ID}>
                    <Popup
                        trigger={
                            <div style={avatarStyle}>
                                {this.props.user && this.createStaffState(this.props.user.StaffState)}
                            </div>}
                        position="right top"
                        on="click"
                        closeOnDocumentClick
                        arrow={false}
                    >
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
                    <SubMenu title='自动回复'>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '马上回来' }}>马上回来</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '现在忙' }}>现在忙</MenuItem>
                        <MenuItem onClick={this.sendAutoReplyMessage} data={{ autoReplyMessage: '正在会议中' }}>正在会议中</MenuItem>
                    </SubMenu>
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
