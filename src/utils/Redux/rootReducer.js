import { combineReducers } from 'redux';

import { app } from './Reducers/app.reducer';

const rootReducer = combineReducers({
  app
});

export default rootReducer;