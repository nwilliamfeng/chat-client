import React from 'react'
import { util } from '../../util'
import styled from 'styled-components'


const TimeSpan = styled.span`
    color: gray;
    margin: 0px 5px;
    font-size:12px;`


const getSendTime=time=> {

    if (time.getTime() >= util.today().getTime()) {
        return '[' + util.dateFormat(time, 'hh:mm:ss') + ']'
    }
    return '[' + util.dateFormat(time, 'M月d日 hh:mm:ss') + ']'
}

/**
 * 消息发送时间
 * @param {string} param0 
 */
export const MessageTime = ({ value }) => {
    const time = getSendTime(value)
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

 