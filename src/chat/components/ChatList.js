import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ChatHeader } from './ChatHeader';
import { isEqual } from 'lodash';
export const CHAT_LIST_CONTEXTMENU_ID = 'CHAT_LIST_CONTEXTMENU_ID';


const ListUl = styled.ul`
   list-style: none;
   width:100vh;
   background-color:transparent;
  `;


class ChatList extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.props.chats, nextProps.chats);
    }

    handleCloseChat = (e, data, target) => {
        const chat = JSON.parse(target.getAttribute('chatdata'));
        const { dispatch } = this.props;
        dispatch(chatActions.closeChat(chat));
    }

    handleKeydown = event => {
        switch (event.keyCode) {
            case 40:
                this.selectByKey(true);
                break;
            case 38:
                this.selectByKey(false);
                break;
        }
    }

    selectByKey(next = true) {
        const { chats, selectedChat, dispatch } = this.props;
        if (chats == null || chats.length === 0) {
            return;
        }


        let idx = chats.indexOf(selectedChat) + (next === true ? 1 : -1);
        if (idx < 0) {
            idx = chats.length - 1;
        }
        else if (idx >= chats.length) {
            idx = 0;
        }
        dispatch(chatActions.selectChat(chats[idx]));
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown, false);
        const { dispatch } = this.props;
        dispatch(chatActions.initChats());
    }



    handleSelectChat = chat => {
        const { dispatch, selectedChat } = this.props;
        //如果是同一个会话则返回
        if (selectedChat != null && selectedChat.channelId === chat.channelId) {
            return;
        }
        dispatch(chatActions.selectChat(chat));
    }

    isSelectedChat = chat => {
        const { selectedChat } = this.props;
        return selectedChat != null && selectedChat.channelId === chat.channelId;
    }



    render() {
        console.log('do render chatlist');
        const { chats } = this.props;
        return (
            <div  >
                {chats &&
                    <ListUl>
                        {chats.map((item) => (
                            <ChatHeader key={item.channelId} chat={item} onSelectChat={this.handleSelectChat} isSelected={this.isSelectedChat(item)} />
                        ))}
                    </ListUl>
                }

                <ContextMenu id={CHAT_LIST_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleContextMenuClick}>转接</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleCloseChat}>关闭</MenuItem>
                </ContextMenu>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { chats, selectedChat } = state.chat;

    return {
        chats,
        selectedChat,


    }
}



const page = connect(mapStateToProps, null)(ChatList);

/**
 * 会话列表
 */
export { page as ChatList };
