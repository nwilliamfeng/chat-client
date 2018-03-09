import { constants } from '../constants';






export const configurationReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.GET_COMMON_PHRASE_SUCCESS:
      return {
        ...state,
        commonPhrase: action.commonPhrase,
      };

     

    default:
      return state;
  }

}
