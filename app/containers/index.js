import React, { Component } from 'react';
import TabView from 'components/TabView';
import Navigator from 'components/Navigator';
import scene from './scene';

export default class AppContainer extends Component {
  render() {
    return (
      <TabView>
        <TabView.Item
          title="First Tab"
        >
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
        </TabView.Item>
        <TabView.Item
          title="Second Tab"
        >
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
        </TabView.Item>
      </TabView>
    );
  }
}
