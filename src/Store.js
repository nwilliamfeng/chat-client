import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {authReducer} from './auth/reducers';
import {customerReducer} from './customers/reducers';
import {configurationReducer} from './configuration/reducers';
import {chatReducer} from './chat/reducers';
import {homeReducer} from './home/reducers'
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

  /**
   * 聊天的reducer
   */
  chat:chatReducer,

  home:homeReducer,
});



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));