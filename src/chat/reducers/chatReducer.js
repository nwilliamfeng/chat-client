import { constants } from '../constants';
import { findIndex } from 'lodash';
import { constants as authConstants } from '../../auth/constants';

const replaceItem=(chats,chat)=>{
  const uidx = findIndex(chats, x => x.channelId === chat.channelId);
  if (uidx < 0) {
    return chats;
  }
  const result = [
    ...chats.slice(0, uidx),
    chat,
    ...chats.slice(uidx + 1),
  ];

  return result;
}

export const chatReducer = (state = { chats: [], selectedChat: null }, action) => {
  const { chats } = state;
  switch (action.type) {

    case constants.OPEN_CHAT:
      const newChat = action.newChat;
      const exist = chats.find(x => x.customer.CustomerId === newChat.customer.CustomerId);
      if (exist == null) {
        return {
          ...state,
          chats: [newChat, ...chats],
        };
      }
      else {
        return {
          ...state,
          selectedChat: exist,
        };
      }

    case constants.LOAD_MORE_OFFLINE_MESSAGES:
      return {
        ...state,
        chats: replaceItem(chats,action.chat),
        selectedChat: action.chat,

      }


    case constants.CLOSE_CHAT:
      const { removeId } = action;
      const idx = findIndex(chats, x => x.channelId === removeId);
      if (idx < 0) {
        return state;
      }
      const nwChats = [
        ...chats.slice(0, idx),
        ...chats.slice(idx + 1)
      ];
      return {
        ...state,
        chats: nwChats,
        selectedChat: nwChats.length > 0 ? nwChats[0] : null,
      };

    case authConstants.LOGOUT:
    case constants.CLOSE_ALL_CHATS:
      return { chats: [], selectedChat: null };

    case constants.SELECT_CHAT:
      const selectedChat = action.selectedChat;
      const existChat = chats.find(x => x.channelId === selectedChat.channelId);
      if (existChat.messages.some(x => x.isUnread)) {
       
        return {
          ...state,
          chats: replaceItem(chats,selectedChat),
          selectedChat: selectedChat,

        }
      }
      else {
        return {
          ...state,
          selectedChat: existChat,
        }
      }

    case constants.SEND_MESSAGE:
    return{
      ...state,
      chats:replaceItem(chats,action.chat),
      selectedChat:action.chat,
    }

    case constants.UPDATE_CHAT_LIST_MOCK:
    const uChats=[...action.chats];
    let oChats=state.chats;
    uChats.forEach(x=>{
       const uexist=state.chats.find(y=>y.channelId===x.channelId);
       if(uexist!=null && uexist.messages.length!==x.messages.length){
          oChats=replaceItem(oChats,x);
       }
    });
    return{
      ...state,
      chats:[...oChats],
      selectedChat:oChats.find(x=>x.channelId===state.selectedChat.channelId),
    }

    default:
      return state;
  }

}
