import React from 'react';
import styled from 'styled-components';
import { messageContentType } from '../constants';
import {  renderTextContent } from './MessageContentRender';
import ImageZoom from 'react-medium-image-zoom';
import MessageHelper from '../messageHelper';
import {MessageTime,MessageSender} from './Parts'


require('../../assets/styles/bubble.css');
 
const avatarContainerStyle = {
    display: 'table-cell',
    paddingRight: 15,
}

const avatarStyle = {
    width: 42,
    height: 42,
    marginTop: 5,
}

 

const senderStyle = {
    fontSize: 12,
    color: 'gray',
}

const bodyStyle = {
    display: 'table-cell',
}

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
`;



const TextContent = renderTextContent(props => <LeftBubbleDiv>{props.children}</LeftBubbleDiv>);



const renderContent = (content) => {
    const contentType = MessageHelper.getMessageContentType(content);
    switch (contentType) {
        case messageContentType.Text:
            return <TextContent content={content} />
        case messageContentType.Picture:
            return <ImageZoom
                        image={{
                            src: MessageHelper.getThumbImg(content),
                            style: { maxWidth: '180px' }
                        }}
                        zoomImage={{
                            src: MessageHelper.getFullFileName(content),
                        }}/>

        default:
            return (<div>{'无法识别的消息内容:' + content}</div>)
    }
}


export const CustomerMessage = ({ message }) => {
    const { MessageContent, AvataUrl ,SenderName,SendTime} = message;
    return (
        <div className="louter"  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={AvataUrl} />
            </div>
            <div style={bodyStyle}>
                <div>
                    <span><MessageSender>{SenderName}</MessageSender><MessageTime value={SendTime}/></span>
                </div>
                {renderContent(MessageContent)}
            </div>
        </div>
    )
}




