import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { rootReducer, rootEpic } from './modules/root';
import ApiClient from '../helpers/ApiClient';

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { apiClient: new ApiClient() }
});

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(epicMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const history = syncHistoryWithStore(browserHistory, store);

export { store, history };
