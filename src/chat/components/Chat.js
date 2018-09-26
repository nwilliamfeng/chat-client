import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { messageActions } from '../../message/actions';
import { MessageList } from '../../message/components';

const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    margin-bottom:10px;
    padding:20px 0px 0px 25px;
`;

class Chat extends Component {

    constructor(props) {
        super(props);

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
        const { dispatch, selectedChat } = this.props;
        if (selectedChat != null) {
            dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId));
        }
    }

    handleOfflineMessagesScroll = value => {
     
        const { scrollHeight, top } = value;
        if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
            const { selectedChat, pageIdx, pageCount } = this.props;
            
            const { dispatch } = this.props;
            if (pageIdx < pageCount) {
                console.log(value);
                dispatch(messageActions.getOfflineMessages(selectedChat.customer.CustomerId, pageIdx + 1));
            }
        }
        else {
            // const { needScroll, currHeight } = this.state;
            // if (currHeight !== scrollHeight) {
            //     this.setState({ currHeight: scrollHeight });
            // }
            // if (needScroll === true) {
            //     const { scrollbars } = this.refs;

            //     scrollbars.scrollTop(scrollHeight - currHeight);
            //     this.setState({ needScroll: false });
            // }
        }
    }

    render() {
        console.log('render chat');
        const { selectedChat, messages } = this.props;

        return (

            <div >
                {selectedChat &&
                    <div>
                        <TitleDiv>
                            <p style={{ fontSize: 20 }}>{selectedChat.customer.CustomerName}</p>
                        </TitleDiv>

                        <MessageList messages={messages} scrollHandle={this.handleOfflineMessagesScroll} />
                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat;
    const { offlineMessages,pageIdx,pageCount } = state.offlineMessage;
    //todo,后面置入messages
    const messages = [...offlineMessages];

    //todo 添加消息reducer
    return { selectedChat, messages,pageIdx,pageCount };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };
