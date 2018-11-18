import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ContextMenuTrigger } from "react-contextmenu"
import { CHAT_LIST_CONTEXTMENU_ID } from './ChatList'
import { renderTextContent } from '../../message/components'
import MessageHelper from '../../message/messageHelper'
import { messageContentType } from '../../message/constants'
import { appContext, util } from '../../util'


const HeaderLi = styled.li`
    display:flex;
    flex-direction:row;   
    flex-wrap:nowrap;
    padding: 1px 8px 8px 8px;
    outline:none;
    text-align:left;
    width:calc(100% + 40px);
    overflow:hidden;
    margin-left:-40px;
    background-color:${props => props.isSelected ? '#C4C4C5' : 'transparent'};
    &:hover{
        background-color:${props => props.isSelected ? '#C4C4C5' : '#DEDBDA'};
    };  `

const HeaderDiv = styled.div`
    display:flex;
    flex:1;
    
    flex-direction:row;
    flex-wrap:nowrap;`

const MsgDiv = styled.div`
    font-size:12px;
    color: gray;
    width:100%;
    margin-top:5px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;`

const TitleDiv = styled.div`
    width:100px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;`

const TxtContentDiv = styled.div`
    text-overflow:ellipsis;
    overflow:hidden; 
    max-width:${props => props.size ? `${props.size.width - 115}px` : '100%'};
    white-space:nowrap;`

const TimeDiv = styled.div`
    font-size:12px;
    width:50px;
    color: gray;
    text-align:right;
    padding-top:10px;
    padding-right:5px;`

const MsgCountDiv = styled.div`
    height:14px;
    min-width:14px;
    border-radius:60px;
    background:red;
    padding:1px;
    position:relative;
    text-align:center;
    margin-top:-50px;
    margin-left:30px;
    font-size:8px;
    cursor:default;`

const AvatarDiv = styled.div`
    margin-left:3px;
    margin-right:10px;
    vertical-align:center;
    text-align:center;   
    font-size:24px;  
    padding:12px 0px 0px 0px;
    width:40px;
    height:40px;
    color: white;`

const AvatarImg = styled.img`
    height:36px;
    width:36px;
    margin-bottom:4px;
    border-radius:3px;`

const MixDiv = styled.div`padding-top:10px;`

/**
 * 文本消息内容
 */
const TextMessageContent = renderTextContent(props => <TxtContentDiv {...props} />)

/**
 * 显示最后一条消息
 * @param {*} param0 
 */
const LastMessage = ({ message, size }) => {
    if (message == null) {
        return <React.Fragment />
    }
    const { SenderName, MessageContent } = message
    const contentType = MessageHelper.getMessageContentType(MessageContent)
    const sender = SenderName === appContext.currentStaff.StaffName ? '' : SenderName + '：'
    const content = sender + MessageContent
    return <React.Fragment >
        {contentType === messageContentType.Text && <MsgDiv title={`${SenderName}：${MessageContent}`}>
            <TextMessageContent content={content} emojiSize={12} size={size} />
        </MsgDiv>}
        {contentType === messageContentType.File && <MsgDiv title={`${SenderName}：文件`}> {`${sender}文件`}  </MsgDiv>}
        {contentType === messageContentType.Picture && <MsgDiv title={`${SenderName}：图片`}> {`${sender}图片`} </MsgDiv>}
    </React.Fragment>
}



/**
 * 会话列表项
 * @param {*} param0 
 */
export const ChatListItem = ({ chat, onSelectChat, isSelected, size }) => {
    const { customer, messages, channelId } = chat
    const { CustomerName, CustomerAvataUrl } = customer
    const unreadMsgs = messages.filter(x => x.isUnread === true)
    const lastMsg = messages[messages.length - 1]
    const time = lastMsg ? util.dateFormat(lastMsg.SendTime, 'hh:mm:ss') : ''
    const containUnread = unreadMsgs.length > 0
    const onClick = () => onSelectChat(channelId)

    return <ContextMenuTrigger id={CHAT_LIST_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify(chat) }}>
        <HeaderLi onClick={onClick} isSelected={isSelected}>
            <HeaderDiv>
                <AvatarDiv>
                    <AvatarImg alt='' src={CustomerAvataUrl} />
                    {containUnread && <MsgCountDiv>{unreadMsgs.length}</MsgCountDiv>}
                </AvatarDiv>

                <MixDiv>
                    <TitleDiv> {CustomerName}</TitleDiv>
                    <LastMessage message={lastMsg} size={size} />
                </MixDiv>
            </HeaderDiv>
            {lastMsg != null && <TimeDiv> {time}</TimeDiv>}
        </HeaderLi>
    </ContextMenuTrigger>
}

ChatListItem.propTypes = {
    chat: PropTypes.object.isRequired,
    messages: PropTypes.array,
    onSelectChat: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,

}



