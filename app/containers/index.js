import React, { Component } from 'react';
import Navigator from '../components/Navigator';
import scene from './scene';

export default class AppContainer extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'test', root: true, actionSet: 2, nextRoute: {
          name: 'test', actionSet: 1, dark: true, nextRoute: {
            name: 'test', actionSet: 3, nextRoute: {
              name: 'test', actionSet: 3, dark: true, nextRoute: {
                name: 'test'
              }
            }
          }
        } }}
        renderScene={scene}
      />
    );
  }
}
