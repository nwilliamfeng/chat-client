import React from 'react';
import styled from 'styled-components';
import { util } from '../../util';
import File_Txt_Img from '../../assets/imgs/txt.png';
import File_Word_Img from '../../assets/imgs/word.png';
import File_Unknown_Img from '../../assets/imgs/unknown.png';
import { defaultEmojiMapping } from '../../util/defaultEmojiMapping';
require('../../assets/styles/bubble.css');

const EmojiImg = styled.img`
    width:${props => props.isSmall === true ? '14px' : '24px'};
    margin-top:${props => props.isSmall === true ? '-2px' : '0px'};
`;

const TxtContentDiv = styled.div`
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    display: inline-block ;
    max-width: 75px;
     width:75px;
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



    /**
     * 解析消息内容项，包括文本，表情
     * @param {*} item 
     */
    _renderMsgContentItem(item, isSmallEmoji = false) {
        if (item == null) {
            return <span></span>
        }
        const isEmoji = item.startsWith('[:');
        if (isEmoji) {
            const emoji = defaultEmojiMapping.getEmoji(item);
            if (emoji !== null) {
                const { imgSrc } = emoji;

                return <EmojiImg src={imgSrc} isSmall={isSmallEmoji} />


            }
        }
        return item;

    }


    /**
     * 呈现普通消息内容，包括普通文本消息、表情符号，暂时不解析图片
     * @param {*} msgContent 
     */
    renderTextContent(msgContent, isSmallEmoji = false) {
        const items = defaultEmojiMapping.splitWithEmojis(msgContent);
        return (
            <TxtContentDiv>
                {items.map((item) => (
                    this._renderMsgContentItem(item, isSmallEmoji)
                ))}
            </TxtContentDiv>
        )
    }

    /**
     * 返回指定时间的呈现结果
     * @param {string} csharpTime 
     */
    // renderSendTime(csharpTime) {
    //     const time = new Date(Date.parse(util.csharpDateFormat(csharpTime)));

    //     if (time.getTime()>=util.today().getTime()) {
    //         return '[' + util.dateFormat(time, 'hh:mm:ss') + ']';
    //     }
    //     return '[' + util.dateFormat(time, 'M月d日 hh:mm:ss') + ']';
    // }

    renderSendTime(time) {

        if (time.getTime() >= util.today().getTime()) {
            return '[' + util.dateFormat(time, 'hh:mm:ss') + ']';
        }
        return '[' + util.dateFormat(time, 'M月d日 hh:mm:ss') + ']';
    }
}

export const messageContentRender = new MessageContentRender();


const MessageContentItem = ({item, isSmallEmoji}) => {
    if (item == null) {
        return <span></span>
    }
    const isEmoji = item.startsWith('[:');
    if (isEmoji) {
        const emoji = defaultEmojiMapping.getEmoji(item);
        if (emoji !== null) {
            const { imgSrc } = emoji;

            return <EmojiImg src={imgSrc} isSmall={isSmallEmoji} />


        }
    }
    return item;

}

export const WithMessageContent = (Component) =>  class extends React.Component {

          
        render() {
            console.log(this.props);
            return <div style={{width:200,height:300,background:'red'}}></div>
        //     const {content} =this.props;
        //     const items = defaultEmojiMapping.splitWithEmojis(content);
        //   return  <Component>
        //         {items.map(item => (
        //             <MessageContentItem item={item} isSmallEmoji={true}/> 
        //         ))}
        //     </Component>
        }
   

}

