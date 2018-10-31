import React from 'react'
import styled from 'styled-components'
import { messageContentType } from '../constants'
import { renderTextContent } from './renderTextContent'
import { renderImageContent } from './renderImgContent'
import MessageHelper from '../messageHelper'
import { MessageTime, MessageSender, Avata } from './Parts'

const AvataContainer = styled.div`
    display:table-cell;
    padding-right:15px;`

const CAvata = styled(Avata)`margin-top: 30px;`

const ContentContainer = styled.div`display:table-cell;`

const LeftBubbleDiv = styled.div`
    position: relative;
    padding: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: white;
    display: inline-block;
    margin-bottom: 8px;
    word-wrap: break-word;
    border: 1px solid #eee;
    &:before{
        content: "";
        position: absolute;
        top: 10px;
        left: -8px;
        border-style: solid;
        border-width: 5px 7px 5px 0;
        border-color: transparent #eee;
        width: 0;
        z-index: 1;
    };  
    &:after{
        content: "";
        position: absolute;
        top: 10px;
        left: -6px;
        border-style: solid;
        border-width: 5px 7px 5px 0;
        border-color: transparent white;
        width: 0;
        z-index: 1;
    };
    &:hover{
        background:transparent;
    };`

const Container = styled.div`
    display: block;
    clear: right;/*clear float right*/
    margin-right: 60px;`

const TextContent = renderTextContent(props => <LeftBubbleDiv {...props} />)

const ImgContent = renderImageContent(props => <div {...props} />)

export const CustomerMessage = ({ message }) => {
    const { MessageContent, AvataUrl, SenderName, SendTime } = message;
    const contentType = MessageHelper.getMessageContentType(MessageContent);
    return <Container>
        <AvataContainer>
            <CAvata src={AvataUrl} />
        </AvataContainer>
        <ContentContainer>
            <div>
                <span><MessageSender>{SenderName}</MessageSender><MessageTime value={SendTime} /></span>
            </div>
            {contentType === messageContentType.Text && <TextContent content={MessageContent} />}
            {contentType === messageContentType.Picture && <ImgContent content={MessageContent} />}
        </ContentContainer>
    </Container>
}




