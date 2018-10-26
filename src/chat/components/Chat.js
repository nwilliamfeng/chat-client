import React, { Component } from 'react'
import { InputBox } from './InputBox'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'
import { ChatMessageList } from './ChatMessageList'
import { ChatHeader } from './ChatHeader'

const InputDiv = styled.div`
    height: 22vh;
    width: 100%;
    padding: 3px 25px;
    background: white;
    border-top-style:solid; 
    border-width: 1px;
    border-color: lightGrey;`

const OutputDiv = styled.div`
    height:78vh;`

const OutputInnerDiv = styled.div`
    height: calc(100% - 61px);`

const MsgDiv = styled.div`  
    margin:0px -3px;`

const Output = sizeMe({ monitorHeight: true })(props =>
    <OutputInnerDiv>
        <ChatHeader {...props} />
        <MsgDiv>
            <ChatMessageList {...props} />
        </MsgDiv>
    </OutputInnerDiv>);

/**
 * 聊天组件
 */
export const Chat = () => <div>
    <OutputDiv>
        <Output />
    </OutputDiv>
    <InputDiv>
        <InputBox />
    </InputDiv>
</div>
