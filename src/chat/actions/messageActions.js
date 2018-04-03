import { constants } from '../constants';
import { messageService } from '../api';
import {  appContext } from '../../util';
import { dateUtil } from '../../util/date';
 

/**
 * 消息Action工厂实例
 */
export const messageActions = {

     
    loadHistoryMessage,

}


 
function loadHistoryMessage(customerId){
    //appkey, customerID, DateTime.Today.AddDays(-7).ToString("yyyy-MM-dd"), 1,1, 1, 50
    const startTime=dateUtil.dateFormat( dateUtil.substactDays(7),'yyyy-MM-dd');
    return async dispatch =>{
      const historyResult= await messageService.getMessagesByCustomerId(customerId,startTime,1,1,1,10,appContext.appKeys[0]);
      dispatch({type:constants.LOAD_HISTORY_MESSAGE,historyResult});
    }
}

 
