import { util } from '../../util';
import { constants } from '../constants';
import { chatServiceUrls as serviceUrls } from './chatServiceUrls';


/**
 * 客户聊天服务类
 */
class CustomerChatService {

    constructor() {

    }
   
    
    // async getStaffList(staffId, token, ip, appKey) {
    //     const url =  serviceUrls.URL_GET_STAFF_LIST ;     
    //     return await util.fetchWithPost(url, { staffId, token, ip, appKey });
    // }

}

/**
 * 聊天服务实例
 */
export const customerChatService = new CustomerChatService();
