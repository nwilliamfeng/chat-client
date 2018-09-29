import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './auth/reducers';
import {customerReducer} from './customers/reducers';
import {staffReducer} from './staff/reducers';
import {systemReducer} from './system/reducers';
import {configurationReducer} from './configuration/reducers';
import {chatReducer} from './chat/reducers';
import {historyMessageReducer,messageReducer} from './message/reducers';
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
   * 客服的reducer
   */
  staff:staffReducer,

  /**
   * 配置的reducer
   */
  configuration:configurationReducer,

  /**
   * 聊天的reducer
   */
  chat:chatReducer,

  /**
   * 历史消息reducer
   */
  historyMessage:historyMessageReducer,


  message:messageReducer,

  home:homeReducer,

  system:systemReducer,
});



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));