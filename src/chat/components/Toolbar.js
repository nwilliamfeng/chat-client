import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { EmojiPanel } from './EmojiTab';
import PropTypes from 'prop-types';
import { propTypes } from 'reactjs-popup';
require('../../assets/styles/button.css');
require('../../assets/styles/scrollbar.css');
require('../../assets/styles/input-box.css');

 
//样式集
const styles = {
    input: {
        display: 'none',
    },
   
    toolbar: {
        padding: 5,
    },
  
};
 
 /**
   * 点击发送图片按钮时触发
   */
const onClickSelectImage = e => e.target.value = null; //必须将value置空，否则无法选择相同的文件


/**
 * 输入框工具栏
 * @param {*} param0 
 */
export const Toolbar = ({onSelectEmoji,onSelectImage}) => {
    return (<div style={styles.toolbar} >
        <EmojiPanel onSelect={onSelectEmoji} />
        <label htmlFor="uploadPhoto" data-tip="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
        <input id="uploadPhoto" type='file' style={styles.input} onClick={onClickSelectImage} onChange={onSelectImage} accept="image/*" />
        <label htmlFor="uploadFile" data-tip="发送文件" className="label-toolbar"> <FontAwesomeIcon icon={farFolder} size='lg' /></label>
        <input type='file' id="uploadFile" style={styles.input} accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
        <ReactTooltip />
    </div>)
}

Toolbar.prototype={
    onSelectEmoji:PropTypes.func.isRequired,
    onSelectImage:PropTypes.func.isRequired,
}

