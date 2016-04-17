import React, { Component } from 'react';
import Navigator from '../components/Navigator';
import scene from './scene';

export default class AppContainer extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'test', nextRoute: { name: 'test', nextRoute: { name: 'test' } } }}
        renderScene={scene}
      />
    );
  }
}
