import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {authReducer} from './auth/reducers';
import thunkMiddleware from 'redux-thunk'; 
 


const reducer = combineReducers({
  auth: authReducer, //注意此处的reducer命名
  //todo 添加其他的reducer
});



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));