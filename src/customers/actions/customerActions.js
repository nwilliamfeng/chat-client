import { constants } from '../constants';
import { customerService } from '../api';
import {   util,  appContext } from '../../util';
 

/**
 * 客户Action工厂实例
 */
export const customerActions = {

    /**
     * 获取客户列表
     */
    fetchCustomerList,

  
}

/**
 * 获取客户列表action
 */
function fetchCustomerList() {
    return async dispatch => {
        const ip = util.getIpAddress();
        const staff = appContext.currentStaff;
        const { RetCode, Message, Data } = await customerService.getCustomerList(staff.StaffId, staff.Token, ip, appContext.appKeys[0]);
        if (RetCode === 1) {
            dispatch({ type: constants.Get_CUSTOMER_LIST_SUCCESS, customers: Data });
        }
    }
}




 


