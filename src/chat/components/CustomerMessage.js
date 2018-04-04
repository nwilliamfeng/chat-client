import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext, util } from '../../util';
import { messageContentType } from '../constants';
import { chatActions } from '../actions';
import { messageContentRender } from './messageContentRender';
import { messageService } from '../api';
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
    marginTop: 30,

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

// const file_contentStyle = {
//     marginBottom: 20,
//     textAlign: 'left',
//     border: '1px solid #eee',
//     padding:10,
// }

const imgStyle = (width) => ({
    maxWidth: width - 30,
    maxHeight: width - 30,
    marginBottom: 15,
    border: '1px solid #eee',
    borderRadius: 5,
})

// const fileNameStyle ={
//     display: 'table-cell', 
//     wordWrap: 'break-word',
//     width:150,
//     marginLeft:10 ,
// }

// const fileLogoContainerStyle={
//     display: 'table-cell', 
// }

const contentStyle = (width) => ({
    wordWrap: 'break-word',
    maxWidth: width ? width : window.innerWidth / 2,
    border: '1px solid #eee',
})

const renderContent=(content, width)=> {
    const contentType = messageService.getMessageContentType(content);
    switch (contentType) {
        case messageContentType.Text:
            return (
                <div className='lbubble' style={contentStyle(width)}>
                    {content}
                </div>
            );
        case messageContentType.Picture:
            return (
                <img src={messageService.getThumbImg(content)} style={imgStyle(width)} alt=''></img>
            );
        // case messageContentType.File:
        //     return (
        //         <div className='lbubble' style={file_contentStyle}>
        //             <div style={fileNameStyle}>
        //                 {decodeURIComponent( messageService.getFileName(content))}
        //             </div>
        //             <div style={fileLogoContainerStyle}>
        //                 <img src={messageContentRender.getFileImgSrc(messageService.getFileName(content))} alt=''></img>
        //             </div>
        //         </div>
        //     );
        default:
            return (<div>{'无法识别的消息内容:' + content}</div>)
    }
}


export const CustomerMessage = ({ message, width }) => {
    const { MessageContent } = message;
    return (
        <div className="louter"  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={require('../../assets/imgs/customer.jpg')} />
            </div>
            <div style={bodyStyle}>
                <div>
                    <span style={senderStyle}>{message.SenderName}<span style={sendTimeStyle}>{messageContentRender.renderSendTime(message.SendTime)}</span></span>
                </div>
                {renderContent(MessageContent, width)}
            </div>
        </div>
    )
}




