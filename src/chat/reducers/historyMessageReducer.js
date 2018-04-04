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
        recentResult: recentMessageContext,
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
  historyMessageContext.pageSize = historyResult.pageSize;
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
  recentMessageContext.currentPageIndex = data.CurrentPageIndex;
  recentMessageContext.pageSize = data.pageSize;
  recentMessageContext.totalItemCount = data.TotalItemCount;
}
