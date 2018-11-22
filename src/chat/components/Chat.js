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

const OutputDiv = styled.div`
    padding:0px 2px; 
    height:100%;`


const Output = sizeMe({ monitorHeight: true })(props => <ChatMessageList {...props} />)

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
    <ChatHeader />
    <HorizontalSplit size={'75%'} minSize={300}>
        <OutputDiv>
            <Output />
        </OutputDiv>

        <InputDiv>
            <InputBox />
        </InputDiv>
    </HorizontalSplit>
</Container>

