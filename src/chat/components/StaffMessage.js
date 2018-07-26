import React, { Component } from 'react';
import { messageContentType } from '../constants';
import { messageContentRender } from './MessageContentRender';
import MessageHelper from '../messageHelper';
import { chatWindow } from '../chatRegionHelper';
import ImageZoom from 'react-medium-image-zoom';
import { ContextMenuTrigger } from "react-contextmenu";
import { MSGLST_CONTEXTMENU_IMAGE_ID, MSGLST_CONTEXTMENU_TEXT_MSG_ID,MSGLST_CONTEXTMENU_FILE_ID } from './MessageList';
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

const contentStyle = (width) => ({
    maxWidth: width,
    wordWrap: 'break-word',
    marginBottom: 20,
    textAlign: 'left',
    border: '1px solid #eee',

})

const file_contentStyle = {
    marginBottom: 20,
    textAlign: 'left',
    border: '1px solid #eee',
    padding: 10,
    cursor: 'pointer',

}

const imgStyle = {
    // maxWidth: width,
    // maxHeight: '25%',
    // marginBottom: 15,
    // border: '1px solid #eee',
    // borderRadius: 5,
    padding: 10,
}

const fileNameStyle = {
    display: 'table-cell',
    wordWrap: 'break-word',

    width: 150,
    paddingTop: -30,
    // verticalAlign: 'top',
    maxWidth: 150,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}


const fileLogoContainerStyle = {
    display: 'table-cell',

}



const renderContent = (content) => {
    const width = chatWindow.width * 0.6;
    const contentType = MessageHelper.getMessageContentType(content);
    //下载文件
    const downloadFile = () => {
        const url = MessageHelper.getFullFileName(content);
        window.open(url);
       // https://61.152.230.122:9090/CS2/Common/images/emotion_qq/5.gif
    }


    const dd=()=>{
     ?? return https://61.152.230.122:9090/CS2/Common/images/emotion_qq/5.gif
    }



    switch (contentType) {
        case messageContentType.Text:
            return (
                <ContextMenuTrigger id={MSGLST_CONTEXTMENU_TEXT_MSG_ID} attributes={{ content: content }}>
                    <div className='rbubble' style={contentStyle(width)}>
                        {content}
                    </div>
                </ContextMenuTrigger>
            );
        case messageContentType.Picture:

            return (

                <ContextMenuTrigger id={MSGLST_CONTEXTMENU_IMAGE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
                    <div style={imgStyle}>
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
                </ContextMenuTrigger>

            );
        case messageContentType.File:
            return (
                <ContextMenuTrigger id={MSGLST_CONTEXTMENU_FILE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
                    <div className='rbubble_file' style={file_contentStyle} onClick={downloadFile}>
                        <div style={fileNameStyle}>
                            {decodeURIComponent(MessageHelper.getFileName(content))}
                        </div>
                        <div style={fileLogoContainerStyle}>
                            <img src={messageContentRender.getFileImgSrc(MessageHelper.getFileName(content))} alt=''></img>
                        </div>
                    </div>
                </ContextMenuTrigger>
            );
        default:
            return (<div>{'无法识别的消息内容:' + content}</div>)
    }
}



export const StaffMessage = ({ message }) => {
    const { MessageContent } = message;

    return (
        <div style={containerStyle}  >
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


