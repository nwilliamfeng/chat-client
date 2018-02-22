import { customerStates } from '../constants';
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
   

}



 
function fetchCustomerList() {
    return async dispatch => {
        await util.sleep(1000);
        const ip = util.getIpAddress();
        const staff =appContext.currentStaff;
        const { RetCode, Message, Data } = await customerService.getAllCustomers(staff.StaffId,staff.Token,ip,appContext.appKeys[0]);
        
        if (RetCode == 1) {           
            dispatch({ type: customerStates.Get_CUSTOMER_LIST_SUCCESS, customers:Data });
        }
       
    }
}

 