import { constants } from '../constants';
import {appContext} from '../../util';

 
 
 
export const chatReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.OPEN_CHAT:
      return {
        ...state,
       
      };

    default:
      return state;
  }

}
