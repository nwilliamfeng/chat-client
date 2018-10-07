import { constants, chatOpenMode } from '../constants';
import { chatService } from '../api';
import { messageService } from '../../message/api';
import { appContext } from '../../util';

/**
 * 聊天Action工厂实例
 */
export const chatActions = {

    /**
     * 打开已分配的客户会话
     */
    openAssignedCustomerChat,

    /**
     * 打开自己客户会话
     */
    chatWithMyCustomer,

    
    /**
     * 关闭所有会话
     */
    closeAllChats,

    /**
     * 关闭指定的会话
     */
    closeChat,

    /**
     * 选中会话
     */
    selectChat,

    /**
     * 加载更多的离线消息
     */
    loadMoreOfflineMessages,

    /**
     * 发送消息
     */
    sendMessage,

    updateChatListMock,

}




function selectChat(channelId) {
    const chat = chatService.selectChat(channelId);

    return {
        type: constants.SELECT_CHAT,
        selectedChat: chat,

    }
}

function closeAllChats() {
    return async dispatch => {
        await chatService.closeAllChats();
        dispatch({ type: constants.CLOSE_ALL_CHATS });
    }
}

function chatWithMyCustomer(customer) {
    return async dispatch => {
        //todo-- 这里需要chat服务类实现业务逻辑
        const newChat = await chatService.createChat(customer);

        // newChat.messages.filter(msg=>msg.isUnread===true).forEach(msg => {
        //     msg.isUnread=false;
        // });
        dispatch({ type: constants.OPEN_CHAT, newChat, openMode: chatOpenMode.ByStaff });

        dispatch(selectChat(newChat.channelId));


    }
}

function loadMoreOfflineMessages(channelId) {
    return async dispatch => {
        const chat = await chatService.loadMoreOfflineMessages(channelId);
        dispatch({ type: constants.LOAD_MORE_OFFLINE_MESSAGES, chat });
    }
}

/**
 * 关闭指定的会话
 * @param {*} chat 
 */
function closeChat(channelId) {
    return async dispatch => {

        await chatService.closeChat(channelId);
        dispatch(
            {
                type: constants.CLOSE_CHAT,
                removeId: channelId,
            });
    }
}

function sendMessage(channelId, messageContent) {
    return async dispatch => {

        const chat = await chatService.sendMessage(channelId, messageContent);
        dispatch(
            {
                type: constants.SEND_MESSAGE,
                chat,
            });
    }
}




/**
 * 开始打开客户会话action
 */
function openAssignedCustomerChat(customer) {
    return async dispatch => {
        const newChat = await chatService.createChat(customer);
        dispatch({ type: constants.OPEN_CHAT, selectedChat: newChat });
    }
}


function updateChatListMock() {
    const chats = chatService._chats.map(x => { return { ...x } });
    return {
        type: constants.UPDATE_CHAT_LIST_MOCK,
        chats,

    }
}


