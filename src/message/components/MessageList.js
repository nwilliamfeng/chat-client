import React from 'react';
import { appContext } from '../../util';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CustomerMessage } from './CustomerMessage';
import { StaffMessage } from './StaffMessage';
import { ContextMenu, MenuItem } from "react-contextmenu";


const OuterDiv = styled.div`
    padding:5px;
`;

/**
 * 图片消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_IMAGE_ID = 'MSGLST_CONTEXTMENU_IMAGE';

/**
 * 文件消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_FILE_ID = 'MSGLST_CONTEXTMENU_FILE';

/**
 * 普通文本消息快捷菜单Id
 */
export const MSGLST_CONTEXTMENU_TEXT_MSG_ID = 'MSGLST_CONTEXTMENU_TEXT_MSG';

//处理下载文件或者图片
const handleDownloadFile = (e, data, target) => {
    const url = target.getAttribute('url');
    if (url != null) {
        try {
            window.open(url);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const isSelfMessage = message => {
    return message.Sender === appContext.currentStaff.StaffId;
}

/**
 * 消息列表无状态组件
 * @param {*} param0 
 */
export const MessageList = ({ messages }) => {
    return (
        <OuterDiv >
            {messages &&
                <div>
                    {
                        messages.map(msg => isSelfMessage(msg) ? <StaffMessage key={msg.MsgId} message={msg} props={this.props} /> : <CustomerMessage key={msg.MsgId} message={msg} />)
                    }
                </div>
            }
            <ContextMenu id={MSGLST_CONTEXTMENU_IMAGE_ID}>
                <MenuItem onClick={handleDownloadFile}>下载图片</MenuItem>
            </ContextMenu>
            <ContextMenu id={MSGLST_CONTEXTMENU_FILE_ID}>
                <MenuItem onClick={handleDownloadFile}>下载文件</MenuItem>
            </ContextMenu>
            <ContextMenu id={MSGLST_CONTEXTMENU_TEXT_MSG_ID}>

            </ContextMenu>
        </OuterDiv>
    )
}

MessageList.propTypes = {
    messages: PropTypes.array.isRequired,
}



