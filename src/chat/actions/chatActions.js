import { constants } from '../constants';
import { chatService } from '../api';
import { appSettings, appContext } from '../../util';
 


/**
 * 聊天Action工厂实例
 */
export const chatActions = {

    /**
     * 打开会话
     */
    openCustomerChat,

 

}

 

/**
 * 打开客户会话action
 */
function openCustomerChat(customer) {
    return async dispatch => {
        dispatch({type:constants.OPEN_CHAT,customer});
        // const ip = util.getIpAddress();
        // const staff = appContext.currentStaff;
        // const { RetCode, Message, Data } = await customerService.getCustomerList(staff.StaffId, staff.Token, ip, appContext.appKeys[0]);
        // if (RetCode == 1) {
        //     dispatch({ type: constants.Get_CUSTOMER_LIST_SUCCESS, customers: Data });
        // }
    }
}

 

 


