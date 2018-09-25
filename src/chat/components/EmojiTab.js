import React from 'react';
import PropTypes  from 'prop-types';
import { defaultEmojiMapping } from '../defaultEmojiMapping';
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile as farSmile } from '@fortawesome/free-regular-svg-icons';
require('../../assets/styles/button.css');


//样式
const styles = {
    emojiTab: {
        padding: 0,
        marginTop: -20,
        width: 442,
    },

    emojiTabPanel: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },

    emojiTabHeader: {
        background: '#F5F5F5',
        padding: 0,
        marginRight: -10,
        marginLeft: -10,
        marginTop: 10,
    },

    emojiImg: {
        width: 24,
    }
};


//绘制单个表情
const Emoji = ({ emojiKey, onSelect }) => {
    const { imgSrc, description, character } = defaultEmojiMapping.getEmoji(emojiKey);
    const onClick = () => onSelect(character);
    return (
        <button key={emojiKey} className='emoji-btn' onClick={onClick}>
            <img src={imgSrc} style={styles.emojiImg} title={description} />
        </button>
    )
}

Emoji.propTypes={
    emojiKey:PropTypes.string.isRequired,
    onSelect:PropTypes.func.isRequired,
}


//绘制表情行
const EmojiRow = ({ rowIdx, cols, onSelect }) => {
    const emojis = defaultEmojiMapping.getAllEmojis();
    let arr = [];
    for (let i = 0; i < cols; i++) {
        const emoji = emojis[cols * rowIdx + i];
        if (emoji != null) {
            const { masks } = emoji;
            arr.push(masks);
        }
    }
    return (
        <div>
            {arr.map(key => <Emoji key={key} emojiKey={key} onSelect={onSelect} />)}
        </div>

    )
}

EmojiRow.propTypes={
    rowIdx: PropTypes.number.isRequired,
    cols:PropTypes.number.isRequired,
    onSelect:PropTypes.func.isRequired,
}

/**
 * 表情table
 * 
 */
const EmojiTable = ({ close, onSelect }) => {
    const doSelect = key => {
        close();
        onSelect(key);
    }
    const emojis = defaultEmojiMapping.getAllEmojis();
    const cols = 15;
    const rows = Math.ceil(emojis.length / cols);
    let result = [];
    for (let i = 0; i < rows; i++) {
        result.push(
            <div key={i}>
                <EmojiRow rowIdx={i} cols={cols} onSelect={doSelect} />
            </div>
        );
    }
    return result;
}

EmojiTable.propTypes={
    close:PropTypes.func.isRequired,
    onSelect:PropTypes.func.isRequired,
}

/**
 * 绘制表情输入框
 * @param {*} onSelect 
 */
export const EmojiPanel = ({ onSelect }) => {
    //todo-- 默认只加了qq表情，之后如有扩展需要实现button的style关联状态
    return (<Popup
        trigger={<label title='表情' className="label-toolbar"> <FontAwesomeIcon icon={farSmile} size='lg' /></label>}
        position='top center'
        closeOnDocumentClick
        contentStyle={styles.emojiTab}
        offsetY={-20}>
        {close => (
            <div style={styles.emojiTabPanel}>
                <EmojiTable close={close} onSelect={onSelect} />
                <div style={styles.emojiTabHeader}>
                    <button className='emoji-category-btn'>默认</button>
                </div>
            </div>
        )}
    </Popup>)
}


EmojiPanel.propTypes={
    onSelect: PropTypes.func.isRequired,
}


