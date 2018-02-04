import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {auth} from './login/reducers/auth';
import thunkMiddleware from 'redux-thunk';
 


const reducer = combineReducers({
  login: auth,
  //todo 添加其他的reducer
});


 



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));