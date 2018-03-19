import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { ChatHeader } from './ChatHeader'

export const CHAT_LIST_CONTEXTMENU_ID = 'CHAT_LIST_CONTEXTMENU_ID';



class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedChat: null };//初始化状态
        this.handleSelectChat = this.handleSelectChat.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleCloseChat =this.handleCloseChat.bind(this);       
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        console.log('shouldComponentUpdate');
        return true;
    }
    
    handleCloseChat(e, data, target) {
        const chat = JSON.parse(target.getAttribute('chatdata'));
       
        const {dispatch} =this.props;
        dispatch(chatActions.closeChat(chat));
    }

    handleKeydown(event) {
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
        this.setState((prevState, props) => {
            const { chats } = props;
            if (chats == null || chats.length == 0) {
                return;
            }
            const { selectedChat } = prevState;
            if (selectedChat == null) {
                return { selectedChat: chats[next === true ? 0 : chats.length - 1] };
            }
            let idx = chats.indexOf(selectedChat) + (next === true ? 1 : -1);
            if (idx < 0) {
                idx = chats.length - 1;
            }
            else if (idx >= chats.length) {
                idx = 0;
            }
            return { selectedChat: chats[idx] };
        });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown, false);
        const { dispatch } = this.props;
        dispatch(chatActions.initChats());

    }

    componentWillMount() {
        const { newChat } = this.props;
        if (newChat != null) {
            this.handleSelectChat(newChat); //如果是新加的会话则选中
        }
    }

    componentWillUnmount() {
        this.setState({ selectedChat: null });
        const { dispatch } = this.props;
        dispatch(chatActions.closeAllChats());
    }

    handleSelectChat(chat) {
        this.setState((prevState, props) => {
            const { selectedChat } = prevState;
            if (selectedChat == null || selectedChat.channelId != chat.channelId) {
                return { selectedChat: chat };
            }
        });
        const { newChat } = this.props;
        if (newChat != null) {
            const { dispatch } = this.props;
            this.props.dispatch(chatActions.endOpenCustomerChat());
        }
    }

    isSelectedChat(chat) {
        const { selectedChat } = this.state;
        return selectedChat != null && selectedChat.channelId == chat.channelId;
    }


    render() {
        console.log('do render chatlist');
        const { chats, navibarSize } = this.props;
        return (
            <div >
                {chats &&
                    <ul className="list-group list-group-hover">
                        {chats.map((item) => (
                            <ChatHeader key={item.channelId} chat={item} onSelectChat={this.handleSelectChat} isSelected={this.isSelectedChat(item)}
                                maxWidth={navibarSize} />
                        ))}
                    </ul>
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
 
    const { newChat, chats } = state.chat;
    const { navibarSize } = state.home;
    return {
        newChat,
        chats,
        navibarSize,
    }
}


const page = connect(mapStateToProps, null)(ChatList);

/**
 * ChatList实例
 */
export { page as ChatList };
