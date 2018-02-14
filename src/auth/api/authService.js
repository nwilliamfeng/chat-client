//import _staffs from './staffs.json';

import { promiseUtil as util ,retCode} from '../../util';
import {staffStates} from '../constants';
import {serviceUrls} from './serviceUrls';

/**
 * 授权服务类
 */
class AuthService {

    fetchLocalAppkey(){
        return localStorage.getItem()
    }

    /**
     * 获取登录状态，刷新页面时调用，获取是否有效状态
     */
    async isOnline(staff){
        await util.sleep(1000);
        if(staff==null){
            return false;
        }
        else{
            const {loginTime} =staff;                        
            return loginTime? (new Date().getTime()-new Date(loginTime).getTime())/1000 <=8:false;             
        }
    }

    /**
     * 登录
     * @param {string} userName 
     * @param {string} password 
     * @param {number} staffstate 
     * @param {string} ip 
     * @param {string} appKey 
     */
    async login(userName, password, staffstate, ip,appKey) {
        
        await util.sleep(1000);
        if (userName != 'fw' || password != '1111') {
            return { result: 0, msg: '错误的用户名或密码' };
        }
        else {
            let staff =null;
            if (localStorage.getItem('user') == null) {
                staff = { userName, password,staffId:'3001',loginTime:new Date(),staffstate};
                localStorage.setItem('user', JSON.stringify(staff));
            }
            staff =JSON.parse( localStorage.getItem('user'));
            return { result: 1, data: staff };
        }
    }

    /**
     * 注销
     * @param {string} staffId 
     * @param {string} token 
     * @param {string} ip 
     * @param {string} appKey 
     */
    async logout(staffId, token, ip, appKey) {
        if (localStorage.getItem('user') != null) {
            localStorage.removeItem('user');
        }
        this.updateStaffSate()
        return { result: 1 };
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
        return {retCode:retCode.SUCCESS};
    }
 

}

/**
 * 授权服务实例
 */
export const authService = new AuthService();

