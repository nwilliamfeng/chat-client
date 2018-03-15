import { util } from '../../util';
import { constants } from '../constants';
import { chatServiceUrls as serviceUrls } from './chatServiceUrls';


/**
 * 客户聊天服务类
 */
class ChatService {

    constructor() {
        this.chats =[];
    }

    createChat(customer,otherparm=null){
        const newChat ={customer,channelId:this.chats.length+1,};
        this.chats.push(newChat);
        return newChat;
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
