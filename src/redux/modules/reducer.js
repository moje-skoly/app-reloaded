import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import comparison from './comparison';
import detail from './detail';
import filter from './filter';

export default combineReducers({
  routing: routerReducer,
  comparison,
  detail,
  filter
});
