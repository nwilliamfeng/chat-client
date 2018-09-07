import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { ContextMenuTrigger } from "react-contextmenu";
import {StaffContextMenu} from './StaffContextMenu';
import AvatarImg from '../../assets/imgs/avatar.png';
import { StaffStateIcon } from './StaffStateIcon';
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

/**
 * 客服快捷菜单Id
 */
 const STAFF_CONTEXTMENU_ID = 'STAFF_CONTEXTMENU_ID';

class StaffProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { user,dispatch } = this.props;
        return (
            <div>
                <ContextMenuTrigger id={STAFF_CONTEXTMENU_ID}>
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
                <StaffContextMenu dispatch={dispatch} contextMenuId={STAFF_CONTEXTMENU_ID}/>           
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

/**
 * 客服头像
 */
export { page as StaffProfile }; 
