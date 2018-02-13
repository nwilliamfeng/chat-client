//import _staffs from './staffs.json';
import Staff from '../Staff';
import { promiseUtil as util } from '../../util';

/**
 * 授权服务类
 */
class AuthService {

    /**
     * 获取登录状态
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

    async login(userName, userPassword) {
        await util.sleep(1000);
        if (userName != 'fw' || userPassword != '1111') {
            return { result: 0, msg: '错误的用户名或密码' };
        }
        else {
            let staff =null;
            if (localStorage.getItem('user') == null) {
                staff = { userName, userPassword,staffId:'3001',loginTime:new Date()};
                localStorage.setItem('user', JSON.stringify(staff));
            }
            staff =JSON.parse( localStorage.getItem('user'));
            return { result: 1, data: staff };
        }
    }

    async logout() {
        if (localStorage.getItem('user') != null) {
            localStorage.removeItem('user');
        }
        return { result: 1 };
    }


}

/**
 * 授权服务实例
 */
export const authService = new AuthService();

