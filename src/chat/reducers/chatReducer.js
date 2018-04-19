import { constants } from '../constants';
import { constants as homeConstants, pageType } from '../../home/constants';



export const chatReducer = (state = {}, action) => {
  switch (action.type) {

   



    case constants.OPEN_CHAT:
      return {
        ...state,
        selectedChat: action.selectedChat,
        chats: action.chats,
      };

    case constants.CLOSE_CHAT:
      return {
        chats: [...action.chats], //注意此处不能直接返回action.chats,
        selectedChat: action.selectedChat,
      };

    case constants.CLOSE_ALL_CHATS:
      return {};

    case constants.SELECT_CHAT:
      return {
        chats: [...action.chats],
        selectedChat: action.selectedChat,
      }

    case constants.ACTIVE_CHAT_PAGE:
      return {
        ...state,
        selectedChat: action.selectedChat,
      }




    default:
      return state;
  }

}
