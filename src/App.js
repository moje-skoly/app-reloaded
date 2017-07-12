import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Rx from 'rxjs';

import { Layout } from './containers';

import {
  About,
  Home,
  How,
  // Detail,
  // Comparison,
  Contact,
  Filter,
  NotFound,
  SchoolPreview
} from './pages';

import { store, history } from './redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>
            {/* Home (main) route */}
            <IndexRoute component={Home} />

            <Route path="filter/:address/:schoolType" component={Filter}>
              <Route path="preview/:previewId" component={SchoolPreview} />
            </Route>

            {/* Detail of a school * /}
              <Route path="detail/:schoolId" component={Detail} />

              {/* Comparison of multiple schools * /}
              <Route path="comparison/:schoolIds" component={Comparison} />

              {/* Static pages */}
            <Route path="o-projektu/:projekt" component={About} />
            <Route path="manifest" component={How} />
            <Route path="kontakt" component={Contact} />

            {/* Catch all route */}
            <Route path="*" component={NotFound} status={404} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
