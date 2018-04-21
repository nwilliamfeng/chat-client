import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerList, StaffList } from '../../customers/components';
import { CommonPhraseTreeView } from '../../configuration/components';
import { Chat } from './Chat';
import  ChatContainer   from './ChatContainer';
import { SearchBox } from '../../search/components';
import { ChatList } from './ChatList';
import { Scrollbars } from 'react-custom-scrollbars';
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
            // <div style={{ float: 'left', }} >
            //     <div style={{ display: 'table-cell', width: 250, height: '100%', background: '#E6E6E7', position: 'fixed', }}>
            //         <div style={chatListContainerStyle}>
            //             <div style={searchBoxStyle}>
            //                 <SearchBox />
            //             </div>
            //             <ChatList />
            //         </div>
            //     </div>

            //     <div style={{ display: 'table-cell', background: '#F5F5F5', left: 310, position: 'fixed', width: '100%' }}>           
            //         <div className="row" style={{ height: '100vh', marginLeft: 1 }}>
            //             <div className="col-md-7" style={{ padding: 5 }}>
            //                 <div style={{ height: '80vh',  }}>
            //                      <Chat   />
            //                 </div>
            //                 <div style={{  height: '20vh', background:'red',width:'100%',padding:20, position: 'absolute'   }}>
            //                    <div style={{ height: '100%',background:'green' ,width:'100%',  }}>
            //                        </div>
            //                 </div>
            //             </div>
            //             <div className="col-md-5" style={{ background: 'white'  }}>
            //                 <div style={{height:'50vh',   marginTop: 10 }}>
            //                     <p style={titleStyle}>客户列表</p>
            //                     <CustomerList />
            //                 </div>
            //                 <div style={{height:'50vh',  }}>
            //                     <p style={titleStyle}>客户列表</p>                              
            //                 </div>                         
            //             </div>
            //         </div>
            //     </div>
            // </div>
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
                            <div style={{ height: '80vh'}}>
                                <ChatContainer />
                            </div>
                            <div style={{ height: '20vh', background: 'red', width: '100%', padding: 10,   }}>
                                <div style={{ height: '100%', background: 'green', width: '100%',  }}>
                                </div>
                            </div>
                        </div>
                        <div className="innerHold-extend"  >
                        <div style={{ height: '45vh', marginTop: 10 ,  }}>
                                    <p style={titleStyle}>客户列表</p>

                                    <CustomerList />

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