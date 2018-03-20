import { constants } from '../constants';
import { chatService } from '../api';
import {  appContext } from '../../util';
 

/**
 * 聊天Action工厂实例
 */
export const chatActions = {

    /**
     * 开始打开会话
     */
    openCustomerChat,
 
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

}


function initChats(){
   return {
       type:constants.INIT_CHATS,
   }
}

function selectChat(chat){
    return {
        type:constants.SELECT_CHAT,
        chats:chatService.chats,
        selectedChat:chat,
    }
}

function closeAllChats(){
    return async dispatch=>{
        await chatService.closeAllChats();
        dispatch({type:constants.CLOSE_ALL_CHATS});
    }
}

/**
 * 关闭指定的会话
 * @param {*} chat 
 */
function closeChat(chat){
    return async dispatch=>{
        await chatService.closeChat(chat);
        let selectedChat =null;
        if(chatService.chats.length>0){
            selectedChat =chatService.chats[0];
        }
        dispatch(
            {
                type:constants.CLOSE_CHAT,
                chats:chatService.chats,
                selectedChat,
            });
    }
}

function activeChatPage(page){
    
}


/**
 * 开始打开客户会话action
 */
function openCustomerChat(customer) {
    return async dispatch => {
        const newChat =await chatService.createChat(customer);
        dispatch({type:constants.OPEN_CHAT,selectedChat:newChat,chats:chatService.chats});    
    }
}

 
 


