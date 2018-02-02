import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as loginReducer} from './login';
 
 

 

const reducer = combineReducers({
  login: loginReducer,
  //todo 添加其他的reducer
});


const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  
);

export default createStore(reducer, {}, storeEnhancers);