import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions, messageActions } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MessageList } from './MessageList';

class Chat extends Component {

    constructor(props) {
        super(props);

    }
    closeChat(chat) {
        alert(chat.customer);
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { dispatch, selectedChat } = this.props;
        if (selectedChat != null) {
            dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId));
        }
    }

    render() {
        const { selectedChat } = this.props;
        return (

            <div >
                {selectedChat &&
                    <div  >
                        <div style={{borderBottom:'1px solid #E7E7E7',marginBottom:10,paddingLeft:25,paddingTop:20}}>
                            <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        </div>

                        <MessageList selectedChat={selectedChat} />
                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * Chat实例
 */
export { page as Chat };
