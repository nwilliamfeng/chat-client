import { constants } from '../constants';
import {appContext} from '../../util';

//to do -- add other params
function createChat(customer){
  return {customer,staff:appContext.currentStaff};
}



export const chatReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.OPEN_CHAT:
      return {
        ...state,
        chat:createChat(action.customer),
      };

    default:
      return state;
  }

}
