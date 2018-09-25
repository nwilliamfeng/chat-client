import { constants } from '../constants';
import {remove} from 'lodash';

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
      const  deletedChat  =action.deletedChat;
      console.log(chats);?????
      const existChats=remove(chats,x=>x.channelId===deletedChat.channelId);
      return {
        ...state,
        chats:existChats, 
        selectedChat: existChats.length>0?existChats[0]:null,
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
