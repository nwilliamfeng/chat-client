import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions, messageActions } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { HistoryMessageList } from './HistoryMessageList';


class Chat extends Component {

    constructor(props) {
        super(props);
       
    }
    closeChat(chat) {
        alert(chat.customer);
    }

    componentDidUpdate(nextProps,nextState,nextContext){
        const { dispatch, selectedChat } = this.props;
        if (selectedChat != null) {
            dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId));
        }
    }

    render() {
        const { selectedChat } = this.props;
        return (

            <div style={{ padding: 10 }}>
                {selectedChat &&
                    <div  >
                        <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        <HistoryMessageList selectedChat={selectedChat} />
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
