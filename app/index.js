/**
 * app/index.js
 * The entery point of the application.
 */
'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import AppContainer from './containers';

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
         <AppContainer />
      </Provider>
    );
  }
}
const FBSDK = require('react-native-fbsdk');
window.FBSDK = FBSDK;
