import React from 'react'
import styled from 'styled-components'
import File_Txt_Img from '../../assets/imgs/txt.png'
import File_Word_Img from '../../assets/imgs/word.png'
import File_Unknown_Img from '../../assets/imgs/unknown.png'
import MessageHelper from '../messageHelper'
import { ContextMenuTrigger } from "react-contextmenu"
import { MSGLST_CONTEXTMENU_FILE_ID } from './withMessageList'
require('../../assets/styles/bubble.css')

const FileName=styled.div`
    display:table-cell;
    word-wrap:break-word;
    text-align:top;
    width:150px;
    vertical-align:text-top;
    max-width:150px;`

const FileLogoDiv = styled.div`
    display: table-cell;
    padding: 5px;`


const getFileImgSrc = fileName=> {
    const arrs = fileName.split('.');
    const extension = arrs[arrs.length - 1].toLowerCase();
    switch (extension) {
        case 'txt':
            return File_Txt_Img;
        case 'docx':
        case 'doc':
            return File_Word_Img;
        default:
            return File_Unknown_Img;
    }
}

/**
 * 绘制文件消息内容
 * @param {*} Component 
 */
export const renderFileContent = Component => props => {
    const { content } = props
    const downloadFile = () => {
        const url = MessageHelper.getFullFileName(content)
        window.open(url)
    }
    const fileLogo=getFileImgSrc(MessageHelper.getFileName(content))
    const fileName=MessageHelper.getFileName(content)
    return <ContextMenuTrigger id={MSGLST_CONTEXTMENU_FILE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
        <Component onClick={downloadFile}>
            <FileName>{fileName}</FileName>          
            <FileLogoDiv> <img src={fileLogo} alt=''></img></FileLogoDiv>
        </Component>
    </ContextMenuTrigger>
}