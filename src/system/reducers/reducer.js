import { constants } from '../constants';
import {constants as authConstants} from '../../auth/constants';

 
export const systemReducer = (state = {}, action) => {
  switch (action.type) {

 

    case constants.SERVER_ERROR_MESSAGE:
      return {
        ...state,
        error: action.message,
      };

    case authConstants.CLIENT_LOST_HEART:
      return {
        ...state,
        error: '心跳丢失',
      };


 

    default:
      return state;
  }

}
