import {util } from '../../util';
import {customerStates} from '../constants';
import {customerServiceUrls as serviceUrls} from './customerServiceUrls';
 

/**
 * 客户服务类
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
        
        const customers =[];
        for(let i=0;i<3;i++){
           let customer= { Device:'Android'+i, CustomerState:0, ProductName:'product'+i, StaffName:'staff'+i, CustomerId:'customer'+i
                , Uid:'uid'+i, CustomerName:'customerName'+i, CustomerIp:'customerip'+i, CustomerIpMappingAddress:'local'+i, EnterTime:new Date(),ChannelId:'ChannelId'+i };
            customers.push(customer);
        }
        return {RetCode:1,Message:'',Data:customers};

        //  const url =serviceUrls.getFullUrl(serviceUrls.URL_GET_CUSTOMER_LIST);
   
        // return await util.fetchWithPost(url,{staffId,token,ip,appKey,selfChat });
    }

}

/**
 * 客户服务实例
 */
export const customerService = new CustomerService();
