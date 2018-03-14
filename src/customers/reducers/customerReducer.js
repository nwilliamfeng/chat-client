import { constants } from '../constants';

 
const initState = { customers: [], staffs: []  };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.Get_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };

    case constants.Get_STAFF_LIST_SUCCESS:
      return {
        ...state,
        staffs: action.staffs,
      };

   

    default:
      return state;
  }

}
