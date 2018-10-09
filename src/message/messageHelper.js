import { messageContentType } from '../message/constants';
 

export default class MessageHelper {
    /**
     * 返回指定的消息内容对应的类型
     * @param {string} msgContent 
     */
    static getMessageContentType(msgContent) {
        if(msgContent==null){
            return messageContentType.UNKONWN;
        }
        if(typeof msgContent!=='string'){
            return messageContentType.System;
        }
        msgContent=msgContent.toString();
        if (msgContent.startsWith('{Url:http://') && msgContent.endsWith(',UrlEnd:UrlEnd}')) {
            if (msgContent.indexOf(',ThumbUrl:') > 0) {
                return MessageHelper.getThumbImg(msgContent).length > 0 ? messageContentType.Picture : messageContentType.File;
            }
        }
        return messageContentType.Text;
    }

   
    /**
     * 返回指定消息内容里的缩略图文件路径
     * @param {string} msgContent 
     * @returns {string}
     */
    static getThumbImg(msgContent) {
        const arrs = msgContent.split(',');
        return arrs[arrs.length - 2].replace('ThumbUrl:', '');
    }


    /**
     * 返回指定消息内容里的文件名称
     * @param {string} msgContent 
     * @returns {string}
     */
    static getFileName(msgContent) {
        const arrs = msgContent.split(',');
        return decodeURIComponent(arrs[arrs.length - 3].replace('FileName:', ''));
    }

    /**
     * 返回指定消息内容里的文件完整路径
     * @param {string} msgContent 
     * @returns {string}
     */
    static getFullFileName(msgContent) {
        const arrs = msgContent.split(',');
        return arrs[0].replace('{Url:', '');
    }

}