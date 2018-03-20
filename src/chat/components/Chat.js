import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext } from '../../util';
import { chatActions } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SplitterLayout from 'react-splitter-layout';
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
        this.state={activePage:0};
        this.handleSelectActivePage =this.handleSelectActivePage.bind(this);
       
    }

    closeChat(chat) {
        alert(chat.customer);
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
    handleSelectActivePage(index, lastIndex,event){
        const {selectedChat} =this.props;
        selectedChat.activePage= index;
        this.setState({activePage:index});
    }

    
    render() {
        const { selectedChat } = this.props;
        // if(selectedChat!=null){
        //     this.setState({activePage:selectedChat.activePage});
        // }
        return (
            <SplitterLayout vertical secondaryInitialSize={150} secondaryMinSize={50} >
                {selectedChat && <div style={outContainerStyle}>
                    <h3>{selectedChat.customer.CustomerName}</h3> 
                    <Tabs selectedIndex={this.state.activePage} onSelect={this.handleSelectActivePage}>
                        <TabList >
                            <Tab>客户对话</Tab>
                            <Tab>客户信息</Tab>
                            <Tab>消息记录</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Any content 111</h2>
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
    return state.chat;
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * Chat实例
 */
export { page as Chat };
