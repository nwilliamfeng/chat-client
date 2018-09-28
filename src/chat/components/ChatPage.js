import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CustomerList } from '../../customers/components';
import { StaffList } from '../../staff/components';
import { SearchBox } from '../../search/components';
import { ChatList } from './ChatList';
import { InputBox  } from './InputBox';
import sizeMe from 'react-sizeme';
import { Chat } from './Chat';
import {chatWindow} from '../../util/chatRegionHelper'

require('../../assets/styles/grid.css');
require('../../assets/styles/ul.css');

require('../../assets/styles/scrollbar.css');

const titleStyle = {
    fontWeight: 'Bold',
}

//会话列表容器样式
const chatListDivStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
}

//查询框容器样式
const searchBoxDivStyle = {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 3,

}

//输入框容器样式
const inputBoxDivStyle={
    height: '20vh',   
    width: '100%', 
    padding: 10, 
    background:'white',
    borderTopStyle:'solid',
    borderWidth:1, 
    paddingTop:10,
    borderColor:'lightGrey',
   
}

//客户列表容器样式
const customerDivStyle={
    height: '45vh',
    marginTop: 10,
}

//客服列表容器样式
const staffDivStyle={
    height: 'calc(55vh - 51px)', 
    marginTop: 40,  
    borderTopStyle:'solid', 
    paddingTop:10,
    borderColor:'lightGrey',
    borderWidth:1 
}


const initSize = {
    heightOffset: 83,
    customerListWidth: 300,
    navibarInitPaneWidth: 250,
}


const setChat=Component=>class extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const { width } = this.props.size;
        chatWindow.width=width;
        return (
            <div style={{ height: 'calc(100% - 80px)' }}>
                <Component {...this.props}/>
            </div>
        );
    }
}
 
const ChatContainer =sizeMe({ monitorHeight: true })(setChat(Chat));

export  class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerListHeight: 0,
            customerListWidth: initSize.customerListWidth,
            navibarWidth: initSize.navibarInitPaneWidth,
        };


    }


    render() {
        return (            
            <div >
                {/* <div className="row">
                    <div className="col-fixed-chatlist">
                        <div style={chatListDivStyle}>
                            <div style={searchBoxDivStyle}>
                                <SearchBox />
                            </div>
                            <ChatList />
                        </div>
                    </div> */}

                    {/* <div className="col-offset-chat"    > */}
                        <div   >
                            <div style={{ height: '80vh'}}>
                                <ChatContainer/>
                            </div>
                            <div style={inputBoxDivStyle}>                        
                                <InputBox/>                               
                            </div>
                        </div>
                        {/* <div className="innerHold-extend"  >
                            <div style={customerDivStyle}>
                                <p style={titleStyle}>客户列表</p>
                                <CustomerList />
                            </div>
                            <div style={staffDivStyle}>
                                <p style={titleStyle}>客服列表</p>
                                <StaffList />
                            </div>
                        </div>

                        <div className="clear"></div> 

                    </div>*/}
                {/* </div> */}
            </div>
        );
    }
}

 