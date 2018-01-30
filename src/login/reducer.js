import {LOGIN,LOGOUT} from './actionTypes';
import {loginApi} from './api';
 

const initialState = {
    formState: {
      username: '',
      password: ''
    },
   
  //  loggedIn: auth.loggedIn(),
    errorMessage: ''
  };

export default(state =initialState,action)=>{  
        switch (action.type) {
          case CHANGE_FORM:
            return assign({}, state, {
              formState: action.newState
            });
            break;
          case SET_AUTH:
            return assign({}, state, {
              loggedIn: action.newState
            });
            break;
          case SENDING_REQUEST:
            return assign({}, state, {
              currentlySending: action.sending
            });
            break;
          case SET_ERROR_MESSAGE:
            return assign({}, state, {
              errorMessage: action.message
            });
          default:
            return state;
        }
    }