import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './auth/reducers';
import {customerReducer} from './customers/reducers';
import {staffReducer} from './staff/reducers';
import {configurationReducer} from './configuration/reducers';
import {chatReducer,historyMessageReducer,offlineMessageReducer} from './chat/reducers';
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


  offlineMessage:offlineMessageReducer,

  home:homeReducer,
});



export default createStore(reducer,  applyMiddleware(
  thunkMiddleware,  
));