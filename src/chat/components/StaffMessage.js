import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appContext, util } from '../../util';
import { chatActions } from '../actions';
import {renderMessageContent} from './messageContentRender';
require('../../assets/styles/bubble.css');



const containerStyle = {
    display: 'block',
    clear: 'right',
    textAlign: 'right'
}

const avatarContainerStyle = {
    float: 'right',
    paddingLeft: 15,
}

const avatarStyle = {
    width: 42,
    height: 42,
    marginTop: 5,

}


const sendTimeStyle = {
    color: 'gray',
    fontSize: 12,
}

const senderStyle = {
    color: 'blue',
    marginLeft: 10,
    fontSize: 12,
}

const bodyStyle = {
    float: 'right',
    clear: 'left',
}

const contentStyle = (width) => ({
    maxWidth: width ? width : 500,
    wordWrap: 'break-word',
    marginBottom: 20,
    textAlign: 'left'
})


// const renderMessageContent = (content) => {
//     const contentType = messageService.getMessageContentType(content);
//     switch (contentType) {
//         case messageContentType.Text:
//             return (
//                 <div> {content}</div>
//             );
//         case messageContentType.Picture:
//             return (
//                  <img src={messageService.getThumbImg(content) } alt=''></img>
//             );
//         default:
//             return(<div>{'无法识别的消息内容:'+content}</div>)
//     }

// }


export const StaffMessage = ({ message, width }) => {
    const { MessageContent } = message;
    return (
        <div style={containerStyle}  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={require('../../assets/imgs/staff.jpg')} />
            </div>
            <div style={bodyStyle}>
                <div>
                    <span style={sendTimeStyle}>{'[' + util.csharpDateFormat(message.SendTime, 'MM-dd hh:mm:ss') + ']'}<span style={senderStyle}>{message.SenderName}</span></span>
                </div>
                <div className="rbubble" style={contentStyle(width)}>
                    {renderMessageContent(MessageContent)}
                </div>
            </div>
        </div>
    )
}



