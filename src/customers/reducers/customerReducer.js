import { customerStates } from '../constants';


const initState = { customers:[], error: null };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case customerStates.Get_CUSTOMER_LIST_SUCCESS:
      return {
       
        customers: action.customers,
      };
 
    default:
      return state;
  }

}
