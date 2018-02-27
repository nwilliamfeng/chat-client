import { customerStates } from '../constants';


const initState = {  staffs: [], customers: [],error: null };

export const customerReducer = (state = initState, action) => {
  switch (action.type) {

    case customerStates.Get_CUSTOMER_LIST_SUCCESS:
      return {
        customers: action.customers,
      };

    case customerStates.Get_STAFF_LIST_SUCCESS:
      return {
        staffs: action.staffs,
      };

    default:
      return state;
  }

}
