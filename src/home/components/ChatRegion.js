import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Titlebar } from './Titlebar';
import { Statusbar } from './Statusbar';
import Navibar from './Navibar'
import { CustomerList, StaffList } from '../../customers/components';
import { CommonPhraseTreeView } from '../../configuration/components';
import { Chat } from '../../chat/components';
import { homeActions } from '../actions';

import { SearchBox } from '../../search/components';
import { ChatList } from '../../chat/components';
import SplitPane from 'react-split-pane';
require('../../assets/styles/react-split-pane.css');

const titleStyle = {
    fontWeight: 'Bold',
}

const chatListContainerStyle = {
    paddingTop: 5,
    paddingLeft: 0,
    paddingRight: 5,
}

const customerListContianerStyle = {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 35,
    //   paddingTop: 63,
}

const chatContianerStyle = {
    padding: 5,
    paddingTop: 0,
    background: '#f8f8f8'
}

const searchBoxStyle = {
    marginLeft: 8,
    marginTop: 5,
    marginRight: 3,
    width:235,
}


const staffListContianerStyle = {
    padding: 5,
}

const commonPhraseContianerStyle = {
    padding: 5,
}

const initSize = {
    heightOffset: 83,
    customerListHeight: 60,
    isCustomerListHeightPercentage: true,
    customerListWidth: 300,
    navibarInitPaneWidth: 250,
    // getChatListHeight: function () {
    //     return window.innerHeight - this.heightOffset - 50;
    // },

    // getCustomerListHeightOffset: function () {
    //     return this.heightOffset + 30;
    // },

    // getCustomerListInitWidth: function () {
    //     return this.getCustomerListInitPaneDefaultWidth();
    // },
    getCustomerListInitPaneDefaultHeight: function () {
        return this.isCustomerListHeightPercentage ? this.customerListHeight.toString() + '%' : this.customerListHeight;
    },
    getCustomerListInitPaneDefaultWidth: function () {
        return this.customerListWidth;
    }
}

class ChatRegion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerListHeight: 0,
            customerListWidth: initSize.customerListWidth,
            navibarWidth: initSize.navibarInitPaneWidth,
        };
        this.onCustomerListWidthChange = this.onCustomerListWidthChange.bind(this);
        this.onNavibarWidthChange = this.onNavibarWidthChange.bind(this);
        this.notifyChatWidthChange = this.notifyChatWidthChange.bind(this);
    }

    notifyChatWidthChange() {
        const { customerListWidth, navibarWidth } = this.state;
        const { dispatch } = this.props;
        const chatWidth = window.innerWidth - customerListWidth - navibarWidth;
        dispatch(homeActions.notifyChatWidthChange(chatWidth));
    }


    componentWillMount() {
        const customerListWidth = initSize.getCustomerListInitPaneDefaultWidth();
        const { dispatch } = this.props;
        dispatch(homeActions.notifyCustomerListWidthChange(customerListWidth));
        // dispatch(homeActions.notifyNavibarHeightChange(initSize.getChatListHeight()));
        dispatch(homeActions.notifyNavibarWidthChange(initSize.navibarInitPaneWidth - 5));
        this.notifyChatWidthChange();
    }


    onNavibarWidthChange(width) {
        const { dispatch } = this.props;
        const { navibarWidth } = this.state;
        const nwWidth = width - 5;
        if (navibarWidth != nwWidth) {
            this.setState({ navibarWidth: nwWidth });
            dispatch(homeActions.notifyNavibarWidthChange(nwWidth));
            this.notifyChatWidthChange();
        }
    }

    onCustomerListWidthChange(width) {
        const { dispatch } = this.props;
        const { customerListWidth } = this.state;
        if (customerListWidth != width) {
            this.setState({ customerListWidth: width });
            dispatch(homeActions.notifyCustomerListWidthChange(width));
            this.notifyChatWidthChange();
        }
    }

    render() {
        const initCustomerListHeight = initSize.getCustomerListInitPaneDefaultHeight();
        const initCustomerListwidth = initSize.getCustomerListInitPaneDefaultWidth();
        const initNavibarWidth = initSize.navibarInitPaneWidth;
        const { selectedChat } = this.props;
        return (
            // <SplitPane split='vertical' minSize={50} defaultSize={initNavibarWidth} maxSize={500} onChange={this.onNavibarWidthChange}>
            //     <div style={chatListContainerStyle}>
            //         <div style={searchBoxStyle}>
            //             <SearchBox />
            //         </div>
            //         <ChatList />
            //     </div>
            //     <SplitPane split="vertical" minSize={50} maxSize={500} defaultSize={initCustomerListwidth} primary="second" onChange={this.onCustomerListWidthChange}>
            //         {selectedChat && <SplitPane split="horizontal" minSize={50} pane1Style={{ background: '#f8f8f8' }} maxSize={450} defaultSize={150} primary="second"  >
            //             <Chat style={chatContianerStyle} />
            //             <div>{'23423423'}</div>
            //         </SplitPane>
            //         }
            //         <SplitPane split="horizontal" minSize={150} maxSize={500} defaultSize={initCustomerListHeight} primary="first"  >
            //             <div style={customerListContianerStyle}>
            //                 <p style={titleStyle}>客户列表</p>
            //                 <CustomerList />
            //             </div>

            //             <SplitPane split="vertical" minSize={50} maxSize={200} defaultSize={'50%'} >
            //                 <div style={staffListContianerStyle}>
            //                     <p style={titleStyle}>客服列表</p>
            //                     <StaffList />
            //                 </div>
            //                 <div style={commonPhraseContianerStyle}>
            //                     <p style={titleStyle}>常用语</p>
            //                     <CommonPhraseTreeView />
            //                 </div>
            //             </SplitPane>
            //         </SplitPane>
            //     </SplitPane>
            // </SplitPane>
            <div style={{ float: 'left', }} >



                <div style={{ display: 'table-cell', width: 220,height:'100vh',   background: 'green' }}>
                    <div style={chatListContainerStyle}>
                        <div style={searchBoxStyle}>
                            <SearchBox />
                        </div>
                        <ChatList />
                    </div>
                </div>

                <div style={{ display: 'table-cell', background: 'yellow',   width: '100%' }}>
                    {/* <ChatRegion />    */}
                    <p>chat</p>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}

const page = connect(mapStateToProps)(ChatRegion);
export { page as ChatRegion }; 