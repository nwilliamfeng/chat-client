import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {authReducer} from './auth/reducers';
import {customerReducer} from './customers/reducers';
import {configurationReducer} from './configuration/reducers';
import thunkMiddleware from 'redux-thunk'; 
 


const reducer = combineReducers({
  /**
   * 授权的reducer
   */
  auth: authReducer,  

  /**
   * 客户的reducer
   */
  customer:customerReducer,

  /**
   * 配置的reducer
   */
  configuration:configurationReducer,
});



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));