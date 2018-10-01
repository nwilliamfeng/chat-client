import { uniqueId } from 'lodash';
import {messageService} from '../../message/api';
//import { chatServiceUrls as serviceUrls } from './chatServiceUrls';


/**
 * 客户聊天服务类
 */
class ChatService {

    constructor() {
        this._chats = []; //会话集合
       
    }



    async createChat(customer ) {
        const exist = this._chats.find(x => x.customer.CustomerId === customer.CustomerId);
        if (exist != null) {
            return exist;
        }

        const newChat = {
            customer, //当前的客户
            channelId: uniqueId('chat_'), //对应的频道Id
            offlineMsgPageCount:0,
            offlineMsgPageIdx:-1,
            messages:[],
        };
        this._chats.push(newChat);

        return newChat;
    }

    /** 
     * 关闭所有的会话
     */
    async closeAllChats() {
        //todo, 执行关闭chat
        this._chats = [];
    }

    /**
     * 关闭指定的会话
     * @param {*} chat 
     */
    async closeChat(chat) {
        const idx = this._chats.findIndex((item) => {
            return item.channelId === chat.channelId;
        });
        if (idx > -1) {
            this._chats.splice(idx, 1);
        }
    }

    async loadMoreOfflineMessages(chat){
        const {offlineMsgPageIdx} =chat;
      await  messageService.loadOfflineMessages(chat,offlineMsgPageIdx+1);
    }

    /**
     * 返回指定channelid的会话索引号
     * @param {string} channelId 
     */
    getChatIndex(channelId) {
        return this._chats.findIndex((item) => {
            return item.channelId === channelId;
        });
    }

    /**
     * 返回指定channelId的会话
     * @param {string} channelId 
     */
    getChat(channelId) {
        const idx = this.getChatIndex(channelId);
        return idx > -1 ? this._chats[idx] : null;
    }

    

    /**
     * 返回所有会话
     */
    get chats() {
        return this._chats;
    }


}

/**
 * 聊天服务实例
 */
export const chatService = new ChatService();
