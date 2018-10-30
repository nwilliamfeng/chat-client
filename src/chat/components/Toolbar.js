import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage as farImage, faFolder as farFolder, } from '@fortawesome/free-regular-svg-icons'
import { EmojiPanel } from './EmojiTab'
import PropTypes from 'prop-types'

const ToolbarDiv = styled.div`
    padding: 5px;
    padding-left:0px;`

//display:none直接用在input上无效，只能用div包一层
const DisableDiv = styled.div`display:none;`

const Label = styled.label`
  cursor: pointer;
    margin-right: 10px;
    color: grey;
    &:hover{
        color: #259425;
    }`

/**
  * 点击发送图片按钮时触发
  */
const onClickSelectImage = e => e.target.value = null //必须将value置空，否则无法选择相同的文件

/**
 * 输入框工具栏
 * @param {*} param0 
 */
export const Toolbar = ({ onSelectEmoji, onSelectImage }) => <ToolbarDiv >
    <EmojiPanel onSelect={onSelectEmoji} />
    <Label htmlFor="uploadPhoto" title="发送图片"> <FontAwesomeIcon icon={farImage} size='lg' /></Label>
    <DisableDiv>
        <input id="uploadPhoto" type='file' onClick={onClickSelectImage} onChange={onSelectImage} accept="image/*" />
    </DisableDiv>
    <Label htmlFor="uploadFile" title="发送文件" > <FontAwesomeIcon icon={farFolder} size='lg' /></Label>
    <DisableDiv>
        <input type='file' id="uploadFile" accept=".xls,.xlsx,.doc,.docx,.txt,.pdf,.zip" />
    </DisableDiv>
</ToolbarDiv>

Toolbar.propTypes = {
    onSelectEmoji: PropTypes.func.isRequired,
    onSelectImage: PropTypes.func.isRequired,
}

