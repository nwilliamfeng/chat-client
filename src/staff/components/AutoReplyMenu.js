import React from 'react';
import { SubMenu, MenuItem } from 'react-contextmenu';
import { appSettings } from '../../util/appSettings';

const initAutoReplyMessages = {
    BackSoon: '马上回来',
    BusyNow: '现在忙',
    Meeting: '正在会议中',
}

const onAutoReply = (e, data) => {
    const { autoReplyMessage } = data;
    appSettings.autoReplyMessage = autoReplyMessage;
    alert(autoReplyMessage);
}

const getStyle = content => {
    return { fontWeight: appSettings.autoReplyMessage === content ? 'bold' : 'normal' }
}

/**
  * 绘制自动回复，注意这里不能构建自定义组件，样式问题
*/
export const AutoReplyMenu = () => {
    const backSoon = initAutoReplyMessages.BackSoon;
    const busyNow = initAutoReplyMessages.BusyNow;
    const meeting = initAutoReplyMessages.Meeting;
    return (
        <SubMenu title='自动回复'>
            <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: backSoon }}><span style={getStyle(backSoon)}>{backSoon}</span></MenuItem>
            <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: busyNow }}><span style={getStyle(busyNow)} >{busyNow}</span></MenuItem>
            <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: meeting }}><span style={getStyle(meeting)}>{meeting}</span></MenuItem>
        </SubMenu>)
}
