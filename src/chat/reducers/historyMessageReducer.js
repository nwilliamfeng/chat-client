import { constants } from '../constants';


const historyMessageContext={
    data:[],
    totalItemCount: 0, 
    pageSize: 0, 
    currentPageIndex: 0,
}

export const historyMessageReducer = (state = historyMessageContext, action) => {
  switch (action.type) {

    case constants.LOAD_HISTORY_MESSAGE:
      updateCurrMessageHistory(action.historyResult);
      return {
        result:historyMessageContext,
      };

    
    

    default:
      return state;
  }

}

function updateCurrMessageHistory(historyResult){
    const nwMsgs= historyResult.Results;
    nwMsgs.forEach(msg => {
      const idx = historyMessageContext.data.findIndex(x=>{
        return x.MsgId===msg.MsgId
      }) ;
      if(idx<0){
        historyMessageContext.data.push(msg);
      }
    });
  historyMessageContext.currentPageIndex =historyResult.CurrentPageIndex;
  historyMessageContext.pageSize =historyResult.pageSize;
  historyMessageContext.totalItemCount =historyResult.TotalItemCount;
}
