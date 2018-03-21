import { chatServiceUrls as serviceUrls } from './chatServiceUrls';
import {util} from '../../util';

/**
 * 消息服务类
 */
class MessageService {

    /**
     * 返回指定客户id的历史消息
     * @param {string} customerId 
     * @param {string} startTime //sample: '2018-03-23'
     * @param {number} type 
     * @param {number} maxcount 
     * @param {number} sort 
     * @param {number} index 
     * @param {number} pageSize 
     * @param {string} appKey 
     */
    async getMessagesByCustomerId(customerId, startTime, type,maxcount,sort,index,pageSize, appKey) {
        const url =  serviceUrls.URL_GET_STAFF_LIST ;     
        return await util.fetchWithPost(url, { customerId, startTime, type,maxcount,sort,index,pageSize, appKey});
    }

}

/**
 * 消息服务实例
 */
export const messageService = new MessageService();
