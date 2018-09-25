import React  from 'react';
import { messageContentType } from '../constants';
import { messageContentRender } from './MessageContentRender';
import MessageHelper from '../messageHelper';
import { chatWindow } from '../../util/chatRegionHelper';
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
    textAlign:'top',
    width: 150,
    
    verticalAlign: 'text-top',
    maxWidth: 150,
  //  textOverflow: 'ellipsis',
   // overflow: 'hidden',
 //   whiteSpace: 'nowrap',
}


const fileLogoContainerStyle = {
    display: 'table-cell', 
    padding:5,
}



const renderContent = (content) => {
    const width = chatWindow.width * 0.6;
    const contentType = MessageHelper.getMessageContentType(content);
    //下载文件
    const downloadFile = () => {
        const url = MessageHelper.getFullFileName(content);
        window.open(url);
    }

 
    switch (contentType) {
        case messageContentType.Text: //处理普通文本消息
            return (
                <ContextMenuTrigger id={MSGLST_CONTEXTMENU_TEXT_MSG_ID} attributes={{ content: content }}>
                    <div className='rbubble' style={contentStyle(width)}>
                        {messageContentRender.renderTextContent(content)} 
                    </div>
                </ContextMenuTrigger>
            );
        case messageContentType.Picture: //处理图片消息
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
        case messageContentType.File: //处理文本消息
            return (
                <ContextMenuTrigger id={MSGLST_CONTEXTMENU_FILE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
                    <div className='rbubble_file' style={file_contentStyle} onClick={downloadFile}>
                        <div style={fileNameStyle}>
                            {MessageHelper.getFileName(content)}
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
    const { MessageContent,AvataUrl } = message;

    return (
        <div style={containerStyle}  >
            <div style={avatarContainerStyle}>
                <img style={avatarStyle} src={AvataUrl} />
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


