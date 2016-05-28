/**
 * MainFrameContainer
 *
 * The main frame of the app. Tabs and navigations are all controlled here.
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import AppFrame from 'components/AppFrame';

import { renderDevCenterScene } from './DevCenterContainer';

import NewTransactionContainer from './NewTransactionContainer';

import DashboardContainer from './dashboard/DashboardContainer';
import FeedContainer from './feed/FeedContainer';
import MoneyFlowContainer from './money-flow/MoneyFlowContainer';
import AccountsContainer from './accounts/AccountsContainer';
import MoreMenuContainer from './more/MoreMenuContainer';
import NotificationsContainer from './more/NotificationsContainer';

export default class MainFrameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <AppFrame
        ref="appFrame"
        tabs={[
          {
            title: '概覽',
            icon: require('../images/iOS/TabBar/Dashboard.png'),
            selectedIcon: require('../images/iOS/TabBar/Dashboard-Selected.png'),
            initialRoute: { name: 'dashboard' }
          },
          {
            title: '時間軸',
            icon: require('../images/iOS/TabBar/Feed.png'),
            selectedIcon: require('../images/iOS/TabBar/Feed-Selected.png'),
            initialRoute: { name: 'feed' }
          },
          {
            title: '帳務處理',
            icon: require('../images/iOS/TabBar/MoneyFlow.png'),
            selectedIcon: require('../images/iOS/TabBar/MoneyFlow-Selected.png'),
            initialRoute: { name: 'money-flow' }
          },
          {
            title: '帳戶',
            icon: require('../images/iOS/TabBar/Accounts.png'),
            selectedIcon: require('../images/iOS/TabBar/Accounts-Selected.png'),
            initialRoute: { name: 'accounts' }
          },
          {
            title: '更多',
            icon: require('../images/iOS/TabBar/More.png'),
            selectedIcon: require('../images/iOS/TabBar/More-Selected.png'),
            initialRoute: { name: 'more' }
          }
        ]}
        renderRootScene={(rootRoute, rootNavigator) => {
          switch (rootRoute.name) {
          case 'new-transaction':
            return {
              component: NewTransactionContainer
            };
          default:
            if (rootRoute.element) {
              return rootRoute.element;
            } else {
              console.error(`No root-route defined for: ${rootRoute.name}, rootRoute: ${JSON.stringify(rootRoute)}`);
              return null;
            }
          }
        }}
        renderAppScene={(route, navigator, rootRoute, rootNavigator) => {
          switch (route.name) {
          case 'dashboard':
            return {
              title: 'Expense',
              component: DashboardContainer,
              theme: 'dark',
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
              theme: 'no-bar',
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
              theme: 'dark',
              component: NotificationsContainer
            };

          default:
            return renderDevCenterScene(rootNavigator, route, navigator);
          }
        }}
        onCurrentTabPress={() => this.touchDevCenterTrigger()}
      />
    );
  }

  @autobind
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

  @autobind
  loadDevCenter() {
    let currentAppNavigator = this.refs.appFrame.getCurrentAppNavigator();
    currentAppNavigator.push({ name: 'dev-center-menu' });
  }
}
