import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {ChatHeader} from './ChatHeader'
require('../../assets/styles/li.css');

export const CHAT_CONTEXTMENU_ID = 'CHAT_CONTEXTMENU_ID';
 
class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state={selectedChat:null};//初始化状态
        this.handleSelectChat =this.handleSelectChat.bind(this);
    }

    closeChat(chat){
        alert(chat.customer);
    }   

    componentDidMount(){
        const {dispatch} =this.props;
        dispatch(chatActions.initChats());

    }

    componentWillUnmount(){
        this.setState({selectedChat:null});
        const {dispatch} =this.props;
        dispatch(chatActions.closeAllChats());
    }

    handleSelectChat(chat){
        this.setState((prevState, props) => {
            const {selectedChat} =prevState;
            if( selectedChat==null || selectedChat.channelId!=chat.channelId ){
                return {selectedChat:chat};
            }          
        });
        const {newChat} =this.props;
        if(newChat!=null){
            const {dispatch} =this.props;
            this.props.dispatch(chatActions.endOpenCustomerChat());
        }
    }

    isSelectedChat(chat){
        const {selectedChat} =this.state;
        return selectedChat!=null && selectedChat.channelId==chat.channelId;        
    }


    render() {
        const { chats, newChat } = this.props;      
        if(newChat!=null){
            this.handleSelectChat(newChat); //如果是新加的会话则选中
        }
        return (
            <div >
                {chats &&
                    <ul className="list-group list-group-hover">
                        {/* {chats.map((item) => (
                            <li key={item.channelId} style={liStyle} className='list-group-item'>
                                <ContextMenuTrigger id={CHAT_CONTEXTMENU_ID} attributes={this.getAttributes(item)}>
                                    <div style={liInnerDivStyle}>
                                        <i className="fa fa-user-o" style={imgStyle} aria-hidden="true"></i>
                                        <span>{item.customer.CustomerName}</span>
                                       
                                    </div>
                                </ContextMenuTrigger>
                            </li>
                        ))} */}
                         {chats.map((item) => (
                            <ChatHeader key={item.channelId} chat={item} onSelectChat={this.handleSelectChat} isSelected={this.isSelectedChat(item)}/>                         
                        ))}
                    </ul>
                }

                <ContextMenu id={CHAT_CONTEXTMENU_ID}>
                    <MenuItem onClick={this.handleContextMenuClick}>转接</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleContextMenuClick}>关闭</MenuItem>
                </ContextMenu>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.chat;
}


const page = connect(mapStateToProps, null)(ChatList);

/**
 * ChatList实例
 */
export { page as ChatList };
