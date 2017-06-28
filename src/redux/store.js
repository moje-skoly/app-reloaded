import { createStore, combineReducers } from 'redux';
import reducer from './modules/reducer';

const initialState = {};

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
