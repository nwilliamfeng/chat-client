import { constants } from '../constants';

 
 
export const homeReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.NAVIBAR_WIDTH_CHANGED:
      return {
        ...state,
        chatListWidth: action.width,
      };

      case constants.NAVIBAR_HEIGHT_CHANGED:
      return {
        ...state,
        chatListHeight: action.height,
      };
      // case constants.CUSTOMER_LIST_Height_CHANGED:
      // return {
      //   ...state,
      //   customerListHeight: action.height,
      // };

      case constants.CUSTOMER_LIST_WIDTH_CHANGED:
      return {
        ...state,
        customerListWidth: action.width,
      };

      // case constants.CUSTOMER_LIST_INIT_SIZE:
      // return {
      //   ...state,
      //   customerListWidth: action.width,
      //   customerListHeight:action.height,
      // };

    default:
      return state;
  }

}
