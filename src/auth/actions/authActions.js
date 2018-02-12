import { authStates } from '../constants';
import { authService } from '../api';
import { history } from '../../util';

/**
 * 授权Action工厂实例
 */
export const authActions = {
    login, //loginAction实例
    logout, //logoutAction实例
}


/**
 * 登录action
 * @param {*} userName 
 * @param {*} userPassword 
 */
function login(userName, userPassword) {
    return async dispatch => {
        dispatch({type:authStates.LOGIN_REQUEST}); //发布正在登录
        let json = await authService.login(userName, userPassword);
        const {result,data,msg} =json;
        if (result == 1) {
            dispatch({type: authStates.LOGIN_SUCCESS,user: data});//如果登录成功发布用户信息
            history.push('/');//导航到主页
        }
        else {
            dispatch({type:authStates.LOGIN_FAIL,error:msg}); //否则如果失败则发布错误信息
        }
    }
}

/**
 * 退出action
 */
function logout() {
    return async dispatch => {
        let json = await authService.logout();
        if(json.result==1){
            history.push('/login');
        }
        dispatch({ type: authStates.LOGOUT });
    }
}




