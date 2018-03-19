import React, { PropTypes } from 'react';
import { util } from '../../util';
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

const currMsgStyle = (width) => ({
    fontSize: 12,
    color: 'gray',
    width: width ? width-56-65 : 100,
    marginTop: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
})

const titleStyle = (width) =>({
    
    width: width ? width-56-65 : 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
})

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

const imgStyle = {
  
    marginLeft: 3,
    marginRight: 10,
    verticalAlign:'center',
    textAlign:'center',
    paddingBottom:5,
    paddingTop:5,
    paddingLeft:5,
    paddingRight:5,
    fontSize: 24,
    width: 40,
    height: 40,
    color: 'white',
    background: '#21b384',
}



const getAttributes = (chat) => {
    return { chatdata: JSON.stringify(chat) };
}


const getChatStyle = (isSelected) => ({

    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 11,
    paddingBottom:10,
    background: isSelected == true ? '#eee' : 'transparent',
})


export const ChatHeader = ({ chat, onSelectChat, isSelected, maxWidth }) => {

    const onClick = () => {
        onSelectChat(chat);
    }
    return (
        <li style={liStyle} className='list-group-item' onClick={onClick}>
            <ContextMenuTrigger id={CHAT_LIST_CONTEXTMENU_ID} attributes={getAttributes(chat)}>
                <div style={getChatStyle(isSelected)}>
                    <div style={headerStyle}>
                        <div style={imgStyle}>
                            <img style={{  height:32,width:32,marginBottom:8,}} src={require('../../assets/imgs/customer.png')}/>
                        </div>
                    </div>
                    <div style={headerStyle2}>
                        <div style={titleStyle(maxWidth)}> {chat.customer.CustomerName}</div>
                        <div style={currMsgStyle(maxWidth)}> {'的俺的沙发大幅拉开飞机阿斯顿发福利阿斯顿发送到付款阿斯顿发生发动机发大发'}</div>
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
