import { util } from '../../util';
import { staffServiceUrls as serviceUrls } from './staffServiceUrls';


/**
 * 客户服务类
 */
class StaffService {

    constructor() {
               
    }

    

    /**
     * 获取客服列表
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    async getStaffList(staffId, token, ip, appKey) {
        const url =  serviceUrls.URL_GET_STAFF_LIST ;     
        return await util.fetchWithPost(url, { staffId, token, ip, appKey });
    }


    
    
}

/**
 * 客服服务实例
 */
export const staffService = new StaffService();
