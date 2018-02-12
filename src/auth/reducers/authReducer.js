import { authStates } from '../constants';


//let user = JSON.parse(localStorage.getItem('user'));
const initState = { loggingIn: false, user: null,error:null };

export const authReducer = (state = initState, action) => {
  switch (action.type) {

    case authStates.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };

    case authStates.LOGIN_REQUEST:
      return {
        loggingIn: true,
      }

    case authStates.LOGOUT: //如果是退出，则传空状态
      return {}

    case authStates.LOGIN_FAIL: //如果登录失败，返回消息
      return {
        loggingIn:false,
        error:action.error,
      }

    


    default:
      return state;
  }

}