import { constants } from '../constants';
import {constants as chatConstants} from '../../chat/constants';
import {constants as authConstants} from '../../auth/constants'



/**
 * 离线消息reducer
 * @param {*} state 
 * @param {*} action 
 */
export const offlineMessageReducer = (state = { offlineMessages: [], pageIdx: -1, pageCount: 0 }, action) => {

  switch (action.type) {
    case authConstants.LOGOUT:   
    case chatConstants.SELECT_CHAT:
      return{
        ...state,
        offlineMessages: [], 
        pageIdx: -1, 
        pageCount: 0 ,
      }

    case constants.LOAD_OFFLINE_MESSAGE:
      const { Results, TotalItemCount, PageSize, CurrentPageIndex } = action.data;
      if (Results.length > 0 && !state.offlineMessages.some(x => x.MsgId === Results[0].MsgId)) {
        return {
          ...state,
          pageIdx: CurrentPageIndex,
          pageCount:Number.parseInt((TotalItemCount / PageSize).toFixed(0)),
          offlineMessages: [...Results, ...state.offlineMessages],
        };
      }
      return state;

    case constants.CLOSE_CHAT: //如果关闭会话则当前的历史消息清空
      return state;

    default:
      return state;
  }

}


 