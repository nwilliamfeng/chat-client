import React from 'react'
import { messageContentType } from '../constants'
import { messageContentRender, renderTextContent, renderImageContent } from './MessageContentRender'
import MessageHelper from '../messageHelper'
import ImageZoom from 'react-medium-image-zoom'
import { ContextMenuTrigger } from "react-contextmenu"
import { MSGLST_CONTEXTMENU_IMAGE_ID, MSGLST_CONTEXTMENU_TEXT_MSG_ID, MSGLST_CONTEXTMENU_FILE_ID } from './withMessageList'
import styled from 'styled-components'
import {MessageTime,MessageSender,Avata} from './Parts'
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


const contentStyle = {
    wordWrap: 'break-word',
    marginBottom: 20,
    textAlign: 'left',
    border: '1px solid #eee',
    marginLeft: 50,
}



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

const ImageDiv=styled.div`padding:10px;`


const fileNameStyle = {
    display: 'table-cell',
    wordWrap: 'break-word',
    textAlign: 'top',
    width: 150,

    verticalAlign: 'text-top',
    maxWidth: 150,
    //  textOverflow: 'ellipsis',
    // overflow: 'hidden',
    //   whiteSpace: 'nowrap',
}


const fileLogoContainerStyle = {
    display: 'table-cell',
    padding: 5,
}

const TextContent = renderTextContent(props => <div {...props}/>)


const ImgContent =renderImageContent(props=><ImageDiv {...props}/>);


const renderContent = (content) => {
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
                    <div className='rbubble' style={contentStyle}>
                        <TextContent content={content} />
                    </div>
                </ContextMenuTrigger>
            );
        case messageContentType.Picture: //处理图片消息
            return (<ImgContent content={content}/>
 

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
    const { MessageContent, AvataUrl, SendTime, SenderName } = message;
    return (
        <Container>
            <AvataContainer>
                <Avata src={AvataUrl}/>
            </AvataContainer>
            <div>
                <span><MessageTime value={SendTime}/><MessageSender color='blue'>{SenderName}</MessageSender></span>
                {renderContent(MessageContent)}
            </div>
        </Container>
    )
}


