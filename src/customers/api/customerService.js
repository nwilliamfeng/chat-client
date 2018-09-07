import { util } from '../../util';
import { customerServiceUrls as serviceUrls } from './customerServiceUrls';


/**
 * 客户服务类
 */
class CustomerService {

    constructor() {
                //customerid in company : 2D805092B1447AFD;
                //customerid in home :BA34565DB69EB411 
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



    
    
}

/**
 * 客户服务实例
 */
export const customerService = new CustomerService();
