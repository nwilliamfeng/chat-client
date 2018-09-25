import { constants } from '../constants';

export const chatReducer = (state = { chats: [], selectedChat: null }, action) => {
  switch (action.type) {

    case constants.OPEN_CHAT:
      const { newChat } = action;
      const { chats } = state;
      const exist = chats.find(x => x.customer.CustomerId === newChat.customer.CustomerId);
      if (exist == null) {
        return {
          ...state,
          chats: [newChat, ...state.chats],
          selectedChat: newChat,
        };
      }
      else {
        return {
          ...state,
          selectedChat: exist,
        };
      }


    case constants.CLOSE_CHAT:
      return {
        chats: [...action.chats], //注意此处不能直接返回action.chats,
        selectedChat: action.selectedChat,
      };

    case constants.CLOSE_ALL_CHATS:
      return {};

    case constants.SELECT_CHAT:
      return {
        ...state,
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
