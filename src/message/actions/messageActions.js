import { constants } from '../constants';
import { messageService, historyMessageService } from '../api';
import { appContext } from '../../util';
import { dateUtil } from '../../util/date';


/**
 * 消息Action工厂实例
 */
export const messageActions = {


  getHistoryMessages,

  loadOfflineMessages,

  showHistoryMessagePanel,

}


function showHistoryMessagePanel() {
  //--todo 添加用户id传递给服务
  return {
    type: constants.SHOW_DETAIL_HISTORY_MESSAGE,
  }
}


/**
 * 返回指定客户id的历史消息
 * @param {string} customerId 
 */
function getHistoryMessages(customer) {
  //appkey, customerID, DateTime.Today.AddDays(-7).ToString("yyyy-MM-dd"), 1,1, 1, 50
  const { CustomerId } = customer;
  const startTime = dateUtil.dateFormat(dateUtil.substactDays(7), 'yyyy-MM-dd');
  return async dispatch => {
    const historyResult = await historyMessageService.getMessagesByCustomerId(CustomerId, startTime, 1, 1, 1, 10, appContext.appKeys[0]);
    dispatch({ type: constants.LOAD_HISTORY_MESSAGE, historyResult });
  }
}


/**
 * 返回指定频道id的离线消息
 * @param {string} channelId 
 */
function loadOfflineMessages(chat, pageIdx = 0) {
  const { channelId } = chat;

  return async dispatch => {
    const { offlineMsgPageIdx, offlineMsgPageCount } = await messageService.loadOfflineMessages(chat, pageIdx);
    dispatch({ type: constants.LOAD_OFFLINE_MESSAGE, channelId, offlineMsgPageIdx, offlineMsgPageCount });
    if (offlineMsgPageCount > 0 && offlineMsgPageIdx < offlineMsgPageCount - 1) {
      const messages = messageService.getChatMessages(channelId);
      dispatch({ type: constants.RECEIVE_MESSAGE, channelId, messages });
    }
  }
}
