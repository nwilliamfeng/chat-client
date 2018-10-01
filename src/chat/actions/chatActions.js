import { constants, chatOpenMode } from '../constants';
import { chatService } from '../api';
import {messageService} from  '../../message/api';
import {  appContext } from '../../util';
 
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
     * 初始化
     */
    initChats,

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

}


function initChats(){
   return {
       type:constants.INIT_CHATS,
   }
}

function selectChat(chat){
    if(chat!=null){
        chat.messages.filter(msg=>msg.isUnread===true).forEach(msg => {
            msg.isUnread=false;
        });
    }
    return {
        type:constants.SELECT_CHAT,
        selectedChat:chat,
 
    }
}

function closeAllChats(){
    return async dispatch=>{
        await chatService.closeAllChats();
        dispatch({type:constants.CLOSE_ALL_CHATS});
    }
}

function chatWithMyCustomer(customer){
    return async dispatch => {
        //todo-- 这里需要chat服务类实现业务逻辑
        const newChat =await chatService.createChat(customer);
        messageService.loadOfflineMessages(newChat);
        newChat.messages.filter(msg=>msg.isUnread===true).forEach(msg => {
            msg.isUnread=false;
        });
        dispatch({type:constants.OPEN_CHAT,newChat,openMode:chatOpenMode.ByStaff});   
        dispatch(selectChat(newChat));
    }
}

function loadMoreOfflineMessages(chat){
    return async dispatch=>{
        await chatService.loadMoreOfflineMessages(chat);
        dispatch({type:constants.LOAD_MORE_OFFLINE_MESSAGES,chat});
    }
}
 
/**
 * 关闭指定的会话
 * @param {*} chat 
 */
function closeChat(chat){
    return async dispatch=>{
        const {channelId} =chat;
        await chatService.closeChat(chat);
        dispatch(
            {
                type:constants.CLOSE_CHAT,
                removeId:channelId,
            });
    }
}

 


/**
 * 开始打开客户会话action
 */
function openAssignedCustomerChat(customer) {
    return async dispatch => {
        const newChat =await chatService.createChat(customer);   
        dispatch({type:constants.OPEN_CHAT,selectedChat:newChat});    
    }
}

 
 


