import { constants } from '../constants';

 
const initState = { customers: [],  };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };

     

    default:
      return state;
  }

}
