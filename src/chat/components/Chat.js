import React from 'react'
import { InputBox } from './InputBox'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'
import { ChatMessageList } from './ChatMessageList'
import { ChatHeader } from './ChatHeader'
import { withSplit } from '../../controls'

const InputDiv = styled.div`
    height: 100%;
    padding: 3px 25px;
    background: white;
   
   `

const MsgDiv = styled(ChatMessageList)`  
    
    margin:0px 3px;`

const Output = sizeMe({ monitorHeight: true })(props =><MsgDiv {...props}/>)

const HorizontalSplit = withSplit(true)

const Container = styled.div`
        display:flex;
        flex-direction:column;
        height:100%;
        width:100%;`

/**
 * 聊天组件
 */
export const Chat = () => <Container>
    <ChatHeader  />
    <HorizontalSplit size={'75%'} minSize={300}>
        <Output />
        <InputDiv>
            <InputBox />
        </InputDiv>
    </HorizontalSplit>
</Container>

