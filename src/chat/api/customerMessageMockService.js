import { random } from 'lodash';
import { messageService } from '../../message/api';
import { chatService } from './chatService';
import { appContext,util } from '../../util';
import Rx from 'rx';
import {chatActions} from '../actions';


class CustomerMessageMockService {


    constructor() {
        this._currentChatMsgCount = 0;
        this._currentChannelId = null;
    }

    _createMessage(chat,content){
        return {
            isUnread: true,
            ChannelID: chat.ChannelID,
            MsgId: util.guid(),
            AvataUrl:  chat.customer.CustomerAvataUrl  ,
            SenderName:  chat.customer.CustomerName,
            Sender:  chat.customer.CustomerId  ,
            MessageContent: content,
            SendTime: new Date(),
        }
    }

    getChats() {
        return chatService._chats;
    }

    async receiveMessage(content, headers = { 'Content-Type': 'application/json' }) {
        const url = `/robot/openapi/api?key=f7702f1f5dd7289678faec28844505de&amp;userid=99122&amp;info=${content}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,

        });
        const result = await response.json();
 
        return result.text;
    }


    start() {
        const source = Rx.Observable
            .interval(3000 /* ms */)
            .timeInterval();
        source.subscribe(
           async() => {
                if(chatService._chats.length==0){
                    return;
                }
                if (chatService._selectedChannelId != this._currentChannelId) {
                    this._currentChannelId = chatService._selectedChannelId;
                    this._currentChatMsgCount = chatService._getChat(chatService._selectedChannelId).messages.length;
                }
                else {
            
                    const idx = random(0, chatService._chats.length - 1);
                    const chat =chatService._chats[idx];

                    if(chat.channelId===this._currentChannelId){
                        if(chat.messages.length===0 ){
                            return;
                        }
                        if(chat.messages[chat.messages.length-1].SenderName!==appContext.currentStaff.StaffName){
                            return;
                        }
                        console.log('ready to receive customer msg');
                    }
                    const arr = chat.messages.filter(x => x.SenderName === appContext.currentStaff.StaffName);
                    const msgContent=await this.receiveMessage(arr.length>0?arr[arr.length - 1]:'请回答我的问题！');
                   
                    const msg= this._createMessage(chat,msgContent);
                    if(chat.channelId===this._currentChannelId){
                       msg.isUnread=false;
                    }
                    chat.messages=[...chat.messages,msg];

                  
                    
                }
            },
            err => {
                console.log('Error: ' + err);
            },
            () => {
                console.log('Completed');
            });
    }


}


export const customerMsgService = new CustomerMessageMockService();
