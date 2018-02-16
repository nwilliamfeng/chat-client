import { authStates } from '../constants';
import { authService } from '../api';
import { history,util,appSettings,appContext } from '../../util';
import Staff from '../../models/staff';

/**
 * 授权Action工厂实例
 */
export const authActions = {
    fetchState,
    login, //loginAction实例
    logout, //logoutAction实例
    clearError, //clearError实例
    watchHeart,
}

 

/**
 * 登录action
 * @param {string} userName 
 * @param {string} userPassword 
 * @param {string} appKey 
 */
function login(userName, userPassword,appKey) {
    return async dispatch => {
        dispatch({type:authStates.LOGIN_REQUEST}); //发布正在登录
        const ip= util.getIpAddress();
        const {RetCode,Message,Data} = await authService.login(userName, userPassword,ip,appKey,1);
        console.log(RetCode);
        console.log(Data);
        if (RetCode == 1) {
            let staff =new Staff();
            Object.assign(staff,Data);
            console.log(staff);
            appContext.currentStaff= staff;
            dispatch({type: authStates.LOGIN_SUCCESS,staff});//如果登录成功发布用户信息
            history.push('/');//导航到主页
        }
        else {
            dispatch({type:authStates.LOGIN_FAIL,error:Message}); //否则如果失败则发布错误信息
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

/**
 * 清空登录错误信息action
 */
function clearError(){
    return {type:authStates.LOGIN_CLEAR_ERROR,error:''};
}

 

function watchHeart(){
    console.log(this.count);
    this.count=0;
    console.log(this.count);
    this.count+=1;
    
}


/**
 * 获取登录状态
 */
function fetchState(){
    return async dispatch => {
        const user =JSON.parse( localStorage.getItem('user'));      
        const result = await authService.isOnline(user);     
        dispatch({ type: authStates.LOGIN_FETCH_STATE,user:user,isOnline:result });
    }
}



