import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { messageActions } from '../../message/actions';
import { MessageList } from '../../message/components';
import { Scrollbar } from '../../controls'

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
const scrollbarStyle = {
    width: '100%',
    height: 'calc(80vh - 80px)',
    cursor: 'default',
}



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
        return false;
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        const { dispatch, selectedChat, offlineMsgPageIdx,offlineMsgPageCount } = this.props;

        // if (selectedChat != null && !isEqual(selectedChat, nextProps.selectedChat)) {
        //     dispatch(messageActions.getOfflineMessages(selectedChat));
        // }
        // else if (offlineMsgPageCount > 0 && offlineMsgPageIdx< offlineMsgPageCount) {
        //     this.refs.scrollbar.scrollTop(50);
        // }
    }

    handleScroll = value => {

        // const { top } = value;
        // const { selectedChat, offlineMsgPageIdx,offlineMsgPageCount } = this.props;
        // if (top === 0) { //如果滚动到顶部，则触发历史消息加载      
        //     const { dispatch } = this.props;
        //     if (offlineMsgPageIdx >= 0 && offlineMsgPageIdx < offlineMsgPageCount) {
        //         dispatch(messageActions.getOfflineMessages(selectedChat, offlineMsgPageIdx + 1));
        //     }
        // }
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
    const { messages, offlineMsgPageIdx, offlineMsgPageCount } = state.message;
    
    //todo 添加消息reducer
    return { selectedChat, messages, offlineMsgPageIdx, offlineMsgPageCount };
}


const page = connect(mapStateToProps, null)(Chat);

/**
 * 聊天页
 */
export { page as Chat };

