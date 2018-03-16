import React, { PropTypes } from 'react';
import { util } from '../../util';
import { ContextMenuTrigger } from "react-contextmenu";
import { CHAT_CONTEXTMENU_ID } from './ChatList';

const imgStyle = {
    marginLeft: 3,
    marginRight: 5,
    fontSize: 15,
    //color: 'green',
}

const liStyle={
    padding:0,
    border: 'none',
}

const getAttributes=(chat)=> {
    return { chatdata: JSON.stringify(chat) };
}
 

const getChatStyle =(isSelected)=> ({
    height: 36,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 5,   
    background:isSelected==true? '#eee':'transparent',
})


export const ChatHeader = ({ chat, onSelectChat,isSelected }) => {

    const onClick = () => {
        onSelectChat(chat);
    }
    return (
        <li style={liStyle} className='list-group-item' onClick={onClick}>
            <ContextMenuTrigger id={CHAT_CONTEXTMENU_ID} attributes={getAttributes(chat)}>
                <div style={getChatStyle(isSelected)}>
                    <i className="fa fa-user-o" style={imgStyle} aria-hidden="true"></i>
                    <span>{chat.customer.CustomerName}</span>
                </div>
            </ContextMenuTrigger>
        </li>
    )
}
