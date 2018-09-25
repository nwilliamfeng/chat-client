import { chatServiceUrls as serviceUrls } from './serviceUrls';
import { util } from '../../util';
import {} from 'lodash';

 
class MessageService {

    constructor(){
        this._msgLstCache=[];
    }

    addMessage(channelId,msg){
        const exist =this._msgLstCache.find(x=>x.channelId===channelId);
        if(exist==null){
            const msgLst={channelId,msgs:[msg]};
            this._msgLstCache.push(msgLst);
        }
        else{
             let {msgs} =exist;
             if(!msgs.some(x=>x.id===msg.id)){
                msgs.push(msg);
             }
             
        }
    }

    updateMessageState
}

/**
 * 消息服务实例
 */
export const messageService = new MessageService();
