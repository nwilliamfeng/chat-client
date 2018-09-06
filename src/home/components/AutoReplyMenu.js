import React from 'react';
import { SubMenu, MenuItem } from "react-contextmenu";



const onAutoReply=(e,data)=>{
   const {autoReplyMessage,dispatch} =data;

   alert(autoReplyMessage);
}

/**
  * 绘制自动回复，注意这里不能构建自定义组件，样式问题
*/
export const  AutoReplyMenu = ({dispatch} ) => {
    return (<SubMenu title='自动回复'>
        <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: '马上回来',dispatch }}>马上回来</MenuItem>
        <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: '现在忙',dispatch }}>现在忙</MenuItem>
        <MenuItem onClick={onAutoReply} data={{ autoReplyMessage: '正在会议中',dispatch }}>正在会议中</MenuItem>
    </SubMenu>)
}
