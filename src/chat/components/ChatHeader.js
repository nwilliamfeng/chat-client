import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContextMenuTrigger } from "react-contextmenu";
import { CHAT_LIST_CONTEXTMENU_ID } from './ChatList';

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

const MsgDiv=styled.div`
    font-size:12px;
    color: gray;
    width:120px;
    margin-top:5px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
`;

const TitleDiv=styled.div`
    width:100px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
`;

const TimeDiv=styled.div`
    font-size:12px;
    width:50px;
    color: gray;
    text-align:right;
    padding-right:5px;
`;

const MsgCountDiv=styled.div`
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

const AvatarDiv=styled.div`
    margin-left:3px;
    margin-right:10px;
    vertical-align:center;
    text-align:center;   
    font-size:24px;  
    width:40px;
    height:40px;
    color: white;
`;

const AvatarImg=styled.img`
    height:36px;
    width:36px;
    margin-bottom:4px;
    border-radius:3px;
`;

const HeaderDiv=styled.div`
    padding: 11px 8px 10px 8px;
    background-color:${props=>props.isSelected?'#C4C4C5' : 'transparent'};
`;

/**
 * 会话列表项
 * @param {*} param0 
 */
export const ChatHeader = ({ chat, onSelectChat, isSelected }) => {

    const {customer} =chat;
    const {CustomerName,CustomerAvataUrl} =customer;
    const onClick = () =>  onSelectChat(chat);
    return (
        <HeaderLi onClick={onClick}>
            <ContextMenuTrigger id={CHAT_LIST_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify(chat) }}>
                <HeaderDiv isSelected={isSelected}>
                    <TableCellDiv>
                        <AvatarDiv>
                            <AvatarImg alt=''  src={CustomerAvataUrl} />
                            <MsgCountDiv>{9}</MsgCountDiv>
                        </AvatarDiv>
                    </TableCellDiv>
                    <TopTableCellDiv>
                        <TitleDiv> {CustomerName}</TitleDiv>
                        <MsgDiv> {'的俺的沙发大幅拉开飞机阿斯顿发福利阿斯顿发送到付款阿斯顿发生发动机发大发'}</MsgDiv>
                    </TopTableCellDiv>
                    <TopTableCellDiv>
                        <TimeDiv> {'18/12/23'}</TimeDiv>
                    </TopTableCellDiv>
                </HeaderDiv>
            </ContextMenuTrigger>
        </HeaderLi>
    )
}

ChatHeader.propTypes={
    chat:PropTypes.object.isRequired,
    onSelectChat:PropTypes.func.isRequired,

}
