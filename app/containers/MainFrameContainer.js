/**
 * MainFrameContainer
 *
 * The main frame of the app. Tabs and navigations are all controlled here.
 */

import React, { Component } from 'react';

import RootNavigator from 'components/RootNavigator';
import AppNavigator from 'components/AppNavigator';
import TabView from 'components/TabView';
import Platform from 'utils/Platform';

import NewTransactionContainer from './NewTransactionContainer';

import DashboardContainer from './dashboard/DashboardContainer';

import SamplePage from 'views/SamplePage';
import NavigatorTestPage from 'views/NavigatorTestPage';

export default class MainFrameContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 0,
      appNavigators: {},
      appNavigatorKeys: []
    };
  }

  render() {
    const renderRootScene = this.renderRootScene.bind(this);
    const configureRootScene = this.configureRootScene.bind(this);

    return (
      <RootNavigator
        initialRoute={{ name: 'index' }}
        renderScene={renderRootScene}
        configureScene={configureRootScene}
      />
    );
  }

  renderRootScene(rootRoute, rootNavigator) {
    switch (rootRoute.name) {
    case 'index':
      // All AppNavigators uses the same scene configuration, definedin
      // this.renderAppScene
      const renderAppScene = this.renderAppScene.bind(this, rootNavigator);

      return (
        <TabView
          initialTab={0}
          onCurrentTabPress={() => {
            let currentAppNavigator = this.state.appNavigators[this.state.currentTab];
            if (currentAppNavigator) currentAppNavigator.popToTop();
          }}
        >
          <TabView.Item
            title="總覽"
            icon={require('../images/iOS/TabBar/Dashboard.png')}
            selectedIcon={require('../images/iOS/TabBar/Dashboard-Selected.png')}
            onSelect={() => {
              // directly sets the state to avoid rerendering
              this.state.currentTab = 'dashboard';
            }}
          >
            <AppNavigator
              ref={(r) => {
                // directly sets the state to avoid rerendering
                this.state.appNavigators.dashboard = r;
                this.state.appNavigatorKeys.push('dashboard');
              }}
              initialRoute={{ name: 'dashboard', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="交易記錄"
            icon={require('../images/iOS/TabBar/Feed.png')}
            selectedIcon={require('../images/iOS/TabBar/Feed-Selected.png')}
            onSelect={() => {
              // directly sets the state to avoid rerendering
              this.state.currentTab = 'feed';
            }}
          >
            <AppNavigator
              ref={(r) => {
                // directly sets the state to avoid rerendering
                this.state.appNavigators.feed = r;
                this.state.appNavigatorKeys.push('feed');
              }}
              initialRoute={{ name: 'test', root: true, actionSet: 2, nextRoute: {
                name: 'test', actionSet: 1, dark: true, nextRoute: {
                  name: 'test', actionSet: 3, nextRoute: {
                    name: 'test', actionSet: 3, dark: true, nextRoute: {
                      name: 'test'
                    }
                  }
                }
              } }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="金流來往"
            icon={require('../images/iOS/TabBar/MoneyFlow.png')}
            selectedIcon={require('../images/iOS/TabBar/MoneyFlow-Selected.png')}
            onSelect={() => {
              // directly sets the state to avoid rerendering
              this.state.currentTab = 'moneyFlow';
            }}
          >
            <AppNavigator
              ref={(r) => {
                // directly sets the state to avoid rerendering
                this.state.appNavigators.moneyFlow = r;
                this.state.appNavigatorKeys.push('moneyFlow');
              }}
              initialRoute={{ name: 'dashboard', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="帳戶"
            icon={require('../images/iOS/TabBar/Accounts.png')}
            selectedIcon={require('../images/iOS/TabBar/Accounts-Selected.png')}
            onSelect={() => {
              // directly sets the state to avoid rerendering
              this.state.currentTab = 'accounts';
            }}
          >
            <AppNavigator
              ref={(r) => {
                // directly sets the state to avoid rerendering
                this.state.appNavigators.accounts = r;
                this.state.appNavigatorKeys.push('accounts');
              }}
              initialRoute={{ name: 'dashboard', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="更多"
            icon={require('../images/iOS/TabBar/More.png')}
            selectedIcon={require('../images/iOS/TabBar/More-Selected.png')}
            onSelect={() => {
              // directly sets the state to avoid rerendering
              this.state.currentTab = 'more';
            }}
          >
            <AppNavigator
              ref={(r) => {
                // directly sets the state to avoid rerendering
                this.state.appNavigators.more = r;
                this.state.appNavigatorKeys.push('more');
              }}
              initialRoute={{ name: 'dashboard', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>
        </TabView>
      );
    case 'new-transaction':
      return <NewTransactionContainer/>;
    default:
      console.error(`No root-route defined for: ${rootRoute.name}, rootRoute: ${JSON.stringify(rootRoute)}`);
      return null;
    }
  }

  configureRootScene(rootRoute) {
    switch (rootRoute.name) {
    default:
      return RootNavigator.SceneConfigs.FloatFromBottom;
    }
  }

  renderAppScene(rootNavigator, route, navigator) {
    switch (route.name) {
    case 'dashboard':
      return {
        title: '總覽',
        component: DashboardContainer,
        actions: [
          {
            title: 'New',
            show: 'always',
            onSelect: () => rootNavigator.push({ name: 'new-transaction' })
          }
        ]
      };

    case 'sample-page':
      return {
        component: SamplePage,
        title: 'Sample Page'
      };

    case 'test':
      var actions = [];

      if (route.actionSet == 1) {
        actions = [
          { title: 'Back', show: 'always', onSelect: navigator.pop }
        ]
      }

      if (route.actionSet == 2) {
        actions = [
          { title: 'Alert', show: 'always', onSelect: () => alert('hi') }
        ]
      }

      if (route.actionSet == 3) {
        actions = [
          { title: 'Alert Hi', show: 'always', onSelect: () => alert('Hi') },
          { title: 'Alert Yo', show: 'always', onSelect: () => alert('Yo') },
          { title: 'Alert Hello', onSelect: () => alert('Hello') },
          { title: 'Alert Yay!', onSelect: () => alert('Yay!') },
        ]
      }

      let theme;
      if (route.dark) {
        theme = 'dark';
      }

      return {
        component: NavigatorTestPage,
        title: 'Navigator Test Page',
        theme,
        actions: actions,
        passProps: {
          route: route,
          nextRoute: route.nextRoute
        }
      };

    default:
      console.error(`No route defined for: ${route.name}, route: ${JSON.stringify(route)}`);
      return null;
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.registerAndroidHardwareBackPress.bind(this)();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.unRegisterAndroidHardwareBackPress.bind(this)();
    }
  }

  registerAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;

    this.androidHardwareBackPressHandler = () => {
      let currentAppNavigator = this.state.appNavigators[this.state.currentTab];
      if (currentAppNavigator && currentAppNavigator.getRouteStackLength() > 1) {
        currentAppNavigator.pop();
        return true;
      } else {
        return false;
      }
    };

    BackAndroid.addEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }

  unRegisterAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;
    BackAndroid.removeEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }
}
