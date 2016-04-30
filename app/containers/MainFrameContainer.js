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

import { renderDevCenterScene } from './DevCenterContainer';

import NewTransactionContainer from './NewTransactionContainer';

import DashboardContainer from './dashboard/DashboardContainer';
import FeedContainer from './feed/FeedContainer';
import MoneyFlowContainer from './money-flow/MoneyFlowContainer';
import AccountsContainer from './accounts/AccountsContainer';
import MoreMenuContainer from './more/MoreMenuContainer';
import NotificationsContainer from './more/NotificationsContainer';

export default class MainFrameContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 0,
      appNavigators: {},
      appNavigatorKeys: ['dashboard', 'feed', 'money-flow', 'accounts', 'more'],
      appNavigatorRefStacks: {}
    };
    this.directlySetState = this.directlySetState.bind(this);
    this.registerAppNavigator = this.registerAppNavigator.bind(this);
    this.touchDevCenterTrigger = this.touchDevCenterTrigger.bind(this);
    this.loadDevCenter = this.loadDevCenter.bind(this);
    this.renderSceneFuncForAppNavigatorConstructor = this.renderSceneFuncForAppNavigatorConstructor.bind(this);
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
      const renderSceneFuncForAppNavigator = this.renderSceneFuncForAppNavigatorConstructor(rootNavigator);

      return (
        <TabView
          initialTab={0}
          onCurrentTabPress={() => {
            let currentAppNavigator = this.state.appNavigators[this.state.currentTab];
            if (currentAppNavigator) currentAppNavigator.popToTop();

            this.touchDevCenterTrigger();
          }}
          onTabSelected={(tabIndex) => {
            let appNavigatorName = this.state.appNavigatorKeys[tabIndex];
            if (!appNavigatorName) return;
            let appNavigatorRefStack = this.state.appNavigatorRefStacks[appNavigatorName];
            if (!appNavigatorRefStack) return;
            let appNavigatorCurrentRef = appNavigatorRefStack[appNavigatorRefStack.length - 1];
            appNavigatorCurrentRef && appNavigatorCurrentRef.onFocus && appNavigatorCurrentRef.onFocus();
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
              renderScene={renderSceneFuncForAppNavigator('dashboard')}
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
              renderScene={renderSceneFuncForAppNavigator('feed')}
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
              renderScene={renderSceneFuncForAppNavigator('money-flow')}
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
              renderScene={renderSceneFuncForAppNavigator('accounts')}
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
              renderScene={renderSceneFuncForAppNavigator('more')}
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

  renderAppScene(rootNavigator, navigatorName, route, navigator) {
    const onConstruct = (ref) => {
      if (!this.state.appNavigatorRefStacks[navigatorName]) {
        this.state.appNavigatorRefStacks[navigatorName] = [];
      }
      this.state.appNavigatorRefStacks[navigatorName].push(ref);
      ref.onFocus && ref.onFocus();
    };
    const onDestruct = () => {
      this.state.appNavigatorRefStacks[navigatorName].pop();
      let rs = this.state.appNavigatorRefStacks[navigatorName];
      let ref = rs[rs.length - 1];
      ref && ref.onFocus && ref.onFocus();
    };
    const propsBase = {
      rootNavigator,
      navigator,
      route,
      onConstruct,
      onDestruct
    };

    switch (route.name) {
    case 'dashboard':
      return {
        title: 'Expense',
        component: DashboardContainer,
        theme: 'dark',
        passProps: {
          ...propsBase
        },
        actions: [
          {
            title: 'Notifications',
            show: 'always',
            icon: require('../images/iOS/Toolbar/Notifications-White.png'),
            onSelect: () => navigator.push({ name: 'notifications' })
          },
          {
            title: 'New',
            show: 'always',
            icon: require('../images/iOS/Toolbar/Create-White.png'),
            onSelect: () => rootNavigator.push({ name: 'new-transaction' })
          }
        ]
      };

    case 'feed':
      return {
        title: 'Feed',
        component: FeedContainer,
        passProps: {
          ...propsBase
        }
      };

    case 'money-flow':
      return {
        title: 'Money Flow',
        component: MoneyFlowContainer,
        passProps: {
          ...propsBase
        }
      };

    case 'accounts':
      return {
        title: 'Accounts',
        component: AccountsContainer,
        passProps: {
          ...propsBase
        }
      };

    case 'more':
    case 'more-menu':
      return {
        title: 'More',
        component: MoreMenuContainer,
        passProps: {
          ...propsBase
        }
      };

    case 'notifications':
      return {
        title: 'Notifications',
        component: NotificationsContainer,
        passProps: {
          ...propsBase
        }
      };

    default:
      return renderDevCenterScene(route, navigator);
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
    if (!this.state.appNavigatorKeys.includes(name)) {
      this.state.appNavigatorKeys.push(name);
    }
    if (!this.state.appNavigatorRefStacks[name]) {
      this.state.appNavigatorRefStacks[name] = [];
    }
  }

  renderSceneFuncForAppNavigatorConstructor(rootNavigator) {
    return (name) => this.renderAppScene.bind(this, rootNavigator, name);
  }

  touchDevCenterTrigger() {
    if (!this.dtc) this.dtc = 0;
    this.dtc++;

    if (this.dtc > 9) {
      this.dtc = 0;
      this.loadDevCenter();
    }

    if (this.tdt) clearTimeout(this.tdt);
    this.tdt = setTimeout(() => {
      this.dtc = 0;
    }, 1000);
  }

  loadDevCenter() {
    // This is a place to load development test content
    let currentAppNavigator = this.state.appNavigators[this.state.currentTab];
    currentAppNavigator.push({ name: 'dev-center-menu' });
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
