
import {util } from '../../util';
import {staffStates} from '../constants';
import {authServiceUrls as serviceUrls} from './authServiceUrls';
import 'whatwg-fetch'; 


/**
 * 授权服务类
 */
class AuthService {

    constructor(){
      
    }
 

    /**
     * 获取登录状态，刷新页面时调用，获取是否有效状态
     */
    // async isOnline(staff){
       
       
    //     if(staff==null){
    //         return false;
    //     }
    //     else{
    //         const {loginTime} =staff;                        
    //         return loginTime? (new Date().getTime()-new Date(loginTime).getTime())/1000 <=8:false;             
    //     }
    // }

    /**
     * 登录
     * @param {string} userName 
     * @param {string} password 
     * @param {string} ip 
     * @param {string} appKey 
     * @param {number} staffstate 
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    async login(userName, password, ip,appKey,staffstate=1 ) {       
         const url =serviceUrls.getFullUrl(serviceUrls.URL_LOGIN);
        return await util.fetchWithPost(url,{userName,password,ip,appKey,staffstate });
    }

    /**
     * 注销
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     */
    async logout(staffId, token, ip, appKey) {  
        const url =serviceUrls.getFullUrl(serviceUrls.URL_LOGOUT);
        return await util.fetchWithPost(url,{staffId,token,ip,appKey });   
    }

    /**
     * 更新状态
     * @param {Number} state 
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     */
    async updateStaffSate(state, staffId, token, ip, appKey){
        await util.sleep(1000);
        return {retCode:'2'};
    }


    /**
     * 发送心跳
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     * @returns {{RetCode:number,Message:string,Data:Any}}
     */
    async sendStaffHeart(staffId,token,ip,appKey){     
        const url =serviceUrls.getFullUrl(serviceUrls.URL_HEART);        
        return await util.fetchWithPost(url,{staffId,token,ip,appKey })
    }
 

}

/**
 * 授权服务实例
 */
export const authService = new AuthService();

