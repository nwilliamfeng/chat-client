import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { chatActions } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { MessageList } from '../../message/components'
import Popup from "reactjs-popup"
import { withScroll } from '../../controls'
import MessageHelper from '../../message/messageHelper'
require('../../assets/styles/scrollbar.css')

/**
 * 标题div
 */
const TitleDiv = styled.div`
    border-bottom:1px solid #E7E7E7;
    padding:16px 0px 6px 25px;
    height:61px;
`;

const MoreButton = styled.button`
 
     font-size: 17px;
     display: block;
     background-color: transparent;
     color: gray;
     border: none;
     outline: none;
     &:hover{
        color: green;
     };
`;

const popupContentStyle = {
    padding: "0px",
    border: "none",
    width: 150,
    backgroundColor: 'transparent',
    marginTop: -20
};

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
                        <Popup
                            trigger={() => (<MoreButton title='更多' className='pull-right' ><FontAwesomeIcon icon={faEllipsisH} /></MoreButton>)}
                            position="right bottom"
                            on="click"
                            closeOnDocumentClick
                            mouseLeaveDelay={300}
                            mouseEnterDelay={0}
                            contentStyle={popupContentStyle}
                            arrow={false} >
                            {/* <SettingMenu>
                                <SettingMenuItem>帮助</SettingMenuItem>
                                <SettingMenuItem>设置</SettingMenuItem>
                            </SettingMenu> */}

                        </Popup>
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

