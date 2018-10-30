import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { defaultEmojiMapping } from '../../util/defaultEmojiMapping'
import Popup from "reactjs-popup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile as farSmile } from '@fortawesome/free-regular-svg-icons'

/**
 * 表情类别按钮
 */
const EmojiCategoryButton = styled.button`
    padding: 10px;    
    border: 0px solid transparent;
    background: white;
    outline: none;`

//样式
const emojiTabStyle = {
    padding: 0,
    marginTop: -20,
    width: 442,
}

/**
 * 表情按钮
 */
const EmojiButton = styled.button`
    padding: 2px;    
    border: 0px solid transparent;
    background: transparent;
    color: transparent;
    outline: none;
    &:hover{
        color:white;
        background-color:#F5F5F5;
     };`

const EmojiImg = styled.img`width:24px;`

const EmojiTabPanel = styled.div`
    padding:10px 10px 0px 10px;`

const EmojiTabHeader = styled.div`
    background: #F5F5F5;
    padding: 0px;
    margin:10px -10px 0px -10px;`

//绘制单个表情
const Emoji = ({ emojiKey, onSelect }) => {
    const { imgSrc, description, character } = defaultEmojiMapping.getEmoji(emojiKey);
    const onClick = () => onSelect(character);
    return <EmojiButton key={emojiKey} onClick={onClick}>
        <EmojiImg src={imgSrc} title={description} />
    </EmojiButton>
}

Emoji.propTypes = {
    emojiKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

//绘制表情行
const EmojiRow = ({ rowIdx, cols, onSelect }) => {
    const emojis = defaultEmojiMapping.getAllEmojis()
    let arr = []
    for (let i = 0; i < cols; i++) {
        const emoji = emojis[cols * rowIdx + i]
        if (emoji != null) {
            const { masks } = emoji
            arr.push(masks)
        }
    }
    return <div>
        {arr.map(key => <Emoji key={key} emojiKey={key} onSelect={onSelect} />)}
    </div>
}

EmojiRow.propTypes = {
    rowIdx: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
}

/**
 * 弹出按钮
 */
const PopupLabel = styled.label`
    cursor: pointer;
    margin-right: 10px;
    color: grey;
    &:hover{
        color: #259425;
     };`

/**
 * 表情table
 * 
 */
const EmojiTable = ({ close, onSelect }) => {
    const doSelect = key => {
        close()
        onSelect(key)
    }
    const emojis = defaultEmojiMapping.getAllEmojis()
    const cols = 15
    const rows = Math.ceil(emojis.length / cols)
    let result = []
    for (let i = 0; i < rows; i++) {
        result.push(<div key={i}><EmojiRow rowIdx={i} cols={cols} onSelect={doSelect}/></div>)
    }
    return result
}

EmojiTable.propTypes = {
    close: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

/**
 * 绘制表情输入框
 * @param {*} onSelect 
 */
export const EmojiPanel = ({ onSelect }) => {
    //todo-- 默认只加了qq表情，之后如有扩展需要实现button的style关联状态
    return <Popup
        trigger={<PopupLabel title='表情'> <FontAwesomeIcon icon={farSmile} size='lg' /></PopupLabel>}
        position='top center'
        closeOnDocumentClick
        contentStyle={emojiTabStyle}
        offsetY={-20}>
        {close => <EmojiTabPanel>
            <EmojiTable close={close} onSelect={onSelect} />
            <EmojiTabHeader>
                <EmojiCategoryButton >默认</EmojiCategoryButton>
            </EmojiTabHeader>
        </EmojiTabPanel>}
    </Popup>
}

EmojiPanel.propTypes = {
    onSelect: PropTypes.func.isRequired,
}


