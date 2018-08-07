import React from 'react';
import {defaultEmojiMapping} from '../defaultEmojiMapping';
import {  util } from '../../util';
import File_Txt_Img from '../../assets/imgs/txt.png';
import File_Word_Img from '../../assets/imgs/word.png';
import File_Unknown_Img from '../../assets/imgs/unknown.png';
require('../../assets/styles/bubble.css');


/**
 * 消息内容呈现类
 */
class MessageContentRender {

    /**
     * 
     * @param {string} fileName 
     */
    getFileImgSrc(fileName) {
        const arrs=fileName.split('.');
        const extension =  arrs[arrs.length-1].toLowerCase() ;

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
     _renderMsgContentItem(item){
        if(item==null){
            return <div></div>
        } 
        const isEmoji=item.startsWith('[:');
        if(isEmoji){
            const emoji =defaultEmojiMapping.getEmoji(item);
            if(emoji!==null){
                return <img src={emoji.imgSrc}/>
            }                
        }     
        return  item;
               
    }

    
    /**
     * 呈现普通消息内容，包括普通文本消息、表情符号，暂时不解析图片
     * @param {*} msgContent 
     */
     renderTextContent(msgContent) {
        const items= defaultEmojiMapping.splitWithEmojis(msgContent);
        return (
            <div>
                 {items.map((item) => (
                     this._renderMsgContentItem(item)
                 ))}
            </div>
        )
    }

    /**
     * 返回指定时间的呈现结果
     * @param {string} csharpTime 
     */
    renderSendTime(csharpTime) {
        const time = new Date(Date.parse(util.csharpDateFormat(csharpTime)));
        
        if (time.getTime()>=util.today().getTime()) {
            return '[' + util.dateFormat(time, 'hh:mm:ss') + ']';
        }
        return '[' + util.dateFormat(time, 'M月d日 hh:mm:ss') + ']';
    }
}

export const messageContentRender = new MessageContentRender();
