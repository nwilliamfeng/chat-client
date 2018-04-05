import { constants } from '../constants';


const historyMessageContext = {
  data: [],
  totalItemCount: 0,
  pageSize: 0,
  currentPageIndex: 0,
}

const recentMessageContext = {
  messages: [],
  totalItemCount: 0,
  pageSize: 0,
  currentPageIndex: 0,
}

export const historyMessageReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.LOAD_HISTORY_MESSAGE:
      updateCurrMessageHistory(action.historyResult);
      return {
        historyResult: historyMessageContext,
      };

    case constants.LOAD_RECENT_MESSAGE:
      updateCurrRecentMessage(action.data);
      return {
        recentResult: Object.assign({}, recentMessageContext),
      };

    case constants.CLOSE_CHAT: //如果关闭会话则当前的历史消息清空
      recentMessageContext.messages=[];
      recentMessageContext.totalItemCount=0;
      recentMessageContext.pageSize=0;
      recentMessageContext.currentPageIndex=0;
      return {
        recentResult: Object.assign({}, recentMessageContext),
      };

    default:
      return state;
  }

}

function updateCurrMessageHistory(historyResult) {
  const nwMsgs = historyResult.Results;
  nwMsgs.forEach(msg => {
    const idx = historyMessageContext.data.findIndex(x => {
      return x.MsgId === msg.MsgId
    });
    if (idx < 0) {
      historyMessageContext.data.push(msg);
    }
  });
  historyMessageContext.currentPageIndex = historyResult.CurrentPageIndex;
  historyMessageContext.pageSize = historyResult.PageSize;
  historyMessageContext.totalItemCount = historyResult.TotalItemCount;
}

function updateCurrRecentMessage(data) {
  const nwMsgs = data.Results;
  nwMsgs.forEach(msg => {
    const idx = recentMessageContext.messages.findIndex(x => {
      return x.MsgId === msg.MsgId
    });
    if (idx < 0) {
      recentMessageContext.messages.push(msg);
    }
  });
  recentMessageContext.messages = [...recentMessageContext.messages];
  recentMessageContext.currentPageIndex = data.CurrentPageIndex;
  recentMessageContext.pageSize = data.PageSize;
  recentMessageContext.totalItemCount = data.TotalItemCount;
}
