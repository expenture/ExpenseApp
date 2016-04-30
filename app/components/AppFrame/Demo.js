import React, { Component } from 'react';

import ScrollView from 'components/ScrollView';
import View from 'components/View';
import Text from 'components/Text';
import ListTable from 'components/ListTable';
import StatusBar from 'components/StatusBar';

import AppFrame from 'components/AppFrame';

export default class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppFrame
        tabs={[
          {
            title: 'First Tab',
            initialRoute: { name: 'first-tab-index' },
            icon: null,
            selectedIcon: null,
            iconIOS: null,
            selectedIconIOS: null,
            iconAndroid: null,
            selectedIconAndroid: null
          },
          {
            title: 'Second Tab',
            initialRoute: { name: 'second-tab-index' }
          },
          {
            title: 'Third Tab',
            initialRoute: { name: 'page' }
          }
        ]}
        onCurrentTabPress={() => alert('CurrentTabPress.')}
        renderRootScene={(rootRoute, rootNavigator) => {
          switch (rootRoute.name) {
          case 'page':
            const pageNum = parseInt(Math.random()*1000, 10);
            return {
              component: Page,
              passProps: {
                exitDemo: this.props.exitDemo,
                pageNum: `${pageNum} (root navigator)`,
                alertOnFocus: rootRoute.alertOnFocus
              }
            };
          }
        }}
        renderAppScene={(route, navigator, rootRoute, rootNavigator) => {
          switch (route.name) {
          case 'first-tab-index':
            return {
              title: 'Index 1',
              component: Page,
              actions: [
                {
                  title: 'Exit Demo',
                  onSelect: () => this.props.exitDemo && this.props.exitDemo()
                }
              ],
              passProps: {
                exitDemo: this.props.exitDemo,
                pageNum: 'first-tab-index'
              }
            };

          case 'second-tab-index':
            return {
              title: 'Index 2',
              component: Page,
              passProps: {
                exitDemo: this.props.exitDemo,
                pageNum: 'second-tab-index'
              }
            };

          case 'page':
            const pageNum = parseInt(Math.random()*1000, 10);
            return {
              title: `Page ${pageNum}`,
              component: Page,
              passProps: {
                exitDemo: this.props.exitDemo,
                pageNum: pageNum,
                alertOnFocus: route.alertOnFocus
              }
            };
          }
        }}
      />
    );
  }
}


class Page extends Component {
  componentWillMount() {
    this.props.onConstruct(this);
  }

  componentWillUnmount() {
    this.props.onDestruct(this);
  }

  onFocus() {
    if (this.props.alertOnFocus) {
      alert(`Page ${this.props.pageNum} focused.`);
    }
  }

  onRefresh() {
    alert(`Alert: onRefresh() called on page ${this.props.pageNum}.`);
  }

  render() {
    return (
      <ScrollView>
        <ListTable>
          <StatusBar
            barStyle={this.props.statusBarStyle || 'default'}
            animated={true}
          />
          <ListTable.Section>
            <ListTable.Cell
              title="Navigate To A Page"
              navigated={true}
              onPress={() => {
                if (!this.props.navigator) {
                  alert('No navigator (this.props.navigator).');
                  return;
                }
                this.props.navigator.push({ name: 'page' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ onFocus Callback"
              navigated={true}
              onPress={() => {
                if (!this.props.navigator) {
                  alert('No navigator (this.props.navigator).');
                  return;
                }
                this.props.navigator.push({ name: 'page', alertOnFocus: true });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page (rootNavigator)"
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page (rootNavigator) w/ onFocus Callback"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', alertOnFocus: true });
              }}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="Execute navigator.pop()"
              onPress={() => {
                if (!this.props.navigator) {
                  alert('No navigator (this.props.navigator).');
                  return;
                }
                this.props.navigator.pop();
              }}
            />
            <ListTable.Cell
              title="Execute navigator.popToTop()"
              onPress={() => {
                if (!this.props.navigator) {
                  alert('No navigator (this.props.navigator).');
                  return;
                }
                this.props.navigator.popToTop();
              }}
            />
            <ListTable.Cell
              title="Execute rootNavigator.pop()"
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.pop();
              }}
            />
            <ListTable.Cell
              title="Execute rootNavigator.popToTop()"
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.popToTop();
              }}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="Root Navigate w/ Animation pushFromRight"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'pushFromRight' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation floatFromRight"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'floatFromRight' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation floatFromLeft"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'floatFromLeft' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation floatFromBottom"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'floatFromBottom' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation fade"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'fade' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation horizontalSwipeJump"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'horizontalSwipeJump' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation horizontalSwipeJumpFromRight"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'horizontalSwipeJumpFromRight' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation verticalUpSwipeJump"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'verticalUpSwipeJump' });
              }}
            />
            <ListTable.Cell
              title="Root Navigate w/ Animation verticalDownSwipeJump"
              navigated={true}
              onPress={() => {
                if (!this.props.rootNavigator) {
                  alert('No rootNavigator (this.props.rootNavigator).');
                  return;
                }
                this.props.rootNavigator.push({ name: 'page', animation: 'verticalDownSwipeJump' });
              }}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="Exit AppFrame Demo"
              onPress={() => {
                this.props.exitDemo && this.props.exitDemo();
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
