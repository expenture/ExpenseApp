import React, { Component, PropTypes } from 'react';

import AppNavigator from 'components/AppNavigator';
import Platform from 'utils/Platform';

import SamplePage from 'views/SamplePage';
import NavigatorTestPage from 'views/NavigatorTestPage';

import MenuContainer from './dev-center/MenuContainer';
import UIPlaygroundContainer from './dev-center/UIPlaygroundContainer';

export const renderDevCenterScene = (route, navigator, handleExit) => {
  let actions;

  switch (route.name) {
  case 'dev-center-menu':
    if (handleExit) actions = [{
      title: 'Exit',
      show: 'always',
      onSelect: handleExit
    }];

    return {
      title: 'Dev Center',
      component: MenuContainer,
      actions
    };

  case 'dev-center-ui-playground':
    if (route.componentDemo) {
      return {
        title: route.componentName,
        component: route.componentDemo
      };
    } else {
      return {
        title: 'UI Playground',
        component: UIPlaygroundContainer
      };
    }

  case 'dev-center-nav-demo':
    if (route.actionSet === 1) {
      actions = [
        { title: 'Back', show: 'always', onSelect: navigator.pop }
      ];
    }

    if (route.actionSet === 2) {
      actions = [
        { title: 'Alert', show: 'always', onSelect: () => alert('hi') }
      ];
    }

    if (route.actionSet === 3) {
      actions = [
        { title: 'Alert Hi', show: 'always', onSelect: () => alert('Hi') },
        { title: 'Alert Yo', show: 'always', onSelect: () => alert('Yo') },
        { title: 'Alert Hello', onSelect: () => alert('Hello') },
        { title: 'Alert Yay!', onSelect: () => alert('Yay!') },
      ];
    }
    return {
      component: NavigatorTestPage,
      title: 'Nav TP',
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

export default class DevCenterContainer extends Component {
  static propTypes = {
    initialRoute: PropTypes.object
  };

  static defaultProps = {
    initialRoute: { name: 'dev-center-menu', root: true }
  };

  render() {
    return (
      <AppNavigator
        initialRoute={this.props.initialRoute}
        renderScene={(r, n) => renderDevCenterScene(r, n, this.exit)}
      />
    );
  }

  exit() {
    // TODO: Exit
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
      let nav = this.refs.nav;
      if (nav && nav.getRouteStackLength() > 1) {
        nav.pop();
        return true;
      } else {
        this.exit();
        return true;
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