/**
 * app/index.js
 * Entery point of the application.
 */
'use strict';

import React, { Component } from 'react';
import AppContainer from './containers';

export default class Application extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}