import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import comparison from './comparison';
import detail from './detail';
import filter from './filter';

export default combineReducers({
  router: routerStateReducer,
  comparison,
  detail,
  filter
});
