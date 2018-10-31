import React from 'react'
import { messageContentType } from '../constants'
import { renderTextContent } from './renderTextContent'
import { renderFileContent } from './renderFileContent'
import { renderImageContent } from './renderImgContent'
import MessageHelper from '../messageHelper'
import styled from 'styled-components'
import { MessageTime, MessageSender, Avata } from './Parts'
 

/**
 * 容器Div
 */
const Container = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    text-align: right;
    padding-top: 8px;`

/**
 * 头像容器
 */
const AvataContainer = styled.div`padding-left: 15px;`

const TextContentDiv = styled.div`
    word-wrap: break-word;
    text-align: left;
    border: 1px solid #eee;     
    position: relative;
    padding: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    
    background: #9EEA6A;
    &:after {
        content: "";
        position: absolute;
        top: 10px;
        right: -7px;
        border-style: solid;
        border-width: 5px 0 5px 7px;
        border-color: transparent lightgreen;
        width:0px;
        z-index: 1;
    }
    &:hover{
        background:#98E165;
    } `

const TextContent = renderTextContent(props => <TextContentDiv {...props} />)

const ImgContent = renderImageContent(props => <div {...props} />)

const FileDiv = styled.div`
    margin-bottom: 10px;
    text-align:left;
    border: 1px solid #eee;
    padding: 10px;
    background:white;
    cursor: pointer;`

const ContentDiv=styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-end;
`

const FileContent = renderFileContent(props => <FileDiv {...props} />)

/**
 * 客服消息
 * @param {*} param0 
 */
export const StaffMessage = ({ message }) => {
    const { MessageContent, AvataUrl, SendTime, SenderName } = message
    const contentType = MessageHelper.getMessageContentType(MessageContent)
    return <Container>
        <AvataContainer>
            <Avata src={AvataUrl} />
        </AvataContainer>
        <ContentDiv>
            <span><MessageTime value={SendTime} /><MessageSender color='blue'>{SenderName}</MessageSender></span>
            {contentType === messageContentType.Text && <TextContent content={MessageContent} />}
            {contentType === messageContentType.Picture && <ImgContent content={MessageContent} />}
            {contentType === messageContentType.File && <FileContent content={MessageContent} />}
        </ContentDiv>
    </Container>

}


