import { constants } from '../constants';

const sizeContext={
  chatWidth:0,
}
 
export const homeReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.NAVIBAR_WIDTH_CHANGED:
      return {
        ...state,
        chatListWidth: action.width,
      };

      // case constants.NAVIBAR_HEIGHT_CHANGED:
      // return {
      //   ...state,
      //   chatListHeight: action.height,
      // };

      case constants.CHAT_WIDTH_QUERY:
      return {
        ...state,
        chatWidth: sizeContext.chatWidth,
      };

      case constants.PAGE_SELECT:
      return {
        ...state,
        page:action.page,
      };

      case constants.CUSTOMER_LIST_WIDTH_CHANGED:
      return {
        ...state,
        customerListWidth: action.width,
      };

      case constants.CHAT_WIDTH_CHANGE:
      sizeContext.chatWidth=action.width;
      return {
        ...state,
        chatWidth: action.width,
       
      };

    default:
      return state;
  }

}
