import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons'
import { EmojiPanel } from './EmojiTab'
import PropTypes from 'prop-types'
require('../../assets/styles/button.css')
require('../../assets/styles/scrollbar.css')
require('../../assets/styles/input-box.css')


//样式集
const styles = {
    input: {
        display: 'none',
    },

    toolbar: {
        padding: 5,
        paddingLeft: 0,
    },

};

const ToolbarDiv = styled.div`
    padding: 5px;
    padding-left:0px;`

const Input=styled.input`display:none;`

/**
  * 点击发送图片按钮时触发
  */
const onClickSelectImage = e => e.target.value = null //必须将value置空，否则无法选择相同的文件


/**
 * 输入框工具栏
 * @param {*} param0 
 */
export const Toolbar = ({ onSelectEmoji, onSelectImage }) => {
    return <ToolbarDiv >
        <EmojiPanel onSelect={onSelectEmoji} />
        <label htmlFor="uploadPhoto" title="发送图片" className="label-toolbar"> <FontAwesomeIcon icon={farImage} size='lg' /></label>
        <Input id="uploadPhoto" type='file' style={styles.input} onClick={onClickSelectImage} onChange={onSelectImage} accept="image/*" />
        <label htmlFor="uploadFile" title="发送文件" className="label-toolbar"> <FontAwesomeIcon icon={farFolder} size='lg' /></label>
        <Input type='file' id="uploadFile" style={styles.input} accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
    </ToolbarDiv>
}

Toolbar.propTypes = {
    onSelectEmoji: PropTypes.func.isRequired,
    onSelectImage: PropTypes.func.isRequired,
}

