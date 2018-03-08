import { constants } from '../constants';






export const configurationReducer = (state = {}, action) => {
  switch (action.type) {

    case constants.GET_COMMON_PHRASE_SUCCESS:
      return {
        ...state,
        commonPhrase: action.commonPhrase,
      };

    case constants.SELECT_COMMON_PHRASE_NODE:
    return {
      ...state,
      selectedCommonPhraseNode:action.selectedCommonPhraseNode,
    }

    default:
      return state;
  }

}
