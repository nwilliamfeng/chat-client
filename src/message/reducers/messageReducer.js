import { constants } from '../constants';
import { constants as chatConstants } from '../../chat/constants';
import { constants as authConstants } from '../../auth/constants'

const initState = {
  offlineMsgPageIdx: -1,
  offlineMsgPageCount: 0,
  channelId: null,
  messages:[],
}

/**
 * 离线消息reducer
 * @param {*} state 
 * @param {*} action 
 */
export const messageReducer = (state = initState, action) => {
  const {messages} =action;
  switch (action.type) {
    case authConstants.LOGOUT:
      return {
        ...state,
        ...initState,
      }

    // case chatConstants.SELECT_CHAT:

    //   return {
    //     ...state,
    //     messages:messages?messages:[],
    //     offlineMsgPageIdx,
    //     offlineMsgPageCount,
    //   }

    // case constants.RECEIVE_MESSAGE:
    //   return {
    //     ...state,
    //     channelId,
    //     messages: action.messages?action.messages:[],
    //   }

    // case constants.LOAD_OFFLINE_MESSAGE:
    //   const { offlineMsgPageCount, offlineMsgPageIdx, channelId } = action;
    //   return {
    //     ...state,
    //     offlineMsgPageIdx,
    //     offlineMsgPageCount,
    //     channelId,
    //   };


    // case chatConstants.CLOSE_CHAT: //如果关闭会话则当前的历史消息清空
    //   return {
    //     ...state,
    //     ...initState,
    //   };

    default:
      return {
        ...state,
        ...initState,
      };
  }

}


