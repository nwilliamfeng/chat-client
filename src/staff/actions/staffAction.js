import { constants } from '../constants';
import { staffService } from '../api';
import {appContext } from '../../util';
 

/**
 * 客服Action工厂实例
 */
export const staffActions = {

    
    /**
     * 获取客服列表
     */
    fetchStaffList,

    changeExpandState,
}

 
/** 
 * 返回客服类别action
 */
function fetchStaffList() {
    return async dispatch => {
       const {staffId,token,ip,appKey} =appContext.getStaffParams();
       const { RetCode,  Data } = await staffService.getStaffList(staffId, token, ip, appKey);
        if (RetCode === 1) {
            dispatch({ type: constants.Get_STAFF_LIST_SUCCESS, staffs: Data });
        }
    }
}

function changeExpandState(panelId,isExpand){
    return dispatch=>{
        dispatch({type:constants.EXPAND_STATE_CHANGE,panelId,isExpand});
    }
}


 


