import React from 'react'
import styled from 'styled-components'
import { util } from '../../util'
import File_Txt_Img from '../../assets/imgs/txt.png'
import File_Word_Img from '../../assets/imgs/word.png'
import File_Unknown_Img from '../../assets/imgs/unknown.png'
import { defaultEmojiMapping } from '../../util/defaultEmojiMapping'
import MessageHelper from '../messageHelper'
import { ContextMenuTrigger } from "react-contextmenu"
import ImageZoom from 'react-medium-image-zoom'
import { MSGLST_CONTEXTMENU_IMAGE_ID, MSGLST_CONTEXTMENU_TEXT_MSG_ID, MSGLST_CONTEXTMENU_FILE_ID } from './withMessageList'
require('../../assets/styles/bubble.css')

const EmojiImg = styled.img`
    width:${props => props.emojiSize ? `${props.emojiSize}px` : '24px'};
    margin-top:${props => props.emojiSize ? '-2px' : '0px'};
`;


/**
 * 消息内容呈现类
 */
class MessageContentRender {

    /**
     * 
     * @param {string} fileName 
     */
    getFileImgSrc(fileName) {
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




    renderSendTime(time) {

        if (time.getTime() >= util.today().getTime()) {
            return '[' + util.dateFormat(time, 'hh:mm:ss') + ']';
        }
        return '[' + util.dateFormat(time, 'M月d日 hh:mm:ss') + ']';
    }
}

export const messageContentRender = new MessageContentRender();


const MessageContentItem = ({ item, emojiSize }) => {
    if (item == null) {
        return <span></span>
    }
    const isEmoji = item.startsWith('[:');
    if (isEmoji) {
        const emoji = defaultEmojiMapping.getEmoji(item);
        if (emoji !== null) {
            const { imgSrc } = emoji;
            return <EmojiImg src={imgSrc} emojiSize={emojiSize} />
        }
    }
    return item;

}

/**
 * 显示消息内容
 * @param {*} Component 
 */
export const renderTextContent = Component => props => {
    const { content, emojiSize } = props;
    const items = defaultEmojiMapping.splitWithEmojis(content);
    return <Component>
        {items.map((item, index) => <MessageContentItem item={item} emojiSize={emojiSize} key={index} />)}
    </Component>
}

export const renderTextContent2 = Component => props => {
    const { content, emojiSize } = props;
    const items = defaultEmojiMapping.splitWithEmojis(content);
    return <ContextMenuTrigger id={MSGLST_CONTEXTMENU_TEXT_MSG_ID} attributes={{ content: content }}>
        <Component {...props}>
            {items.map((item, index) => <MessageContentItem item={item} emojiSize={emojiSize} key={index} />)}
        </Component>
    </ContextMenuTrigger>
}

export const renderImageContent = Component => props => {
    const { content } = props
    return <ContextMenuTrigger id={MSGLST_CONTEXTMENU_IMAGE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
        <Component {...props}>
            <ImageZoom
                image={{
                    src: MessageHelper.getThumbImg(content),
                    style: { maxWidth: '180px' }
                }}
                zoomImage={{
                    src: MessageHelper.getFullFileName(content),
                }}
            />
        </Component>
    </ContextMenuTrigger>

}