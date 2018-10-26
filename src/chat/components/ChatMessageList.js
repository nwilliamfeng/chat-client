import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { chatActions } from '../actions'
import styled from 'styled-components'
import { withMessageList } from '../../message/components'
import { withScroll } from '../../controls'
import MessageHelper from '../../message/messageHelper'
require('../../assets/styles/scrollbar.css')

const MsgDiv = styled.div`padding:15px;`

const MessageList = withMessageList(props => <MsgDiv {...props} />)
 
const MessageListWithScroll = withScroll(props => <MessageList {...props} />)

class ChatMessageList extends Component {

    constructor(props) {
        super(props);
        this.state = { autoScrollBottom: true };
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
        this.setState({ autoScrollBottom: true });
        console.log('do componentDidUpdate');
    }

    canLoadMoreOfflineMsg = () => {
        const { selectedChat } = this.props;
        const { offlineMsgTotalCount, offlineMsgPageSize, offlineMsgPageIdx } = selectedChat;
        return offlineMsgTotalCount > 0 && ((offlineMsgPageIdx + 1) * offlineMsgPageSize < offlineMsgTotalCount);
    }

    getMessages = () => {
        const { selectedChat } = this.props;
        let messages = selectedChat ? selectedChat.messages : [];
        const sysContent = this.canLoadMoreOfflineMsg() ? '还有未读的消息，请鼠标向上滚动进行加载' : '没有更多的了~';
        const sysMsg = MessageHelper.createSystemMessage(sysContent);
        return [sysMsg, ...messages];
    }

    handleScrollTop = () => {
        console.log('on scroll top');
        const { dispatch, selectedChat } = this.props;
        if (this.canLoadMoreOfflineMsg()) {
            dispatch(chatActions.loadMoreOfflineMessages(selectedChat.channelId));
            this.setState({ autoScrollBottom: false });
        }
    }

    render() {
        console.log('render chatMessagelist');
        const { selectedChat } = this.props;
        const { autoScrollBottom } = this.state;
        return (
            <div>                
                {selectedChat && <MessageListWithScroll messages={this.getMessages()} onScrollTop={this.handleScrollTop} autoScrollBottom={autoScrollBottom} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    return { selectedChat };
}


const page = connect(mapStateToProps, null)(ChatMessageList);

/**
 * 聊天的消息列表
 */
export { page as ChatMessageList };

