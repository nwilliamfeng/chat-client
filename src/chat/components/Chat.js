import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions, messageActions } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MessageList } from './MessageList';
import { HistoryMessageList } from './HistoryMessageList';
import { activePageType } from '../constants';
import SplitPane from 'react-split-pane';
require('../../assets/styles/react-split-pane.css');
require('../../assets/styles/react-tabs.css');


 

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { activePage: 0 };
        this.handleSelectActivePage = this.handleSelectActivePage.bind(this);
 
    }

    closeChat(chat) {
        alert(chat.customer);
    }

    // componentDidMount(){
    //     const { dispatch, selectedChat } = this.props;
    //     dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId));
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return true;

    // }

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
        if (index === activePageType.HISTORY_PAGE) {
            dispatch(messageActions.getRecentMessages(selectedChat.customer.CustomerId));
        }
    }

    render() {
        const { selectedChat } = this.props;
        return (

            <div >
                {selectedChat &&
                    <div  >
                        <p style={{fontSize:20}}>{selectedChat.customer.CustomerName}</p> 
                        <Tabs selectedIndex={selectedChat.activePage} onSelect={this.handleSelectActivePage} >
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
                                <HistoryMessageList selectedChat={selectedChat}></HistoryMessageList>
                            </TabPanel>
                        </Tabs>

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
