import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageContentType } from '../constants';
import { chatActions } from '../actions';
import { messageContentRender } from './MessageContentRender';
import { messageService } from '../api';
import { appContext, util } from '../../util';
import sizeMe from 'react-sizeme';
import {chatWindow} from '../chatRegionHelper'
require('../../assets/styles/bubble.css');



const containerStyle = {
    display: 'block',
    clear: 'right',
    textAlign: 'right',
    
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

const contentStyle = (width)=>( {
     maxWidth:width ,
    wordWrap: 'break-word',
    marginBottom: 20,
    textAlign: 'left',
    border: '1px solid #eee',
   
} )

const file_contentStyle = {
    marginBottom: 20,
    textAlign: 'left',
    border: '1px solid #eee',
    padding:10,

}

const imgStyle = (width) => ({
    maxWidth: width,
    maxHeight: '25%',
    marginBottom: 15,
    border: '1px solid #eee',
    borderRadius: 5,
})

const fileNameStyle ={
    display: 'table-cell', 
    wordWrap: 'break-word',
 
    width:150,
    paddingTop:-30,
   // verticalAlign: 'top',
    maxWidth:150,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}

 
const fileLogoContainerStyle={
    display: 'table-cell', 
    
}

const renderContent=(content)=> {
    const width = chatWindow.width * 0.6 ;
    const contentType = messageService.getMessageContentType(content);
    switch (contentType) {
        case messageContentType.Text:
            return (
                <div className='rbubble' style={contentStyle(width) }>
                    {content}
                </div>
            );
        case messageContentType.Picture:
            return (
                <img src={messageService.getThumbImg(content)} style={imgStyle(width*0.5)} alt=''></img>
            );
        case messageContentType.File:
            return (
                <div className='rbubble_file' style={file_contentStyle}>
                    <div style={fileNameStyle}>
                   
                        {decodeURIComponent( messageService.getFileName(content))} 
                   
                    </div>
                    <div style={fileLogoContainerStyle}>
                        <img src={messageContentRender.getFileImgSrc(messageService.getFileName(content))} alt=''></img>
                    </div>
                </div>
            );
        default:
            return (<div>{'无法识别的消息内容:' + content}</div>)
    }
}



export const StaffMessage =({ message })=>{
    const { MessageContent } = message;

    return (
        <div style={containerStyle }  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={require('../../assets/imgs/staff.jpg')} />
            </div>
            <div style={bodyStyle}>
                <div>
                    <span style={sendTimeStyle}>{messageContentRender.renderSendTime(message.SendTime)}<span style={senderStyle}>{message.SenderName}</span></span>
                </div>
                {renderContent(MessageContent)}
            </div>
        </div>
    )
}
 

 