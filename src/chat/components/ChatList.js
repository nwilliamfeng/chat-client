import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { ChatHeader } from './ChatHeader';
export const CHAT_LIST_CONTEXTMENU_ID = 'CHAT_LIST_CONTEXTMENU_ID';
require('../../assets/styles/scrollbar.css');

const chatListStyle = {
  //  overflowY: 'auto',
  //  overflowX: 'hidden',
    height: 'calc(100% - 20px )',//搜索框距离
    width: '100%',
    position: 'absolute',
    paddingLeft: 10,

}

class ChatList extends Component {

    constructor(props) {
        super(props);
        //this.state = {  };//初始化状态
        this.handleSelectChat = this.handleSelectChat.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleCloseChat = this.handleCloseChat.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { chats } = nextProps;
        return chats != null;
    }

    handleCloseChat(e, data, target) {
        const chat = JSON.parse(target.getAttribute('chatdata'));
        const { dispatch } = this.props;
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

   

    handleSelectChat(chat) {
        const { dispatch, selectedChat } = this.props;
        //如果是同一个会话则返回
        if (selectedChat != null && selectedChat.channelId === chat.channelId) {
            return;
        }
        dispatch(chatActions.selectChat(chat));
    }

    isSelectedChat(chat) {
        const { selectedChat } = this.props;
        return selectedChat != null && selectedChat.channelId === chat.channelId;
    }

    render() {
        console.log('do render chatlist');
        const { chats } = this.props;
        return (
          
            <div style={{ height: 'calc(100% - 52px)', position: 'absolute', width: 'calc(100% - 7px)' }}>

                <div style={chatListStyle} className='scollContainer'>
                    {chats &&
                        <ul className="list-group list-group-hover" style={{ background: 'transparent' }}>
                            {chats.map((item) => (
                                <ChatHeader key={item.channelId} chat={item} onSelectChat={this.handleSelectChat} isSelected={this.isSelectedChat(item)}
                                    />
                            ))}
                        </ul>

                    }

                    <ContextMenu id={CHAT_LIST_CONTEXTMENU_ID}>
                        <MenuItem onClick={this.handleContextMenuClick}>转接</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={this.handleCloseChat}>关闭</MenuItem>
                    </ContextMenu>

                </div>
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
 * ChatList实例
 */
export { page as ChatList };
