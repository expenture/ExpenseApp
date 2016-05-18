/**
 * app/index.js
 * The entery point of the application.
 */
'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import AppContainer from './containers';

import exposeModules from './expose-modules';
exposeModules();

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
         <AppContainer />
      </Provider>
    );
  }
}
