import React, { Component } from 'react';
import { messageService } from '../api';
import { appContext, util } from '../../util';
import { messageContentType } from '../constants';
require('../../assets/styles/bubble.css');


const imgStyle = (width) => ({

    maxWidth: width - 30,
    maxHeight: width - 30,
    marginBottom: 15,
    border: '1px solid #eee',
    borderRadius: 5,
})

class MessageContentRender {

    /**
     * 根据内容返回对应的呈现结果
     * @param {string} content 
     * @param {number} width 
     * @param {string} className 
     * @param {*} bubbleStyle 
     */
    renderContent(content, width, className, bubbleStyle) {
        const contentType = messageService.getMessageContentType(content);
        switch (contentType) {
            case messageContentType.Text:
                return (
                    <div className={className} style={bubbleStyle}>
                        {content}
                    </div>
                );
            case messageContentType.Picture:
                return (
                    <img src={messageService.getThumbImg(content)} style={imgStyle(width)} alt=''></img>
                );
            case messageContentType.File:
                return (
                    <div>
                        <div style={{ display: 'table-cell' }}>
                            {'adfadfasdfasdf'}
                        </div>
                        <div style={{ display: 'table-cell' }}>
                            <img src={this.getFileImgSrc(messageService.getFileName(content))} alt={messageService.getFileName(content)}></img>
                        </div>

                    </div>

                );
            default:
                return (<div>{'无法识别的消息内容:' + content}</div>)
        }
    }


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

        if (time.getFullYear() === new Date().getFullYear()) {
            return '[' + util.dateFormat(time, 'hh:mm:ss') + ']';
        }
        return '[' + util.dateFormat(time, 'MM-dd hh:mm:ss') + ']';
    }
}

export const messageContentRender = new MessageContentRender();

