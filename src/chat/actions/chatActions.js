import { constants } from '../constants';
import { chatService } from '../api';
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
    openMyCustomerChat,
 
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
     * 选中页面
     */
    activeChatPage,

    
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

function openMyCustomerChat(customer){
    return async dispatch => {
        const newChat =await chatService.createChat(customer);
        dispatch({type:constants.OPEN_CHAT,newChat});    
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

function activeChatPage(channelId,page){
    const selectedChat =chatService.getChat( channelId);
    
        selectedChat.activePage=page;
    

    return {
        type:constants.ACTIVE_CHAT_PAGE,
        selectedChat:Object.assign({}, selectedChat),
      
    }
}


/**
 * 开始打开客户会话action
 */
function openAssignedCustomerChat(customer) {
    return async dispatch => {
        const newChat =await chatService.createChat(customer);
        dispatch({type:constants.OPEN_CHAT,selectedChat:newChat,chats:chatService.chats});    
    }
}

 
 


