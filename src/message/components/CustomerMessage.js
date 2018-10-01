import React from 'react';
import styled from 'styled-components';
import { messageContentType } from '../constants';
import { messageContentRender, withMessageContent } from './MessageContentRender';
import ImageZoom from 'react-medium-image-zoom';
import MessageHelper from '../messageHelper';


require('../../assets/styles/bubble.css');



// const imgMsgSample = {
//     ChannelID: 5356283611374137403,
//     MsgId: 5174262130321659459,
//     Content: {
//         "Extension": "zxkf_001",
//         "Content": "{Url:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,FileName:logo2.png,ThumbUrl:http://61.129.129.189:7480/ZrhdWZaXSB/a12abba937274dd5ab71bad4f929136clogo2.png,UrlEnd:UrlEnd}"
//     }
// }

// const txtMsgSample = {
//     ChannelID: 3002,
//     MsgId: 5085252487365133580,
//     Content: { "Extension": "zxkf_001", "Content": "abc", "SenderID": "3002", "ID": "9f6c2d09-4095-4968-b572-1700fc53f745", "SenderName": "???", "ChannelID": "5356283611374137403" }
// }

//   const fileMsgSample={
//    content: '{Url:http://61.129.129.189:7480/ZrhdWZaXSB/1e4670f4-6753-4736-a397-346fa21dcfb120180401210453921.docx,FileName:test.docx,ThumbUrl:,UrlEnd:UrlEnd}'
//   }

// const historyMsgSample =
//     {
//         ChannelId: null,
//         MessageContent: "345",
//         MsgId: "4709406645084376307",
//         QuestionId: null,
//         SendTime: "/Date(1521641788097)/",
//         Sender: "19014FB9C306EE40",
//         SenderID: null,
//         SenderName: "匿名",
//         Type: 1,
//     }

const avatarContainerStyle = {
    display: 'table-cell',
    paddingRight: 15,
}

const avatarStyle = {
    width: 42,
    height: 42,
    marginTop: 5,
}

const sendTimeStyle = {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10,
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
    max-width: 80%;
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



const TextContent = withMessageContent(props => <LeftBubbleDiv>{props.children}</LeftBubbleDiv>);



const renderContent = (content) => {
    const contentType = MessageHelper.getMessageContentType(content);
    switch (contentType) {
        case messageContentType.Text:
            return (
                <TextContent content={content} />
            );
        case messageContentType.Picture:
            return (
                <div>
                    <ImageZoom
                        image={{
                            src: MessageHelper.getThumbImg(content),
                            style: { maxWidth: '180px' }
                        }}
                        zoomImage={{
                            src: MessageHelper.getFullFileName(content),
                        }}
                    />
                </div>
            );

        default:
            return (<div>{'无法识别的消息内容:' + content}</div>)
    }
}


export const CustomerMessage = ({ message }) => {
    const { MessageContent, AvataUrl } = message;
    return (
        <div className="louter"  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={AvataUrl} />
            </div>
            <div style={bodyStyle}>
                <div>
                    <span style={senderStyle}>{message.SenderName}<span style={sendTimeStyle}>{messageContentRender.renderSendTime(message.SendTime)}</span></span>
                </div>
                {renderContent(MessageContent)}
            </div>
        </div>
    )
}




