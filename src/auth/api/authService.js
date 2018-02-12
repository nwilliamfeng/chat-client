//import _staffs from './staffs.json';
import Staff from '../Staff';
import { promiseUtil as util } from '../../util';

/**
 * 授权服务类
 */
class AuthService {


    async login(userName, userPassword) {
        await util.sleep(3000);
        if (userName != 'fw' || userPassword != '1111') {
            return { result: 0, msg: '错误的用户名或密码' };
        }
        else {
            if (localStorage.getItem('user') == null) {
                let staff = new Staff(userName, userPassword);
                localStorage.setItem('user', JSON.stringify(staff));
            }
            return { result: 1, data: { staffId: '3001', staffName: userName, logintime: new Date(), staffState: 1 } };
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

