import { combineReducers } from 'redux';
import { authProp } from './authReducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
// import { alert } from './alert.reducer';

export const loginReducer = combineReducers({
  auth, 
//   registration,
//   users,
//   alert
});

 