import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import comparison from './comparison';
import detail from './detail';
import filterReducer, { filterEpic } from './filter';

const rootReducer = combineReducers({
  routing: routerReducer,
  comparison,
  detail,
  filter: filterReducer
});

const rootEpic = combineEpics(filterEpic);

export { rootReducer, rootEpic };
