import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './rootReducer.js';

const loggerMiddleware = createLogger();

//Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
// Redux Thunk middleware allows you to write action creators that return a function instead of an action.
export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
  // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
