import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Titlebar } from './Titlebar';
import { Statusbar } from './Statusbar';
import Navibar from './Navibar'
import { CustomerList, StaffList } from '../../customers/components';
import { CommonPhraseTreeView } from '../../configuration/components';
import { Chat } from '../../chat/components';
import { homeActions } from '../actions';
import SplitPane from 'react-split-pane';
require('../../assets/styles/react-split-pane.css');

const titleStyle = {
    fontWeight: 'Bold',
}

const customerListContianerStyle = {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 35,
    paddingTop: 63,
}

const chatContianerStyle = {
    padding: 5,
    background: '#f8f8f8'
}


const naviBarStyle = {
    paddingTop: 53,
    paddingBottom: 0,
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
    getChatListHeight: function () {
        return window.innerHeight - this.heightOffset - 50;
    },

    getCustomerListHeightOffset: function () {
        return this.heightOffset + 30;
    },

    getCustomerListInitWidth: function () {
        return this.getCustomerListInitPaneDefaultWidth();
    },
    getCustomerListInitPaneDefaultHeight: function () {
        return this.isCustomerListHeightPercentage ? this.customerListHeight.toString() + '%' : this.customerListHeight;
    },
    getCustomerListInitPaneDefaultWidth: function () {
        return this.customerListWidth;
    }
}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerListHeight: 0,
            customerListWidth: initSize.customerListWidth,
            navibarWidth: initSize.navibarInitPaneWidth,
        };
        this.onCustomerListWidthChange = this.onCustomerListWidthChange.bind(this);
        this.onNavibarWidthChange = this.onNavibarWidthChange.bind(this);
        this.notifyChatWidthChange=this.notifyChatWidthChange.bind(this);
    }

    notifyChatWidthChange(){
        const {customerListWidth,navibarWidth} =this.state;
        const { dispatch } = this.props;
        const chatWidth=window.innerWidth- customerListWidth- navibarWidth;
        dispatch(homeActions.notifyChatWidthChange(chatWidth));
    }
    

    componentWillMount() {
        const customerListWidth = initSize.getCustomerListInitPaneDefaultWidth();
        const { dispatch } = this.props;
        dispatch(homeActions.notifyCustomerListWidthChange(customerListWidth));
        dispatch(homeActions.notifyNavibarHeightChange(initSize.getChatListHeight()));
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
            <div>
                <Titlebar />
                <SplitPane split='vertical' minSize={50} pane1Style={naviBarStyle} defaultSize={initNavibarWidth} maxSize={300} onChange={this.onNavibarWidthChange}>
                    <Navibar />
                    <SplitPane split="vertical" minSize={50} maxSize={500} defaultSize={initCustomerListwidth} primary="second" onChange={this.onCustomerListWidthChange}>
                        {selectedChat && <SplitPane split="horizontal" minSize={50} pane1Style={{ background: '#f8f8f8' }} maxSize={450} defaultSize={150} primary="second"  >
                            <Chat style={chatContianerStyle} />
                            <div>{'23423423'}</div>
                        </SplitPane>
                        }

                        <SplitPane split="horizontal" minSize={150} maxSize={500} defaultSize={initCustomerListHeight} primary="first"  >
                            <div style={customerListContianerStyle}>
                                <p style={titleStyle}>客户列表</p>
                                <CustomerList />
                            </div>

                            <SplitPane split="vertical" minSize={50} maxSize={200} defaultSize={'50%'} >
                                <div style={staffListContianerStyle}>
                                    <p style={titleStyle}>客服列表</p>
                                    <StaffList />
                                </div>
                                <div style={commonPhraseContianerStyle}>
                                    <p style={titleStyle}>常用语</p>
                                    <CommonPhraseTreeView />
                                </div>
                            </SplitPane>
                        </SplitPane>
                    </SplitPane>
                </SplitPane>
                <Statusbar />
            </div >
        );

    }

}


function mapStateToProps(state) {
    // return state.home;
    const { selectedChat } = state.chat;
    return { selectedChat };
}


const page = connect(mapStateToProps)(HomePage);
export { page as HomePage }; 