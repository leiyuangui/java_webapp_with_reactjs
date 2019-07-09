import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Redirect, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()

import Promise from 'promise-polyfill';
import 'whatwg-fetch'

import LoginContainer from './containers/LoginContainer'
import HomeContainer from './containers/HomeContainer'

import NotFound from './components/NotFound'

if (!window.Promise) {
  window.Promise = Promise;
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={CONTEXT_PATH}>
      <div>
        <Switch>
          <Route path="/login" component={LoginContainer}/>
          <Route path="/home" component={HomeContainer}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById(
    'app'
  )
);
