import { constants } from '../constants';
import { findIndex } from 'lodash';

export const chatReducer = (state = { chats: [], selectedChat: null }, action) => {
  const { chats } = state;
  switch (action.type) {

    case constants.OPEN_CHAT:
      const { newChat } = action;

      const exist = chats.find(x => x.customer.CustomerId === newChat.customer.CustomerId);
      if (exist == null) {
        return {
          ...state,
          chats: [newChat, ...chats],
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
      const { removeId } = action;
      const idx = findIndex(chats, x => x.channelId === removeId);
      if (idx < 0) {
        return state;
      }
      const nwChats=[
        ...chats.slice(0, idx),
        ...chats.slice(idx + 1)
      ];
      return {
        ...state,
        chats: nwChats,
        selectedChat: nwChats.length > 0 ? nwChats[0] : null,
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
