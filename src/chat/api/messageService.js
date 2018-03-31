import { chatServiceUrls as serviceUrls } from './chatServiceUrls';
import { util } from '../../util';
import {messageContentType} from '../constants';

/**
 * 消息服务类
 */
class MessageService {

    /**
     * 返回指定的消息内容对应的类型
     * @param {string} msgContent 
     */
    getMessageContentType(msgContent){
        if(msgContent.startsWith('{Url:http://') && msgContent.endsWith(',UrlEnd:UrlEnd}')){
            if(msgContent.indexOf(',ThumbUrl:')>0){
                return messageContentType.Picture;
            }
            
        }
        return messageContentType.Text;
    }


    /**
     * 
     * @param {string} msgContent 
     */
    getThumbImg(msgContent){
       const arrs=  msgContent.split(',');
       return arrs[arrs.length-2].replace('ThumbUrl:','');
    }



    /**
     * 返回指定客户id的历史消息
     * @param {string} customerId 
     * @param {string} startTime //sample: '2018-03-23'
     * @param {number} type 
     * @param {number} sort 
     * @param {number} index 
     * @param {number} pageSize 
     * @param {string} appKey 
     * @returns  {TotalItemCount: 0, PageSize: 50, CurrentPageIndex: 0, Results:[]}
     */
    async getMessagesByCustomerId(customerId, startTime, type, sort, index, pageSize, appKey) {
        const url = serviceUrls.URL_GET_MESSAGES_BY_CUSTOMER_ID;
        const res= await util.fetchWithPost(url,
            {
                customerId,
                startTime,
                type,                
                sort,
                index,
                pageSize,
                appKey,
                maxcount: 10000,
            });
        if(res.RetCode===1){
            return res.Data; //sample:TotalItemCount: 5, PageSize: 50, CurrentPageIndex: 1, Results:[]
        }
        else{
            return {TotalItemCount: 0, PageSize: 50, CurrentPageIndex: 0, Results:[]}
        }
    }

}

/**
 * 消息服务实例
 */
export const messageService = new MessageService();
