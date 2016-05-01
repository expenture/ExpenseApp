/**
 * AppNavigator
 * A universal navigator wrapper, providing navigators across different
 * platforms with the same API and logic. This is the iOS version.
 *
 * @providesModule components/AppNavigator
 */

import React, {
  Component,
  PropTypes,
  NavigatorIOS,
  ActionSheetIOS
} from 'react-native';

import Color from 'color';

import style from 'constants/style';
import colors from 'constants/colors';

export default class AppNavigator extends Component {
  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.popToTop = this.popToTop.bind(this);
    this._renderRouteObject = this._renderRouteObject.bind(this);
  }

  push(route) {
    this.refs.nav.push(this._renderRouteObject(route, this));
  }

  pop() {
    this.refs.nav.pop();
  }

  popToTop() {
    this.refs.nav.popToTop();
  }

  render() {
    const { initialRoute } = this.props;
    const renderRouteObject = this._renderRouteObject;

    return (
      <NavigatorIOS
        ref="nav"
        style={{ flex: 1 }}
        tintColor={style.PRIMARY_COLOR}
        initialRoute={renderRouteObject(initialRoute, this)}
      />
    );
  }

  _renderRouteObject(route, navigator) {
    const sceneObj = this.props.renderScene(route, navigator);
    const SceneComponent = sceneObj.component;
    const sceneComponentProps = sceneObj.passProps || {};
    sceneComponentProps.navigator = navigator;

    let rightButtonIcon, rightButtonTitle, onRightButtonPress;
    let leftButtonIcon, leftButtonTitle, onLeftButtonPress;
    if (sceneObj.actions && sceneObj.actions.length > 0) {
      let actions = sceneObj.actions.slice(0);

      if (route.root && actions.length > 1) {
        let leftAction = actions.shift();
        leftButtonTitle = leftAction.title;
        if (leftAction.icon) leftButtonIcon = leftAction.icon;
        if (leftAction.iconIOS) leftButtonIcon = leftAction.iconIOS;
        onLeftButtonPress = leftAction.onSelect;
      }

      if (actions.length === 1) {
        let action = actions[0];
        rightButtonTitle = action.title;
        if (action.icon) rightButtonIcon = action.icon;
        if (action.iconIOS) rightButtonIcon = action.iconIOS;
        onRightButtonPress = action.onSelect;
      } else {
        rightButtonTitle = sceneObj.actionsTitle || 'Actions';
        if (sceneObj.actionsIcon) rightButtonIcon = sceneObj.actionsIcon;
        if (sceneObj.actionsIconIOS) rightButtonIcon = sceneObj.actionsIconIOS;
        let destructiveButtonIndex;
        let options = actions.map((action, i) => {
          if (action.destructive) destructiveButtonIndex = i;
          return action.title;
        });
        options.push('Cancel');
        onRightButtonPress = () => {
          ActionSheetIOS.showActionSheetWithOptions({
            options,
            destructiveButtonIndex,
            cancelButtonIndex: actions.length
          },
          (optionIndex) => {
            // Execute action if it is not the cancelButton
            if (!(optionIndex === actions.length)) {
              actions[optionIndex].onSelect && actions[optionIndex].onSelect();
            }
          });
        };
      }
    }

    let barTintColor, tintColor, titleTextColor, translucent, navigationBarHidden, shadowHidden;

    const { theme } = sceneObj;

    if (theme === 'dark') {
      translucent = true;
      barTintColor = Color(colors.dark).saturate(0.7).darken(0.32).hexString();
      tintColor = colors.light;
      titleTextColor = colors.light;
    } else if (theme === 'navigationBarHidden') {
      navigationBarHidden = true;
    } else {
      translucent = true;
      barTintColor = colors.light;
      tintColor = colors.dark;
      titleTextColor = colors.dark;
    }

    return {
      component: SceneComponent,
      title: sceneObj.title,
      passProps: sceneComponentProps,
      rightButtonTitle,
      rightButtonIcon,
      onRightButtonPress,
      leftButtonTitle,
      leftButtonIcon,
      onLeftButtonPress,
      barTintColor,
      tintColor,
      titleTextColor,
      translucent,
      navigationBarHidden,
      shadowHidden
    };
  }
}
