
import {util } from '../../util';
import {customerStates} from '../constants';
import {customerServiceUrls as serviceUrls} from './customerServiceUrls';
 

/**
 * 授权服务类
 */
class CustomerService {

    constructor(){
      
    }
 

   
    /**
     * 获取客户列表
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     * @param {bool} selfChat 
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    async getAllCustomers(staffId,token,ip,appKey,selfChat=false ) {       
         const url =serviceUrls.getFullUrl(serviceUrls.URL_GET_CUSTOMER_LIST);
   
        return await util.fetchWithPost(url,{staffId,token,ip,appKey,selfChat });
    }

     

}

/**
 * 客户服务实例
 */
export const customerService = new CustomerService();

