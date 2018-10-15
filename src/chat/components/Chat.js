import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { chatActions } from '../actions'
import styled from 'styled-components'
import { MessageList } from '../../message/components'
import { withScroll } from '../../controls'
require('../../assets/styles/scrollbar.css')

/**
 * 标题div
 */
const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    padding:16px 0px 6px 25px;
    height:61px;
`;

const MessageListContainer = styled.div`
    overflow-y: hidden;
    height:100%;
    position:absolute;
`;

/**
 * 消息列表滚动条
 */
const Scrollbar = withScroll(props => <MessageList {...props} />);


class Chat extends Component {

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

    componentWillReceiveProps(nextProps, nextContext) {
        const { selectedChat } = nextProps;
        if (selectedChat == null) {
            return;
        }
        if (this.canLoadMoreOfflineMsg(selectedChat)) {
            this.setState({ autoScrollBottom: false });
        }
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { selectedChat } = this.props;
        if (selectedChat == null) {
            return;
        }
        const { offlineMsgTotalCount, offlineMsgPageSize, offlineMsgPageIdx } = this.props.selectedChat;
        if (offlineMsgTotalCount > 0 && ((offlineMsgPageIdx + 1) * offlineMsgPageSize >= offlineMsgTotalCount)) {
            this.setState({ autoScrollBottom: true });
        }
        console.log('do componentDidUpdate');
    }

    canLoadMoreOfflineMsg = chat => {
        if (chat == null) {
            return false;
        }
        const { offlineMsgTotalCount, offlineMsgPageSize, offlineMsgPageIdx } = chat;
        return offlineMsgTotalCount > 0 && ((offlineMsgPageIdx + 1) * offlineMsgPageSize < offlineMsgTotalCount);
    }

    getMessages = () => {
        const { selectedChat } = this.props;
        let messages = selectedChat ? selectedChat.messages : [];

        const { autoScrollBottom } = this.state;
        if (!autoScrollBottom) {
            if (this.canLoadMoreOfflineMsg(selectedChat)) {
                const sysMsg = { MessageContent: { content: '还有未读的消息，请鼠标向上滚动进行加载。' }, SendTime: new Date(), }
                messages = [sysMsg, ...messages];
            }
        }
        return messages;
    }

    handleScrollTop = () => {
        console.log('handleScrollTop');
        const { dispatch, selectedChat } = this.props;
        if (this.canLoadMoreOfflineMsg(selectedChat)) {
            console.log('handleScrollTop2');
            dispatch(chatActions.loadMoreOfflineMessages(selectedChat.channelId));
        }
    }



    render() {
        console.log('render chat');
        const { selectedChat } = this.props;
        const { autoScrollBottom } = this.state;
        return (
            <div>
                {selectedChat && <TitleDiv>
                    <div className='col-md-10' style={{ paddingLeft: 0 }}>
                        <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                    </div>
                    <div className='col-md-2'>
                        <button className='pull-right' >{'更多'}</button>
                    </div>
                </TitleDiv>}

                {selectedChat &&
                    <Scrollbar messages={this.getMessages()} onScrollTop={this.handleScrollTop} paddingTop={5} paddingRight={5} autoScrollBottom={autoScrollBottom} />}

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
 * 聊天组件
 */
export { page as Chat };

