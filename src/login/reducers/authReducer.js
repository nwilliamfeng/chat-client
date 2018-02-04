import { authTypes } from '../constants';


//let user = JSON.parse(localStorage.getItem('user'));
const initState = {};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        loggingIn:true,
        user: action.user,
      };

    
    default:
      return state
  }

}