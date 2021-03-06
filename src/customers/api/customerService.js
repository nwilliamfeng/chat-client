import { util } from '../../util';
import { customerServiceUrls as serviceUrls } from './customerServiceUrls';
import {appContext} from '../../util';
import Rx from 'rx';


/**
 * 客户服务类
 */
class CustomerService {

    constructor() {
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
    async getCustomerList(staffId, token, ip, appKey, selfChat = false) {
        const customers = [];
        for (let i = 0; i < 3; i++) {
            let customer = {
                Device: 'Android' + i, CustomerState: 0, ProductName: 'product' + i, StaffName: 'staff' + i, CustomerId: 'F7942B04616B0E47'
                , Uid: 'uid' + i, CustomerName: 'customer' + i, CustomerIp: 'customerip' + i, CustomerIpMappingAddress: 'local' + i, EnterTime: new Date(), ChannelId: 'ChannelId' + i
            };
            //    customers.push(customer);
        }
        return { RetCode: 1, Message: '', Data: customers };

        //  const url =serviceUrls.getFullUrl(serviceUrls.URL_GET_CUSTOMER_LIST);

        // return await util.fetchWithPost(url,{staffId,token,ip,appKey,selfChat });
    }


    async getRelationMappingListByKey(staffId, appKey) {
        const url =  serviceUrls.URL_GET_RELATION_MAPPING_LIST ;
        return await util.fetchWithPost(url, { staffId, customerId: '', customerName: '', appKey });
    }


    


}

/**
 * 客户服务实例
 */
export const customerService = new CustomerService();
