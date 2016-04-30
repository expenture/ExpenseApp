import React, { Component, PropTypes } from 'react';

import AppNavigator from 'components/AppNavigator';
import Platform from 'utils/Platform';

import RootNavigator from 'components/RootNavigator';

import SamplePage from 'views/SamplePage';
import NavigatorTestPage from 'views/NavigatorTestPage';

import MenuContainer from './dev-center/MenuContainer';
import DesignSpecContainer from './dev-center/DesignSpecContainer';
import UIPlaygroundContainer from './dev-center/UIPlaygroundContainer';

export const renderDevCenterScene = (rootNavigator, route, navigator, handleExit) => {
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

  case 'dev-center-design-spec':
    return {
      title: route.specName,
      component: DesignSpecContainer,
      passProps: {
        route,
        specName: route.specName,
        specImageSource: route.specImageSource
      }
    };

  case 'dev-center-ui-playground':
    if (route.componentDemo) {
      return {
        title: route.componentName,
        component: route.componentDemo,
        theme: (route.hideNav ? 'navigationBarHidden' : ''),
        passProps: {
          rootNavigator,
          exitDemo: (() => navigator.pop())
        }
      };
    } else {
      return {
        title: 'UI Playground',
        component: UIPlaygroundContainer,
        passProps: {
          rootNavigator
        }
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
    // The DevCenter must be wrapped in a RootNavigator for some views,
    // if the rootNavigator prop is not passed, then we will warp it here.
    if (this.props.rootNavigator) {
      let { rootNavigator } = this.props;
      return (
        <AppNavigator
          initialRoute={this.props.initialRoute}
          renderScene={(r, n) => renderDevCenterScene(rootNavigator, r, n, this.exit)}
        />
      );
    } else {
      return (
        <RootNavigator
          initialRoute={{}}
          renderScene={(route, rootNavigator) => {
            return route.element || (
              <AppNavigator
                initialRoute={this.props.initialRoute}
                renderScene={(r, n) => renderDevCenterScene(rootNavigator, r, n, this.exit)}
              />
            );
          }}
          configureScene={() => RootNavigator.SceneConfigs.FadeAndroid}
        />
      );
    }
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
