import { constants } from '../constants';
import { customerService } from '../api';
import {   util,  appContext } from '../../util';
 

/**
 * 客户Action工厂实例
 */
export const customerActions = {

    /**
     * 获取分配客户列表
     */
    fetchCustomerList,

    /**
     * 获取客户关系列表
     */
    fetchCustomerRelationMappingList,


}

/**
 * 获取分配的客户列表action
 */
function fetchCustomerList() {
    return async dispatch => {
        const ip = util.getIpAddress();
        const staff = appContext.currentStaff;
        const { RetCode, Message, Data } = await customerService.getCustomerList(staff.StaffId, staff.Token, ip, appContext.appKeys[0]);
        if (RetCode === 1) {
            dispatch({ type: constants.Get_CUSTOMER_LIST_SUCCESS, customers: Data });
        }
        else{
            console.log(Message);
        }
    }
}

/**
 * 获取客户列表
 */
function fetchCustomerRelationMappingList() {
    return async dispatch => {
        const staff = appContext.currentStaff;
        if(staff==null){
            return;
        }
        const {StaffId,AppKey} =staff;
        const { RetCode, Message, Data } = await customerService.getRelationMappingListByKey(StaffId,AppKey);
        if (RetCode === 1) {
            dispatch({ type: constants.Get_CUSTOMER_RELATION_MAPPING_SUCCESS, items: Data });
        }
        else{
            console.log(Message);
        }
    }
}


 
 


