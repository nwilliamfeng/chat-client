import { constants } from '../constants';
import { customerService } from '../api';
import { history, util, appSettings, appContext } from '../../util';
import Customer from '../../models/customer';


/**
 * 客户Action工厂实例
 */
export const customerActions = {

    /**
     * 获取客户列表
     */
    fetchCustomerList,

    /**
     * 获取客服列表
     */
    fetchStaffList,

    sortCustomerList,

}

/**
 * 获取客户列表action
 */
function fetchCustomerList() {
    return async dispatch => {
        const ip = util.getIpAddress();
        const staff = appContext.currentStaff;
        const { RetCode, Message, Data } = await customerService.getCustomerList(staff.StaffId, staff.Token, ip, appContext.appKeys[0]);
        if (RetCode == 1) {
            dispatch({ type: constants.Get_CUSTOMER_LIST_SUCCESS, customers: Data });
        }
    }
}

/** 
 * 返回客服类别action
 */
function fetchStaffList() {
    return async dispatch => {
       const {staffId,token,ip,appKey} =appContext.getStaffParams();
       const { RetCode, Message, Data } = await customerService.getStaffList(staffId, token, ip, appKey);
        if (RetCode == 1) {
            dispatch({ type: constants.Get_STAFF_LIST_SUCCESS, staffs: Data });
        }
    }
}



function sortCustomerList(sortColumn,sortOrder=1 ){
    return {type:constants.SORT_CUSTOMERS, sortDescriptor:{ column :sortColumn,order:sortOrder}};
}



