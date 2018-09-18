import { constants } from '../constants';

 
const initState = { customers: [],  };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };

      case constants.Get_CUSTOMER_RELATION_MAPPING_SUCCESS:
      return{
        ...state,
        relationMappingList:action.items,
      }
     

    default:
      return state;
  }

}
