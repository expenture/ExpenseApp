/**
 * MainFrameContainer
 *
 * The main frame of the app, containing root-level navigation, the tab view
 * and navigations in each tab.
 */

import React, {
  PropTypes,
  Component
} from 'react';

import RootNavigator from 'components/RootNavigator';
import AppNavigator from 'components/AppNavigator';
import TabView from 'components/TabView';

import NewTransactionContainer from './NewTransactionContainer';

import DashboardContainer from './dashboard/DashboardContainer';

import SamplePage from 'views/SamplePage';
import NavigatorTestPage from 'views/NavigatorTestPage';

export default class MainFrameContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <RootNavigator
        initialRoute={{ name: 'index' }}
        renderScene={(rootRoute, rootNavigator) => {
          switch (rootRoute.name) {
          case 'index':
            return <AppTabView rootNavigator={rootNavigator} />;
          case 'new-transaction':
            return <NewTransactionContainer/>;
          default:
            console.error(`No root-route defined for: ${rootRoute.name}, rootRoute: ${JSON.stringify(rootRoute)}`);
            return null;
          }
        }}
        configureScene={(rootRoute) => {
          switch (rootRoute.name) {
          default:
            return RootNavigator.SceneConfigs.FloatFromBottom;
          }
        }}
      />
    );
  }
}

class AppTabView extends Component {
  static propTypes = {
    rootNavigator: PropTypes.object.isRequired
  };

  render() {
    const { rootNavigator } = this.props;
    const renderScene = (route, navigator) => appScene(route, navigator, rootNavigator);

    return (
      <TabView>
        <TabView.Item
          title="總覽"
          icon={require('../images/iOS/TabBar/Dashboard.png')}
          selectedIcon={require('../images/iOS/TabBar/Dashboard-Selected.png')}
        >
          <AppNavigator
            initialRoute={{ name: 'dashboard', root: true }}
            renderScene={renderScene}
          />
        </TabView.Item>

        <TabView.Item
          title="交易記錄"
          icon={require('../images/iOS/TabBar/Feed.png')}
          selectedIcon={require('../images/iOS/TabBar/Feed-Selected.png')}
        >
          <AppNavigator
            initialRoute={{ name: 'test', root: true, actionSet: 2, nextRoute: {
              name: 'test', actionSet: 1, dark: true, nextRoute: {
                name: 'test', actionSet: 3, nextRoute: {
                  name: 'test', actionSet: 3, dark: true, nextRoute: {
                    name: 'test'
                  }
                }
              }
            } }}
            renderScene={renderScene}
          />
        </TabView.Item>

        <TabView.Item
          title="金流來往"
          icon={require('../images/iOS/TabBar/MoneyFlow.png')}
          selectedIcon={require('../images/iOS/TabBar/MoneyFlow-Selected.png')}
        >
          <AppNavigator
            initialRoute={{ name: 'dashboard', root: true }}
            renderScene={renderScene}
          />
        </TabView.Item>

        <TabView.Item
          title="帳戶"
          icon={require('../images/iOS/TabBar/Accounts.png')}
          selectedIcon={require('../images/iOS/TabBar/Accounts-Selected.png')}
        >
          <AppNavigator
            initialRoute={{ name: 'dashboard', root: true }}
            renderScene={renderScene}
          />
        </TabView.Item>

        <TabView.Item
          title="更多"
          icon={require('../images/iOS/TabBar/More.png')}
          selectedIcon={require('../images/iOS/TabBar/More-Selected.png')}
        >
          <AppNavigator
            initialRoute={{ name: 'dashboard', root: true }}
            renderScene={renderScene}
          />
        </TabView.Item>
      </TabView>
    );
  }
}

const appScene = (route, navigator, rootNavigator) => {
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
};
