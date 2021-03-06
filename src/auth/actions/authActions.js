import { constants } from '../constants';
import { authService, heartWatchService } from '../api';
import { history, util, appSettings, appContext } from '../../util';
import {systemActions} from '../../system/actions';
import Staff from '../../models/staff';
import AuthHelper from '../authHelper'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

/**
 * 授权Action工厂实例
 */
export const authActions = {

    /**
     * 登录Action
     */
    login,

    /**
     * 退出Action
     */
    logout,

    /**
     * 清空错误信息Action
     */
    clearError,

    /**
     * 更改客服状态Action
     */
    changeStaffState,
}

/**
 * 登录action
 * @param {string} userName 
 * @param {string} userPassword 
 * @param {string} appKey 
 */
function login(userName, userPassword, appKey) {
    return async dispatch => {
        dispatch({ type: constants.LOGIN_REQUEST }); //发布正在登录
        const ip = util.getIpAddress();
        const { RetCode, Message, Data } = await authService.login(userName, userPassword, ip, appKey, 1);
        if (RetCode === 1) {
            let staff = new Staff();
            Data.StaffState = AuthHelper.getStaffState(Data.StaffState);
            Object.assign(staff, Data);
            appContext.currentStaff = staff;
            appSettings.appKey = appKey;
            appSettings.save();
            heartWatchService.start(staff.StaffId, staff.Token, ip, appKey, reconnectCount => {
                dispatch({ type: constants.CLIENT_LOST_HEART, reconnectCount });
            });
            dispatch({ type: constants.LOGIN_SUCCESS, staff });//如果登录成功发布用户信息
            history.push('/');//导航到主页
        }
        else {
            dispatch({ type: constants.LOGIN_FAIL, error: Message }); //否则如果失败则发布错误信息
        }
    }
}

/**
 * 退出action
 */
function logout() {
    return async dispatch => {
        const { staffId, token, ip, appKey } = appContext.getStaffParams();
        const { RetCode, Message } = await authService.logout(staffId, token, ip, appKey);
        if (RetCode !== 1) {
            dispatch( systemActions.notifyError(Message));
        }
        appContext.clear();//清除缓存
        heartWatchService.stop();
        history.push('/login');
        dispatch({ type: constants.LOGOUT });
    }
}

/**
 * 更改客服状态
 * @param {number} staffState 
 */
function changeStaffState(staffState) {
    return async dispatch => {
        const { staffId, token, ip, appKey } = appContext.getStaffParams();
        const { RetCode, Message } = await authService.changeStaffState(staffState, staffId, token, ip, appKey);
        if (RetCode !== 1) {
            alert(Message);
        }
        else {
            appContext.currentStaff.StaffState = staffState;
            dispatch({ type: constants.LOGIN_CHANGE_STATE, staff: appContext.currentStaff });
        }
    }
}

/**
 * 清空登录错误信息action
 */
function clearError() {
    return { type: constants.LOGIN_CLEAR_ERROR, error: '' };
}



/**
 * 获取登录状态
 */
// function fetchState(){
//     return async dispatch => {
//         const user =JSON.parse( localStorage.getItem('user'));      
//         const result = await authService.isOnline(user);     
//         dispatch({ type: authStates.LOGIN_FETCH_STATE,user:user,isOnline:result });
//     }
// }



