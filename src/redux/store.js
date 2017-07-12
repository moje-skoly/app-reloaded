import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { rootReducer, rootEpic } from './modules/root';

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(createEpicMiddleware(rootEpic)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const history = syncHistoryWithStore(browserHistory, store);

export { store, history };
