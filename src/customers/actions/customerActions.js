import { authStates } from '../constants';
import { authService, heartWatchService } from '../api';
import { history, util, appSettings, appContext } from '../../util';
import Staff from '../../models/staff';

/**
 * 授权Action工厂实例
 */
export const customerActions = {

    login, //loginAction实例
   

}



 
function getCustomerList(userName, userPassword, appKey) {
    return async dispatch => {
        dispatch({ type: authStates.LOGIN_REQUEST }); //发布正在登录
        const ip = util.getIpAddress();
        const { RetCode, Message, Data } = await authService.login(userName, userPassword, ip, appKey, 1);
        console.log(RetCode);
        console.log(Data);
        if (RetCode == 1) {
            let staff = new Staff();
            Object.assign(staff, Data);
            appContext.currentStaff = staff;
            appSettings.appKey = appKey;
            appSettings.save();
            heartWatchService.start(staff.StaffId, staff.Token, ip, appKey, (reconnectCount) => {
                dispatch({ type: authStates.LOGIN_LOST_HEART, reconnectCount, staff });
            });
            dispatch({ type: authStates.LOGIN_SUCCESS, staff });//如果登录成功发布用户信息
            history.push('/');//导航到主页
        }
        else {
            dispatch({ type: authStates.LOGIN_FAIL, error: Message }); //否则如果失败则发布错误信息
        }
    }
}

 