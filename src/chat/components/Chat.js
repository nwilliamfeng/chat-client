import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions,messageActions } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SplitterLayout from 'react-splitter-layout';
import { MessageList } from './MessageList';
import { activePageType } from '../constants';
require('../../assets/styles/react-tabs.css');


const outContainerStyle = {
    paddingTop: 66,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 10,
}


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { activePage: 0 };
        this.handleSelectActivePage = this.handleSelectActivePage.bind(this);
        

    }

    closeChat(chat) {
        alert(chat.customer);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;

    }

    // componentWillMount(){
    //     const {selectedChat} =this.props;
    //     if(selectedChat!=null){
    //         this.setState({activePage:selectedChat.activePage});
    //     }

    // }

    /**
     * 当前选中的页面
     */
    handleSelectActivePage(index, lastIndex, event) {
        const { dispatch, selectedChat } = this.props;
        dispatch(chatActions.activeChatPage(selectedChat.channelId, index));
        if(index===activePageType.HISTORY_PAGE){
            dispatch(messageActions.loadHistoryMessage(selectedChat.customer.CustomerId));
        }
    }


   

    render() {
        const { selectedChat } = this.props;
        return (
            <SplitterLayout vertical secondaryInitialSize={150} secondaryMinSize={50} >
                {selectedChat && <div style={outContainerStyle}>
                    <h3>{selectedChat.customer.CustomerName}</h3>
                    <Tabs selectedIndex={selectedChat.activePage} onSelect={this.handleSelectActivePage}>
                        <TabList >
                            <Tab>客户对话</Tab>
                            <Tab>客户信息</Tab>
                            <Tab>消息记录</Tab>
                        </TabList>

                        <TabPanel>
                            <MessageList>
                            </MessageList>
                        </TabPanel>
                        <TabPanel>
                            <h2>该网页未开通</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>历史消息</h2>
                        </TabPanel>
                    </Tabs>
                </div>}

                <div>input area</div>
            </SplitterLayout>

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
