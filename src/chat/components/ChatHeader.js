import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContextMenuTrigger } from "react-contextmenu";
import { CHAT_LIST_CONTEXTMENU_ID } from './ChatList';
import { withMessageContent } from '../../message/components';
import MessageHelper from '../../message/messageHelper';
import { messageContentType } from '../../message/constants';
import { appContext, util } from '../../util'


const HeaderLi = styled.li`
    padding:0px;
    outline:none;
    text-align:left;
    margin-left:-40px;
    &:hover{
        background-color: #DEDBDA;
    };  
`;

const TableCellDiv = styled.div`
    display:table-cell;
`;

const TopTableCellDiv = styled(TableCellDiv)`
    font-size:14px;
    vertical-align:top;
    cursor:default;
`;

const MsgDiv = styled.div`
    font-size:12px;
    color: gray;
    width:120px;
    margin-top:5px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
`;

const TitleDiv = styled.div`
    width:100px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
`;

const TxtContentDiv = styled.div`
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
   
`;

const TimeDiv = styled.div`
    font-size:12px;
    width:50px;
    color: gray;
    text-align:right;
    padding-right:5px;
`;

const MsgCountDiv = styled.div`
    height:14px;
    min-width:14px;
    border-radius:60px;
    background:red;
    padding:1px;
    position:absolute;
    margin-top:-48px;
    margin-left:30px;
    font-size:8px;
    cursor:default;
`;

const AvatarDiv = styled.div`
    margin-left:3px;
    margin-right:10px;
    vertical-align:center;
    text-align:center;   
    font-size:24px;  
    width:40px;
    height:40px;
    color: white;
`;

const AvatarImg = styled.img`
    height:36px;
    width:36px;
    margin-bottom:4px;
    border-radius:3px;
`;

const HeaderDiv = styled.div`
    padding: 11px 8px 10px 8px;
    background-color:${props => props.isSelected ? '#C4C4C5' : 'transparent'};
`;

const TextMessageContent = withMessageContent(props => <TxtContentDiv>{props.children}</TxtContentDiv>);


const LastMessage = ({ message }) => {
    const { SenderName, MessageContent } = message;
    const contentType = MessageHelper.getMessageContentType(MessageContent);
    const sender = SenderName === appContext.currentStaff.StaffName ? '' : SenderName + '：';
    const content = sender + MessageContent;
    if (message == null) {
        return <div></div>
    }
    return (
        <div>
            {contentType === messageContentType.Text && <MsgDiv title={`${SenderName}：${MessageContent}`}>
                <TextMessageContent content={content} emojiSize={12} />
            </MsgDiv>}
            {contentType === messageContentType.File && <MsgDiv title={`${SenderName}：文件`}>
                {`${sender}文件`}
            </MsgDiv>}
            {contentType === messageContentType.Picture && <MsgDiv title={`${SenderName}：图片`}>
                {`${sender}图片`}
            </MsgDiv>}
        </div>
    )
}


/**
 * 会话列表项
 * @param {*} param0 
 */
export const ChatHeader = ({ chat, onSelectChat, isSelected }) => {

    const { customer, messages } = chat;
    const { CustomerName, CustomerAvataUrl } = customer;
    const unreadMsgs = messages.filter(x => x.isUnread === true);
    const lastMsg = messages[messages.length - 1];
    const time = lastMsg ? util.dateFormat(lastMsg.SendTime, 'hh:mm:ss') : '';
    const containUnread = unreadMsgs.length > 0;
    const onClick = () => onSelectChat(chat);
    return (
        <HeaderLi onClick={onClick}>
            <ContextMenuTrigger id={CHAT_LIST_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify(chat) }}>
                <HeaderDiv isSelected={isSelected}>
                    <TableCellDiv>
                        <AvatarDiv>
                            <AvatarImg alt='' src={CustomerAvataUrl} />
                            {containUnread && <MsgCountDiv>{unreadMsgs.length}</MsgCountDiv>}
                        </AvatarDiv>
                    </TableCellDiv>
                    <TopTableCellDiv>
                        <TitleDiv> {CustomerName}</TitleDiv>
                        <LastMessage message={lastMsg} />
                    </TopTableCellDiv>
                    <TopTableCellDiv>
                        {containUnread && <TimeDiv> {time}</TimeDiv>}
                    </TopTableCellDiv>
                </HeaderDiv>
            </ContextMenuTrigger>
        </HeaderLi>
    )
}

ChatHeader.propTypes = {
    chat: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    onSelectChat: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,

}
