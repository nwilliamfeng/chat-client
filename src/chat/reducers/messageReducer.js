import { constants } from '../constants';


export const messageReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.LOAD_HISTORY_MESSAGE:
      return {
        ...state,
        historyResult: action.historyResult,
       
      };

    
    

    default:
      return state;
  }

}
