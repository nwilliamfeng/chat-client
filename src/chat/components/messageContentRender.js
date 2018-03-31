import React, { Component } from 'react';
import { messageService } from '../api';
import { messageContentType } from '../constants';



const imgStyle=(width)=>({

    maxWidth:width-30,
    maxHeight:width-30,
})

export const renderMessageContent = (content,width) => {
    const contentType = messageService.getMessageContentType(content);
    switch (contentType) {
        case messageContentType.Text:
            return (
                <div> {content}</div>
            );
        case messageContentType.Picture:
            return (
                 <img src={messageService.getThumbImg(content) } style={imgStyle(width)} alt=''></img>
            );
        default:
            return(<div>{'无法识别的消息内容:'+content}</div>)
    }

}