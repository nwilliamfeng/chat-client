import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as loginReducer} from './login';
 
import Perf from 'react-addons-perf'

const win = window;
win.Perf = Perf

const reducer = combineReducers({
  login: loginReducer,
  //todo 添加其他的reducer
});


// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

export default createStore(reducer, {}, storeEnhancers);