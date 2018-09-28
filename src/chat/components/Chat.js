import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { messageActions } from '../../message/actions';
import { MessageList } from '../../message/components';
import {Scrollbar} from '../../controls'

/**
 * 标题div
 */
const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    margin-bottom:10px;
    padding:18px 0px 3px 25px;
`;

/**
 * 滚动条样式
 */
const scrollbarStyle={
    width: '100%', 
    height: 'calc(80vh - 80px)',
    cursor:'default',
}
 


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { needScrollOfflineMsgs: false, msgListHeight: 0  };
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedChat, messages } = this.props;

        if (!isEqual(nextProps.selectedChat, selectedChat)) {
            return true;
        }
        if (!isEqual(messages, nextProps.messages)) {
            return true;
        }

        console.log('return false');
        return false;
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        console.log('componentDidUpdate');
        const { dispatch, selectedChat, pageIdx, pageCount } = this.props;
        
        if (selectedChat != null && !isEqual(selectedChat, nextProps.selectedChat)) {
            dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer));
        }
        else if (pageIdx < pageCount) {
            
               this.refs. scrollbar.scrollTop(50);
          

        }
    }

    handleScroll = value => {
        const { top } = value;
        const { selectedChat, pageIdx, pageCount } = this.props;
        if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
            const { dispatch } = this.props;
            if (pageIdx < pageCount) {
                console.log('ready to get next msgs');
                dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, selectedChat.customer, pageIdx + 1));
            }
        }
    }



    render() {
        console.log('render chat');
        const { selectedChat, messages } = this.props;
        return (

            <div >
                {selectedChat &&
                    <div >
                        <TitleDiv>
                            <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        </TitleDiv>              
                        <Scrollbar onScroll={this.handleScroll} ref='scrollbar' style={scrollbarStyle}>
                            <MessageList messages={messages} />
                        </Scrollbar>

                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    const { offlineMessages, pageIdx, pageCount } = state.offlineMessage;
    //todo,后面置入messages
    const messages = [...offlineMessages];

    //todo 添加消息reducer
    return { selectedChat, messages, pageIdx, pageCount };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };

 