import React from 'react';
import { messageContentRender } from './MessageContentRender';
import styled from 'styled-components';


const TimeSpan = styled.span`
    color: gray;
    margin: 0px 5px;
    font-size:12px;`

/**
 * 消息发送时间
 * @param {string} param0 
 */
export const MessageTime = ({ value }) => {
    const time = messageContentRender.renderSendTime(value);
    return <TimeSpan>{time}</TimeSpan>
}

/**
 * 消息发送者
 */
export const MessageSender = styled.span`
    color: ${props=>props.color?props.color:'gray'} ;
    font-size: 12px;`


/**
 * 头像
 */
export const Avata = styled.img`
    width: 42px;
    height: 42px;
    margin-top: 5px;`

 