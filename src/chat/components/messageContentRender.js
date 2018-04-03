import React, { Component } from 'react';
import { messageService } from '../api';
import { appContext, util } from '../../util';
import { messageContentType } from '../constants';
require('../../assets/styles/bubble.css');


 
class MessageContentRender {

     

    /**
     * 
     * @param {string} fileName 
     */
    getFileImgSrc(fileName) {
        const extension = fileName.split('.')[1].toLowerCase();
        switch (extension) {
            case 'txt':
                return require('../../assets/imgs/txt.png');
            case 'docx':
            case 'doc':
                return require('../../assets/imgs/word.png');
            default:
                return require('../../assets/imgs/unknown.png');
        }

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

