import React, { Component } from 'react';

import ScrollView from 'components/ScrollView';
import View from 'components/View';
import Text from 'components/Text';
import ListTable from 'components/ListTable';

import AppNavigator from 'components/AppNavigator';

class Page extends Component {
  render() {
    return (
      <ScrollView>
        <ListTable>
          <ListTable.Section>
            <ListTable.Cell
              title="Navigate To A Page"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ One Action"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-one-action' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ Two Actions"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-two-actions' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ Three Actions"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-three-actions' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ Four Actions"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-four-actions' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Page w/ Dark Theme"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-dark-theme' });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Demo Root Page w/ One Action"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-one-action', root: true });
              }}
            />
            <ListTable.Cell
              title="Navigate To A Demo Root Page w/ Two Actions"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'page-with-two-actions', root: true });
              }}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="Execute navigator.pop()"
              onPress={() => {
                this.props.navigator.pop()
              }}
            />
            <ListTable.Cell
              title="Execute navigator.popToTop()"
              onPress={() => {
                this.props.navigator.popToTop()
              }}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="Exit AppNavigator Demo"
              onPress={() => {
                this.props.exitDemo && this.props.exitDemo()
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}

export default class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppNavigator
        initialRoute={{ name: 'index', root: true }}
        renderScene={(route, navigator) => {
          switch (route.name) {
          case 'index':
            return {
              title: 'AppNavigator Demo',
              component: Page,
              actions: [
                {
                  title: 'Exit Demo',
                  show: 'always',
                  onSelect: () => this.props.exitDemo && this.props.exitDemo()
                }
              ],
              passProps: {
                ...this.props
              }
            };

          case 'page':
            return {
              title: 'Page',
              component: Page,
              passProps: {
                ...this.props
              }
            };

          case 'page-with-dark-theme':
            return {
              title: 'Page',
              component: Page,
              theme: 'dark',
              passProps: {
                ...this.props
              }
            };

          case 'page-with-one-action':
            return {
              title: 'Page w/ Action',
              component: Page,
              actions: [
                {
                  title: 'Action',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('The action is selected.')
                }
              ],
              passProps: {
                ...this.props
              }
            };

          case 'page-with-two-actions':
            return {
              title: 'Page w/ Actions',
              component: Page,
              actionsTitle: 'Two Actions',
              actions: [
                {
                  title: 'Action 1',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 1 is selected.')
                },
                {
                  title: 'Action 2',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 2 is selected.')
                }
              ],
              passProps: {
                ...this.props
              }
            };

          case 'page-with-three-actions':
            return {
              title: 'Page w/ Actions',
              component: Page,
              // actionsTitle: null,
              actions: [
                {
                  title: 'Action 1',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 1 is selected.')
                },
                {
                  title: 'Action 2',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 2 is selected.')
                },
                {
                  title: 'Action 3',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 3 is selected.')
                }
              ],
              passProps: {
                ...this.props
              }
            };

          case 'page-with-four-actions':
            return {
              title: 'Page w/ Actions',
              component: Page,
              // actionsTitle: null,
              actions: [
                {
                  title: 'Action 1',
                  show: 'always',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 1 is selected.')
                },
                {
                  title: 'Action 2',
                  show: 'ifRoom',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 2 is selected.')
                },
                {
                  title: 'Action 3',
                  show: 'never',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 3 is selected.')
                },
                {
                  title: 'Action 4',
                  show: 'never',
                  // icon: null,
                  // iconIOS: null,
                  // iconAndroid: null,
                  onSelect: () => alert('Action 4 is selected.')
                }
              ],
              passProps: {
                ...this.props
              }
            };

          }
        }}
      />
    );
  }
}
