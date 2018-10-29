import React from 'react'
import styled from 'styled-components'
import { defaultEmojiMapping } from '../../util/defaultEmojiMapping'
import { ContextMenuTrigger } from "react-contextmenu"
import { MSGLST_CONTEXTMENU_TEXT_MSG_ID} from './withMessageList'
require('../../assets/styles/bubble.css')

/**
 * 表情图
 */
const EmojiImg = styled.img`
    width:${props => props.emojiSize ? `${props.emojiSize}px` : '24px'};
    margin-top:${props => props.emojiSize ? '-2px' : '0px'};
`;


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
 * 绘制文本消息内容
 * @param {*} Component 
 */
export const renderTextContent = Component => props => {
    const { content, emojiSize } = props
    const items = defaultEmojiMapping.splitWithEmojis(content)
    return <ContextMenuTrigger id={MSGLST_CONTEXTMENU_TEXT_MSG_ID} attributes={{ content: content }}>
        <Component {...props}>
            {items.map((item, index) => <MessageContentItem item={item} emojiSize={emojiSize} key={index} />)}
        </Component>
    </ContextMenuTrigger>
}


