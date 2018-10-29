import React from 'react'
import { messageContentType } from '../constants'
import { renderTextContent } from './renderTextContent'
import { renderFileContent } from './renderFileContent'
import { renderImageContent } from './renderImgContent'
import MessageHelper from '../messageHelper'
import styled from 'styled-components'
import { MessageTime, MessageSender, Avata } from './Parts'
require('../../assets/styles/bubble.css')

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
    margin-bottom: 20px;
    text-align: left;
    border: 1px solid #eee;
    margin-left: 50px;`

const TextContent = renderTextContent(props => <TextContentDiv {...props} />)

const ImgContent = renderImageContent(props => <div {...props} />)

const FileDiv = styled.div`
    margin-bottom: 20px;
    text-align: left;
    border: 1px solid #eee;
    padding: 10px;
    cursor: pointer;`

const FileContent = renderFileContent(props => <FileDiv {...props} />)

/**
 * 客服消息
 * @param {*} param0 
 */
export const StaffMessage = ({ message }) => {
    const { MessageContent, AvataUrl, SendTime, SenderName } = message;
    const contentType = MessageHelper.getMessageContentType(MessageContent);
    return <Container>
        <AvataContainer>
            <Avata src={AvataUrl} />
        </AvataContainer>
        <div>
            <span><MessageTime value={SendTime} /><MessageSender color='blue'>{SenderName}</MessageSender></span>
            {contentType === messageContentType.Text && <TextContent content={MessageContent} className='rbubble' />}
            {contentType === messageContentType.Picture && <ImgContent content={MessageContent} />}
            {contentType === messageContentType.File && <FileContent content={MessageContent} className='rbubble' />}
        </div>
    </Container>

}


