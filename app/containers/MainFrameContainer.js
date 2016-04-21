/**
 * MainFrameContainer
 *
 * The main frame of the app. Tabs and navigations are all controlled here.
 */

import React, { Component } from 'react';

import RootNavigator from 'components/RootNavigator';
import AppNavigator from 'components/AppNavigator';
import TabView from 'components/TabView';
import config from 'config';
import Platform from 'utils/Platform';

import NewTransactionContainer from './NewTransactionContainer';

import DashboardContainer from './dashboard/DashboardContainer';
import FeedContainer from './feed/FeedContainer';
import MoneyFlowContainer from './money-flow/MoneyFlowContainer';
import AccountsContainer from './accounts/AccountsContainer';
import MoreMenuContainer from './more/MoreMenuContainer';
import NotificationsContainer from './more/NotificationsContainer';

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
    this.directlySetState = this.directlySetState.bind(this);
    this.registerAppNavigator = this.registerAppNavigator.bind(this);
    this.touchDevTestTrigger = this.touchDevTestTrigger.bind(this);
    this.loadDevTest = this.loadDevTest.bind(this);
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

            // For dev test
            this.touchDevTestTrigger();
          }}
        >
          <TabView.Item
            title="概覽"
            icon={require('../images/iOS/TabBar/Dashboard.png')}
            selectedIcon={require('../images/iOS/TabBar/Dashboard-Selected.png')}
            onSelect={() => this.directlySetState({ currentTab: 'dashboard' })}
          >
            <AppNavigator
              ref={(r) => this.registerAppNavigator('dashboard', r)}
              initialRoute={{ name: 'dashboard', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="交易記錄"
            icon={require('../images/iOS/TabBar/Feed.png')}
            selectedIcon={require('../images/iOS/TabBar/Feed-Selected.png')}
            onSelect={() => this.directlySetState({ currentTab: 'feed' })}
          >
            <AppNavigator
              ref={(r) => this.registerAppNavigator('feed', r)}
              initialRoute={{ name: 'feed', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="金流來往"
            icon={require('../images/iOS/TabBar/MoneyFlow.png')}
            selectedIcon={require('../images/iOS/TabBar/MoneyFlow-Selected.png')}
            onSelect={() => this.directlySetState({ currentTab: 'money-flow' })}
          >
            <AppNavigator
              ref={(r) => this.registerAppNavigator('money-flow', r)}
              initialRoute={{ name: 'money-flow', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="帳戶"
            icon={require('../images/iOS/TabBar/Accounts.png')}
            selectedIcon={require('../images/iOS/TabBar/Accounts-Selected.png')}
            onSelect={() => this.directlySetState({ currentTab: 'accounts' })}
          >
            <AppNavigator
              ref={(r) => this.registerAppNavigator('accounts', r)}
              initialRoute={{ name: 'accounts', root: true }}
              renderScene={renderAppScene}
            />
          </TabView.Item>

          <TabView.Item
            title="更多"
            icon={require('../images/iOS/TabBar/More.png')}
            selectedIcon={require('../images/iOS/TabBar/More-Selected.png')}
            onSelect={() => this.directlySetState({ currentTab: 'more' })}
          >
            <AppNavigator
              ref={(r) => this.registerAppNavigator('more', r)}
              initialRoute={{ name: 'more', root: true }}
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
        title: config.appName,
        component: DashboardContainer,
        actions: [
          {
            title: 'Notifications',
            show: 'always',
            onSelect: () => navigator.push({ name: 'notifications' })
          },
          {
            title: 'New',
            show: 'always',
            onSelect: () => rootNavigator.push({ name: 'new-transaction' })
          }
        ]
      };

    case 'feed':
      return {
        title: 'Feed',
        component: FeedContainer
      };

    case 'money-flow':
      return {
        title: 'Money Flow',
        component: MoneyFlowContainer
      };

    case 'accounts':
      return {
        title: 'Accounts',
        component: AccountsContainer
      };

    case 'more':
    case 'more-menu':
      return {
        title: 'More',
        component: MoreMenuContainer
      };

    case 'notifications':
      return {
        title: 'Notifications',
        component: NotificationsContainer
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

  directlySetState(newState) {
    // directly sets the state to avoid rerendering
    this.state = {
      ...this.state,
      ...newState
    };
  }

  registerAppNavigator(name, ref) {
    // directly sets the state to avoid rerendering
    this.state.appNavigators[name] = ref;
    this.state.appNavigatorKeys.push(name);
  }

  touchDevTestTrigger() {
    if (!this.dtc) this.dtc = 0;
    this.dtc++;

    if (this.dtc > 9) {
      this.dtc = 0;
      this.loadDevTest();
    }

    if (this.tdt) clearTimeout(this.tdt);
    this.tdt = setTimeout(() => {
      this.dtc = 0;
    }, 1000);
  }

  loadDevTest() {
    // This is a place to load development test content
    let currentAppNavigator = this.state.appNavigators[this.state.currentTab];
    currentAppNavigator.push(
      {
        name: 'test', root: true, actionSet: 2, nextRoute: {
          name: 'test', actionSet: 1, dark: true, nextRoute: {
            name: 'test', actionSet: 3, nextRoute: {
              name: 'test', actionSet: 3, dark: true, nextRoute: {
                name: 'test'
              }
            }
          }
        }
      }
    );
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
