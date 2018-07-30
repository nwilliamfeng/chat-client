import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CustomerList, StaffList } from '../../customers/components';
import ChatContainer from './ChatContainer';
import { SearchBox } from '../../search/components';
import { ChatList } from './ChatList';
import { InputBox  } from './InputBox';

require('../../assets/styles/grid.css');
require('../../assets/styles/ul.css');
require('../../assets/styles/scrollbar.css');

const titleStyle = {
    fontWeight: 'Bold',
}

const chatListContainerStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
}


const searchBoxStyle = {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 3,

}


const initSize = {
    heightOffset: 83,

    customerListWidth: 300,
    navibarInitPaneWidth: 250,

}

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerListHeight: 0,
            customerListWidth: initSize.customerListWidth,
            navibarWidth: initSize.navibarInitPaneWidth,
        };


    }


    render() {

        const { selectedChat } = this.props;
        return (            
            <div >
                <div className="row">
                    <div className="col-fixed-chatlist">
                        <div style={chatListContainerStyle}>
                            <div style={searchBoxStyle}>
                                <SearchBox />
                            </div>
                            <ChatList />
                        </div>
                    </div>

                    <div className="col-offset-chat" style={{ overflowY: 'hidden', height: '100vh', }}   >
                        <div className="innerHold-chat" >
                            <div style={{ height: '80vh' }}>
                                <ChatContainer />
                            </div>
                            <div style={{ height: '20vh',   width: '100%', padding: 10, }}>
                                 
                                <InputBox/>
                                
                            </div>
                        </div>
                        <div className="innerHold-extend"  >
                            <div style={{ height: '45vh', marginTop: 10, }}>
                                <p style={titleStyle}>客户列表</p>
                                <CustomerList />
                            </div>
                            <div style={{ height: '45vh', marginTop: 40,  borderTopStyle:'solid', paddingTop:10,borderColor:'lightGrey' }}>
                                <p style={titleStyle}>客服列表</p>
                                <StaffList />
                            </div>
                        </div>

                        <div className="clear"></div>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}

const page = connect(mapStateToProps)(ChatPage);
export { page as ChatPage }; 