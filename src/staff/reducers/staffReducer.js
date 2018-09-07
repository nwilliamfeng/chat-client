import { constants } from '../constants';

 
const initState = {   staffs: []  };

export const staffReducer = (state = initState, action) => {
  switch (action.type) {

     

    case constants.Get_STAFF_LIST_SUCCESS:
      return {
        ...state,
        staffs: action.staffs,
      };

   

    default:
      return state;
  }

}
