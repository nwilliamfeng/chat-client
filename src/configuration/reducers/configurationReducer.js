import { constants } from '../constants';






export const configurationReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        commonPhrase: action.commonPhrase,
      };

    

    default:
      return state;
  }

}
