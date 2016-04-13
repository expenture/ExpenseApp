/**
 * app/index.js
 * Entery point of the application.
 */
'use strict';

import React, { Component } from 'react';

import SamplePage from 'views/SamplePage';

export default class Application extends Component {
  render() {
    return (
      <SamplePage />
    );
  }
}
