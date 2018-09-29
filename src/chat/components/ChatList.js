import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { appContext } from '../../util/';
import { ChatHeader } from './ChatHeader';
import { isEqual } from 'lodash';
import Rx from 'rx';
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

    componentWillUnmount() {
        if (this.subscription != null) {
            this.subscription.dispose();
        }
        document.removeEventListener("keydown", this.handleKeydown, false);
    }

    /**
     * 订阅
     */
    subscribe = () => {
        const source = Rx.Observable
            .interval(1000 /* ms */)
            .timeInterval();
        this.subscription = source.subscribe(
            () => {

                if (appContext.currentStaff == null) {
                    this.subscription.dispose();
                }
                else {

                }
            },
            err => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!isEqual(this.props.chats, nextProps.chats)) {
            return true;
        }
        if (!isEqual(this.props.selectedChat, nextProps.selectedChat)) {
            return true;
        }
        if (!isEqual(this.props.messages, nextProps.messages)) {
            return true;
        }
        //todo-- 任何会话收到消息都得更新
        return false;
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
        this.subscribe();
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
        const { chats, messages } = this.props;
        return (
            <div>
                {chats &&
                    <ListUl>
                        {chats.map(chat => (
                            <ChatHeader
                                key={chat.channelId}
                                chat={chat}
                                messages={messages}
                                onSelectChat={this.handleSelectChat}
                                isSelected={this.isSelectedChat(chat)} />
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
    const { messages } = state.message;
    return {
        chats,
        selectedChat,
        messages,
    }
}

const page = connect(mapStateToProps, null)(ChatList);

/**
 * 会话列表
 */
export { page as ChatList };
