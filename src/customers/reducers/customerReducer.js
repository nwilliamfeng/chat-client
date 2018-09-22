import { constants } from '../constants';


const initState = { customers: [], expandStates: [] };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };

    case constants.Get_CUSTOMER_RELATION_MAPPING_SUCCESS:
      return {
        ...state,
        relationMappingList: action.items,
      }

    case constants.CUSTOMER_EXPAND_STATE_CHANGE:
      let { expandStates } = state;
      let exist = expandStates.find(x => x.panelId === action.panelId);
      if (exist == null) {
        expandStates.push({ panelId: action.panelId, isExpand: action.isExpand });
      }
      else {
        exist.isExpand = action.isExpand;
      }
      return {
        ...state,
        expandStates,
      };

    default:
      return state;
  }

}
