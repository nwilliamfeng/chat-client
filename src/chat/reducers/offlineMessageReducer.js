import { constants } from '../constants';



const offlineMessageContext = {
  messages: [],
  totalItemCount: 0,
  pageSize: 0,
  currentPageIndex: 0,
}

export const offlineMessageReducer = (state = {}, action) => {
  switch (action.type) {


    case constants.LOAD_OFFLINE_MESSAGE:
      updateOfflineMessage(action.data);

      return {
        ...state,
        offlineMessageData: Object.assign({}, offlineMessageContext),
      };

    case constants.CLOSE_CHAT: //如果关闭会话则当前的历史消息清空
      offlineMessageContext.messages = [];
      offlineMessageContext.totalItemCount = 0;
      offlineMessageContext.pageSize = 0;
      offlineMessageContext.currentPageIndex = 0;
      return {
        offlineMessageData: Object.assign({}, offlineMessageContext),
      };

    default:
      return state;
  }

}


function updateOfflineMessage(data) {
  const nwMsgs = data.Results;
  nwMsgs.forEach(msg => {
    const idx = offlineMessageContext.messages.findIndex(x => {
      return x.MsgId === msg.MsgId
    });
    if (idx < 0) {
      offlineMessageContext.messages.push(msg);
    }
  });
  offlineMessageContext.messages = [...offlineMessageContext.messages];
  offlineMessageContext.currentPageIndex = data.CurrentPageIndex;
  offlineMessageContext.pageSize = data.PageSize;
  offlineMessageContext.totalItemCount = data.TotalItemCount;
}