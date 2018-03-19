import { util } from '../../util';
import { constants } from '../constants';
import { chatServiceUrls as serviceUrls } from './chatServiceUrls';


/**
 * 客户聊天服务类
 */
class ChatService {

    constructor() {
        this._chats =[];
    }

    async createChat(customer,otherparm=null){
        const newChat ={customer,channelId:this._chats.length+1,};
        this._chats.push(newChat);
        return newChat;
    }
   
    /** 
     * 关闭所有的会话
     */
    async closeAllChats(){
        //todo, 执行关闭chat
        this._chats=[];
    }

    /**
     * 关闭指定的会话
     * @param {*} chat 
     */
    async closeChat(chat){
        const idx =this._chats.findIndex((item)=>{
            return item.channelId==chat.channelId;
        });
        if(idx>-1){
            this._chats.splice(idx,1);
        }
    }

    /**
     * 返回所有会话
     */
    get chats(){
        return this._chats;
    }
    
    
    // async getStaffList(staffId, token, ip, appKey) {
    //     const url =  serviceUrls.URL_GET_STAFF_LIST ;     
    //     return await util.fetchWithPost(url, { staffId, token, ip, appKey });
    // }

}

/**
 * 聊天服务实例
 */
export const chatService = new ChatService();
