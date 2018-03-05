import { constants } from '../constants';


const initState = { loggingIn: false, user: null, error: null };

export const authReducer = (state = initState, action) => {
  switch (action.type) {

    case constants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.staff,
      };

    case constants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      }


    case constants.LOGOUT: //如果是退出，则传空状态
      return {}

    case constants.LOGIN_FAIL: //如果登录失败，返回消息
      return {
        loggingIn: false,
        error: action.error,
      }

    case constants.LOGIN_CLEAR_ERROR:
      return {
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