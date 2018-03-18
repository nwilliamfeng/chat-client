import { constants } from '../constants';

 
 
export const homeReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.NAVIBAR_SIZE_CHANGED:
      return {
        ...state,
        navibarSize: action.navibarSize,
      };

    
   

    default:
      return state;
  }

}
