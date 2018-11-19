import { constants, pageType } from '../constants';
import {constants as chatConstants , chatOpenMode} from '../../chat/constants';
 

const sizeContext = {
  chatWidth: 0,
}

export const homeReducer = (state = {}, action) => {
  switch (action.type) {

    case chatConstants.OPEN_CHAT:
       if(action.openMode===chatOpenMode.ByStaff){
        return {
          ...state,
          page: pageType.CHAT,
        };
       }

    case constants.PAGE_SELECT:
      return {
        ...state,
        page: action.page,
      };

    // case constants.CUSTOMER_LIST_WIDTH_CHANGED:
    // return {
    //   ...state,
    //   customerListWidth: action.width,
    // };



    default:
      return state;
  }

}
