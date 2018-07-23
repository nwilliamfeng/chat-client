import React from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import { CHAT_LIST_CONTEXTMENU_ID } from './ChatList';
require('../../assets/styles/li.css');


const headerStyle = {
    display: 'table-cell',
}

const headerStyle2 = {
    fontSize:14,
    display: 'table-cell',
    verticalAlign: 'top',
    cursor:'default',
}


const liStyle = {
    padding: 0,  
    border: 'none',   
}

/**
 * 消息内容样式
 * @param {*} width 
 */
const currMsgStyle =  {
    fontSize: 12,
    color: 'gray',
     width:  120,
    marginTop: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
} 

/**
 * 标题样式
 * @param {*} width 
 */
const titleStyle = {   
     width:   100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}

/** 
 * 消息时间样式
*/
const timeStyle = {
    fontSize: 12,
    width:50,
    color: 'gray',
    textAlign:'right',
    paddingRight:5,
} 

const alertStyle={
    height:16,
}

/** 
 * 消息数气泡样式
*/
const msgCountStyle={
    height:14,
    minWidth:14,
    borderRadius:60,
    background:'Red',
    paddingTop:1,
    paddingBottom:1,
    paddingLeft:1,
    paddingRight:1,
    position:'absolute',
    marginTop:-48,
    marginLeft:30,
    fontSize:8,
    cursor:'default',
}

/** 
 * 头像容器样式
*/
const avatarContainerStyle = { 
    marginLeft: 3,
    marginRight: 10,
    verticalAlign:'center',
    textAlign:'center',
    paddingBottom:2,
    paddingTop:2,
    paddingLeft:2,
    paddingRight:2,
    fontSize: 24,
    width: 40,
    height: 40,
    color: 'white',
    background: '#21b384',
}

/** 
 * 头像图片样式
*/
const avatarStyle={
    height:34,
    width:34,
    marginBottom:4
}


const getAttributes = (chat) => {
    return { chatdata: JSON.stringify(chat) };
}

const getChatStyle = (isSelected) => ({
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 11,
    paddingBottom:10,
     background: isSelected === true ? '#C4C4C5' :'transparent'
})


export const ChatHeader = ({ chat, onSelectChat, isSelected }) => {

    const onClick = () => {
        onSelectChat(chat);
    }
    return (
        <li style={liStyle} className='list-group-item' onClick={onClick}>
            <ContextMenuTrigger id={CHAT_LIST_CONTEXTMENU_ID} attributes={getAttributes(chat)}>
                <div style={getChatStyle(isSelected)}>
                    <div style={headerStyle}>
                        <div style={avatarContainerStyle}>                      
                            <img alt='' style={avatarStyle} src={require('../../assets/imgs/snail.png')}/>
                            <div style={msgCountStyle}>9</div>
                        </div>                       
                    </div>
                    <div style={headerStyle2}>
                        <div style={titleStyle}> {chat.customer.CustomerName}</div>
                        <div style={currMsgStyle}> {'的俺的沙发大幅拉开飞机阿斯顿发福利阿斯顿发送到付款阿斯顿发生发动机发大发'}</div>
                    </div>
                    <div style={headerStyle2}>
                        <div style={timeStyle}> {'18/12/23'}</div>
                        <div style={alertStyle}></div>
                    </div>
                
                </div>
            </ContextMenuTrigger>
        </li>
    )
}
