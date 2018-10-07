import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { MessageList } from '../../message/components';
import { Scrollbar } from '../../controls'
import { chatActions } from '../actions';

/**
 * 标题div
 */
const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    margin-bottom:0px;
    padding:16px 0px 6px 25px;
    height:61px;
`;


/**
 * 滚动条样式
 */
const scrollbarStyle = {
    width: '100%',
    height: 'calc(80vh - 77px)',
    cursor: 'default',
}



class Chat extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedChat } = this.props;
        if (selectedChat == null && nextProps.selectedChat == null) {
            return false;
        }
        if (!isEqual(nextProps.selectedChat, selectedChat)) {
            return true;
        }

        return false;
    }


    componentDidUpdate(nextProps, nextState, nextContext) {
        const { selectedChat } = this.props;
        if (selectedChat == null) {
            return;
        }

        if (this.canLoadMoreOfflineMsg()) {
            this.refs.scrollbar.scrollTop(50);
        }
        else {
            this.refs.scrollbar.scrollToBottom();
        }
    }

    handleScroll = value => {

        const { top } = value;
        const { selectedChat } = this.props;
        if (selectedChat == null) {
            return;
        }
        if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
            const { dispatch } = this.props;
            if (this.canLoadMoreOfflineMsg()) {
                dispatch(chatActions.loadMoreOfflineMessages(selectedChat.channelId));
            }
        }
    }

    canLoadMoreOfflineMsg = () => {
        const { offlineMsgTotalCount, offlineMsgPageSize, offlineMsgPageIdx } = this.props.selectedChat;

        return offlineMsgTotalCount > 0 && ((offlineMsgPageIdx + 1) * offlineMsgPageSize < offlineMsgTotalCount);
    }


    render() {
        console.log('render chat');
        const { selectedChat } = this.props;
        const messages = selectedChat ? selectedChat.messages : [];
        return (

            <div >
                {selectedChat &&
                    <div >
                        <TitleDiv>
                            <div className='col-md-10'>
                                <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                            </div>
                            <div className='col-md-2'>
                                <button className='pull-right' >{'更多'}</button>
                            </div>

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

    //todo 添加消息reducer
    return { selectedChat };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };

