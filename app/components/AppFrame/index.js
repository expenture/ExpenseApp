/**
 * @providesModule components/AppFrame
 */

import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import RootNavigator from 'components/RootNavigator';
import AppNavigator from 'components/AppNavigator';
import TabView from 'components/TabView';
import Platform from 'utils/Platform';

export default class AppFrame extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    renderRootScene: PropTypes.func.isRequired,
    configureRootScene: PropTypes.func,
    onCurrentTabPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      rootNavigatorRefStack: [],
      currentTab: 0,
      appNavigators: {},
      appNavigatorRefStacks: {}
    };
  }

  render() {
    const { renderTabView } = this;
    const { renderRootScene, configureRootScene } = this.props;

    return (
      <RootNavigator
        ref="rootNavigator"
        initialRoute={{ name: 'index' }}
        renderScene={(rootRoute, rootNavigator) => {
          if (rootRoute.element) return rootRoute.element;

          if (rootRoute.name === 'index') {
            return renderTabView(rootRoute, rootNavigator);
          } else {
            const onConstruct = (ref) => {
              this._setFocusFor(ref);
              this.state.rootNavigatorRefStack.push(ref);
            };

            const onDestruct = () => {
              this.state.rootNavigatorRefStack.pop();
              if (this.state.rootNavigatorRefStack.length === 0) {
                let rs = this.state.appNavigatorRefStacks[this.state.currentTab];
                let ref = rs && rs[rs.length - 1];
                this._setFocusFor(ref);
              }
            };

            const sceneObj = renderRootScene(rootRoute, rootNavigator);
            return (
              <sceneObj.component
                rootRoute={rootRoute}
                rootNavigator={rootNavigator}
                route={rootRoute}
                navigator={rootNavigator}
                onConstruct={onConstruct}
                onDestruct={onDestruct}
                {...sceneObj.passProps}
              />
            );
          }
        }}
        configureScene={(route, routeStack) => {
          if (route.animation && RootNavigator.SceneConfigs) switch (route.animation) {
          case 'pushFromRight':
            return RootNavigator.SceneConfigs.PushFromRight;
          case 'floatFromRight':
            return RootNavigator.SceneConfigs.FloatFromRight;
          case 'floatFromLeft':
            return RootNavigator.SceneConfigs.FloatFromLeft;
          case 'floatFromBottom':
            return RootNavigator.SceneConfigs.FloatFromBottom;
          case 'fade':
            return RootNavigator.SceneConfigs.FadeAndroid;
          case 'horizontalSwipeJump':
            return RootNavigator.SceneConfigs.HorizontalSwipeJump;
          case 'horizontalSwipeJumpFromRight':
            return RootNavigator.SceneConfigs.HorizontalSwipeJumpFromRight;
          case 'verticalUpSwipeJump':
            return RootNavigator.SceneConfigs.VerticalUpSwipeJump;
          case 'verticalDownSwipeJump':
            return RootNavigator.SceneConfigs.VerticalDownSwipeJump;
          }

          return configureRootScene && configureRootScene(route, routeStack) ||
                 RootNavigator.SceneConfigs.FloatFromBottom;
        }}
      />
    );
  }

  @autobind
  renderTabView(rootRoute, rootNavigator) {
    const { tabs, renderAppScene } = this.props;
    // const renderSceneFuncForAppNavigator = this.renderSceneFuncForAppNavigatorConstructor(rootNavigator);

    return (
      <TabView
        initialTab={0}
        onCurrentTabPress={() => {
          const currentAppNavigatorRefStack = this.getCurrentAppNavigatorRefStack();
          if (currentAppNavigatorRefStack && currentAppNavigatorRefStack.length === 1) {
            const rootRef = currentAppNavigatorRefStack[0];
            rootRef.onRefresh && rootRef.onRefresh();
          }

          const currentAppNavigator = this.getCurrentAppNavigator();
          if (currentAppNavigator) currentAppNavigator.popToTop();

          this.props.onCurrentTabPress && this.props.onCurrentTabPress();
        }}
        onTabSelected={(tabIndex) => {
          let appNavigatorRefStack = this.state.appNavigatorRefStacks[tabIndex];
          if (!appNavigatorRefStack) return;
          let appNavigatorCurrentRef = appNavigatorRefStack[appNavigatorRefStack.length - 1];
          this._setFocusFor(appNavigatorCurrentRef);
        }}
      >
        {tabs.map((tab, tabIndex) => {
          return (
            <TabView.Item
              key={tabIndex}
              title={tab.title}
              icon={tab.icon}
              selectedIcon={tab.selectedIcon}
              iconIOS={tab.iconIOS}
              selectedIconIOS={tab.selectedIconIOS}
              iconAndroid={tab.iconAndroid}
              selectedIconAndroid={tab.selectedIconAndroid}
              onSelect={() => this.directlySetState({ currentTab: tabIndex })}
            >
              <AppNavigator
                ref={(r) => this.registerAppNavigator(tabIndex, r)}
                initialRoute={{ ...tab.initialRoute, root: true }}
                renderScene={(route, navigator) => {
                  if (!this.state.appNavigatorRefStacks[tabIndex]) {
                    this.state.appNavigatorRefStacks[tabIndex] = [];
                  }

                  const onConstruct = (ref) => {
                    this.state.appNavigatorRefStacks[tabIndex].push(ref);
                    this._setFocusFor(ref);
                  };

                  const onDestruct = () => {
                    this.state.appNavigatorRefStacks[tabIndex].pop();
                    let rs = this.state.appNavigatorRefStacks[tabIndex];
                    let ref = rs[rs.length - 1];
                    this._setFocusFor(ref);
                  };

                  const propsBase = {
                    appFrame: this,
                    rootNavigator,
                    rootRoute,
                    navigator,
                    route,
                    onConstruct,
                    onDestruct
                  };

                  let sceneObj = renderAppScene(route, navigator, rootRoute, rootNavigator);

                  return {
                    ...sceneObj,
                    passProps: {
                      ...propsBase,
                      ...sceneObj.passProps
                    }
                  };
                }}
              />
            </TabView.Item>
          );
        })}
      </TabView>
    );
  }

  @autobind
  directlySetState(newState) {
    // directly sets the state to avoid rerendering
    this.state = {
      ...this.state,
      ...newState
    };
  }

  @autobind
  registerAppNavigator(name, ref) {
    // directly sets the state to avoid rerendering
    this.state.appNavigators[name] = ref;

    if (!this.state.appNavigatorRefStacks[name]) {
      this.state.appNavigatorRefStacks[name] = [];
    }
  }

  @autobind
  getCurrentAppNavigator() {
    return this.state.appNavigators[this.state.currentTab];
  }

  @autobind
  getCurrentAppNavigatorRefStack() {
    return this.state.appNavigatorRefStacks[this.state.currentTab];
  }

  @autobind
  getCurrentContainerRef() {
    const rs = this.getCurrentAppNavigatorRefStack();
    return rs[rs.length - 1];
  }

  @autobind
  getAllContainerRefs() {
    const rs = this.state.appNavigatorRefStacks;
    return Object.keys(rs).map(k => rs[k]).reduce((c, n) => c.concat(n), []);
  }

  @autobind
  _setFocusFor(ref) {
    if (!ref) return;
    ref.onFocus && ref.onFocus.bind(ref)();

    if (ref.setState) {
      if (!ref.state) ref.state = {};
      if (!ref.state.focusKey) ref.state.focusKey = 0;
      let { focusKey } = ref.state;
      focusKey += 1;
      ref.setState({ focusKey });
    }

    const otherRefs = this.getAllContainerRefs();

    otherRefs.forEach((otherRef) => {
      if (otherRef === ref) return;

      if (this.state.focusedRef === otherRef) {
        otherRef.onBlur && otherRef.onBlur.bind(otherRef)();
      }
    });

    this.state.focusedRef = ref;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.registerAndroidHardwareBackPress();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.unRegisterAndroidHardwareBackPress();
    }
  }

  @autobind
  registerAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;

    this.androidHardwareBackPressHandler = () => {
      if (this.refs.rootNavigator.getCurrentRoutes().length > 1) return true;
      let currentAppNavigator = this.getCurrentAppNavigator();
      if (currentAppNavigator && currentAppNavigator.getRouteStackLength() > 1) {
        currentAppNavigator.pop();
        return true;
      } else {
        return false;
      }
    };

    BackAndroid.addEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }

  @autobind
  unRegisterAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;
    BackAndroid.removeEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }
}
