import { constants,loginStates } from '../constants';
 


const initState = { loginState:loginStates.NONE, user: null, error: null };

export const authReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.LOGIN_SUCCESS:
      return {
        loginState:loginStates.LOGGED_IN,
        user: action.staff,
      };

    case constants.LOGIN_REQUEST:
      return {
        loginState:loginStates.LOGGING_IN,
      }


    case constants.LOGOUT: //如果是退出，则传空状态
      return {
        loginState:loginStates.LOGGED_OUT
      }

    case constants.LOGIN_FAIL: //如果登录失败，返回消息
      return {
        loginState: loginStates.NONE,
        error: action.error,
      }

    case constants.LOGIN_CLEAR_ERROR:
      return {
        loginState: loginStates.NONE,
        error: null,
      }

    case constants.CLIENT_LOST_HEART:
      return {
        ...state,
        reconnectCount: action.reconnectCount,
      }

    case constants.LOGIN_CHANGE_STATE:
      return {
        ...state,
        user:Object.assign({}, action.staff),
      };

    // case authStates.LOGIN_FETCH_STATE:
    //   return {
    //     isOnline: action.isOnline,
    //     user: action.user,
    //   }



    default:
      return state;
  }

}