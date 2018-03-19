import { constants } from '../constants';
import { chatService } from '../api';
import { appSettings, appContext } from '../../util';
 

/**
 * 聊天Action工厂实例
 */
export const chatActions = {

    /**
     * 开始打开会话
     */
    beginOpenCustomerChat,


    /**
     * 结束打开会话
     */
    endOpenCustomerChat,

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

}


function initChats(){
   return {
       type:constants.INIT_CHATS,
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
        dispatch({type:constants.CLOSE_CHAT,chats:chatService.chats});
    }
}



/**
 * 开始打开客户会话action
 */
function beginOpenCustomerChat(customer) {
    return async dispatch => {
        const newChat =await chatService.createChat(customer);
        dispatch({type:constants.BEGIN_OPEN_CHAT,newChat,chats:chatService.chats});    
    }
}

/**
 * 结束打开客户会话action
 */
function endOpenCustomerChat() {
    return async dispatch => {
        dispatch({type:constants.END_OPEN_CHAT,chats:chatService.chats});      
    }
}
 

 


