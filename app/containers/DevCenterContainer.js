import React, { Component, PropTypes } from 'react';

import AppNavigator from 'components/AppNavigator';
import Platform from 'utils/Platform';

import RootNavigator from 'components/RootNavigator';

import MenuContainer from './dev-center/MenuContainer';
import ReduxStoreContainer from './dev-center/ReduxStoreContainer';
import BackendSessionContainer from './dev-center/BackendSessionContainer';
import ModelsContainer from './dev-center/ModelsContainer';
import AppRealmContainer from './dev-center/AppRealmContainer';
import ExpentureAPIContainer from './dev-center/ExpentureAPIContainer';
import PushNotificationContainer from './dev-center/PushNotificationContainer';
import FBAPIContainer from './dev-center/FBAPIContainer';
import DeviceInfoContainer from './dev-center/DeviceInfoContainer';
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

  case 'dev-center-redux-store':
    return {
      title: 'Store',
      component: ReduxStoreContainer
    };

  case 'dev-center-BackendSession':
    return {
      title: 'Backend Session Controller',
      component: BackendSessionContainer
    };

  case 'dev-center-models':
    return {
      title: 'Models',
      component: ModelsContainer
    };

  case 'dev-center-AppRealm':
    return {
      title: 'Realm',
      component: AppRealmContainer
    };

  case 'dev-center-ExpentureAPI':
    return {
      title: 'ExpentureAPI',
      component: ExpentureAPIContainer
    };

  case 'dev-center-PushNotification':
    return {
      title: 'PushNotification',
      component: PushNotificationContainer
    };

  case 'dev-center-FBAPI':
    return {
      title: 'FBAPI',
      component: FBAPIContainer
    };

  case 'dev-center-DeviceInfo':
    return {
      title: 'DeviceInfo',
      component: DeviceInfoContainer
    };

  case 'dev-center-design-spec':
    return {
      title: route.specName || 'Design Spec',
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
