import { constants } from '../constants';
import { messageService,historyMessageService } from '../api';
import {  appContext } from '../../util';
import { dateUtil } from '../../util/date';
 

/**
 * 消息Action工厂实例
 */
export const messageActions = {

     
    getHistoryMessages,

    getOfflineMessages,

}


/**
 * 返回指定客户id的历史消息
 * @param {string} customerId 
 */
function getHistoryMessages(customer){
    //appkey, customerID, DateTime.Today.AddDays(-7).ToString("yyyy-MM-dd"), 1,1, 1, 50
    const {CustomerId} =customer;
    const startTime=dateUtil.dateFormat( dateUtil.substactDays(7),'yyyy-MM-dd');
    return async dispatch =>{
      const historyResult= await historyMessageService.getMessagesByCustomerId(CustomerId,startTime,1,1,1,10,appContext.appKeys[0]);
      dispatch({type:constants.LOAD_HISTORY_MESSAGE,historyResult});
    }
}


/**
 * 返回指定频道id的离线消息
 * @param {string} channelId 
 */
function getOfflineMessages(channelId,pageIdx=1){
    const startTime=dateUtil.dateFormat( dateUtil.substactDays(7),'yyyy-MM-dd');
    const sortOrder=0;//按时间升序
    return async dispatch =>{
      const data= await historyMessageService.getMessagesByChannelId(channelId,startTime,1,sortOrder,pageIdx,10,appContext.appKeys[0]);
      dispatch({type:constants.LOAD_OFFLINE_MESSAGE,data});
    }
}