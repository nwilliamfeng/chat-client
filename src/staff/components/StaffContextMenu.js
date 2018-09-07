import React from 'react';
import { authActions } from '../../auth/actions';
import { staffStateValues } from '../../auth/constants/staffStates';
import { ContextMenu, MenuItem } from "react-contextmenu";
import { appContext } from '../../util';
import { AutoReplyMenu } from './AutoReplyMenu';



/**
 * 客服快捷菜单
 * @param {*} param0 
 */
export const StaffContextMenu = ({contextMenuId, dispatch }) => {

    const getStaffStateStyle = staffState => {
        return { fontWeight: appContext.currentStaff.StaffState === staffState ? 'bold' : 'normal' };
    }

    const onChangeStaffState = (e, data) => dispatch(authActions.changeStaffState(data.newStaffSate));

    const onLogout = () => dispatch(authActions.logout());
 

    return (
    <ContextMenu id={contextMenuId}>
        <MenuItem onClick={onChangeStaffState} data={{ newStaffSate: staffStateValues.ONLINE }}>
            <span style={getStaffStateStyle(staffStateValues.ONLINE)}>在线</span>
        </MenuItem>
        <MenuItem onClick={onChangeStaffState} data={{ newStaffSate: staffStateValues.LEAVE }}>
            <span style={getStaffStateStyle(staffStateValues.LEAVE)}>离开</span>
        </MenuItem>
        <MenuItem onClick={onChangeStaffState} data={{ newStaffSate: staffStateValues.TRANSFER }}>
            <span style={getStaffStateStyle(staffStateValues.TRANSFER)}>转接</span>
        </MenuItem>
        <MenuItem divider />
        <AutoReplyMenu />
        <MenuItem divider />
        <MenuItem onClick={onLogout}>注销</MenuItem>
    </ContextMenu>)

}


