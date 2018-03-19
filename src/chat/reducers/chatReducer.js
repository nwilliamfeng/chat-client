import { constants } from '../constants';
import { appContext } from '../../util';
import { constants as authConstants } from '../../auth/constants';




export const chatReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.INIT_CHATS:
      return {};

    case constants.BEGIN_OPEN_CHAT:
      return {
        ...state,
        newChat: action.newChat,
        chats: action.chats,
      };

    case constants.END_OPEN_CHAT:
      return {
        ...state,
        newChat: null,
        chats: [...action.chats],
      };

    case constants.CLOSE_CHAT:
      return {
        chats: [...action.chats], //注意此处不能直接返回action.chats,
      };

    case constants.CLOSE_ALL_CHATS:
      return {};

    // case authConstants.LOGOUT:
    // return {};


    default:
      return state;
  }

}
