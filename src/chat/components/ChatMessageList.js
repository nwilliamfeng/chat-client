import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { chatActions } from '../actions'
import styled from 'styled-components'
import { withMessageList } from '../../message/components'
import { withScroll } from '../../controls'
import MessageHelper from '../../message/messageHelper'
import {compose} from 'recompose'


const MsgDiv = styled.div`padding:15px;`

const Container=styled.div`height:100%;`

/**
 * 带滚动条的消息列表，注意compose参数顺序从右往左
 */
const MessageListWithScroll =compose(withScroll,withMessageList)(props => <MsgDiv {...props} />)
 

class ChatMessageList extends Component {

    constructor(props) {
        super(props)
        this.state = { autoScrollBottom: true,didLoadOfflineMessage:false }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedChat } = this.props;
        if (selectedChat == null && nextProps.selectedChat == null) {
            return false
        }
        if (!isEqual(nextProps.selectedChat, selectedChat)) {
            return true
        }
        return false
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        this.setState({ autoScrollBottom: true })
        const {didLoadOfflineMessage} =this.state
        if(this.canLoadMoreOfflineMsg() && !didLoadOfflineMessage){
            this.setState({didLoadOfflineMessage:true})
        }
    }

    componentWillReceiveProps(nextProps,nextContext){
        const nextChat = nextProps.selectedChat
        const currChat=this.props.selectedChat
        if(nextChat!=null && currChat!=null && currChat.channelId!==nextChat.channelId){
            this.setState({ didLoadOfflineMessage: false })
        }
    }

    canLoadMoreOfflineMsg = () => {
        const { selectedChat  } = this.props
        if(selectedChat==null){
            return false
        }
        const { offlineMsgTotalCount, offlineMsgPageSize, offlineMsgPageIdx } = selectedChat
        return offlineMsgTotalCount > 0 && ((offlineMsgPageIdx + 1) * offlineMsgPageSize < offlineMsgTotalCount)
    }

    getMessages = () => {
        const { selectedChat } = this.props
        let messages = selectedChat ? selectedChat.messages : []
        const { didLoadOfflineMessage } = this.state
        if(!this.canLoadMoreOfflineMsg() && !didLoadOfflineMessage){
            return messages
        }
        const sysContent = this.canLoadMoreOfflineMsg() ? '未读的消息' :'以下是最近的消息' 
        const sysMsg = MessageHelper.createSystemMessage(sysContent)
        return [sysMsg, ...messages]
    }

    handleScrollTop = () => {
        console.log('on scroll top')
        const { dispatch, selectedChat } = this.props
        if (this.canLoadMoreOfflineMsg()) {
            dispatch(chatActions.loadMoreOfflineMessages(selectedChat.channelId))
            this.setState({ autoScrollBottom: false })
        }
    }

    render() {
        console.log('render chatMessagelist')
        const { selectedChat } = this.props
        const { autoScrollBottom } = this.state
        return (
            <Container>                
                {selectedChat && <MessageListWithScroll messages={this.getMessages()} onScrollTop={this.handleScrollTop} autoScrollBottom={autoScrollBottom} isAbsolute={true}/>}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { selectedChat } = state.chat
    return { selectedChat }
}

const page = connect(mapStateToProps, null)(ChatMessageList)

/**
 * 聊天的消息列表
 */
export { page as ChatMessageList }

