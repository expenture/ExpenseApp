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

import style from 'constants/style';

export default class AppNavigator extends Component {
  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this._renderRouteObject = this._renderRouteObject.bind(this);
  }

  render() {
    const { initialRoute } = this.props;
    const renderRouteObject = this._renderRouteObject;

    // A navigator object to pass into each components with the general push()
    // and pop() function
    const navigator = {
      push: (route) => {
        this.refs.nav.push(renderRouteObject(route, navigator));
      },
      pop: () => {
        this.refs.nav.pop();
      }
    };

    return (
      <NavigatorIOS
        ref="nav"
        style={{ flex: 1 }}
        tintColor={style.PRIMARY_COLOR}
        initialRoute={renderRouteObject(initialRoute, navigator)}
      />
    );
  }

  _renderRouteObject(route, navigator) {
    const sceneObj = this.props.renderScene(route, navigator);
    const SceneComponent = sceneObj.component;
    const SceneComponentProps = sceneObj.passProps || {};
    SceneComponentProps.navigator = navigator;

    var rightButtonIcon, rightButtonTitle, onRightButtonPress;
    if (sceneObj.actions && sceneObj.actions.length > 0) {
      if (sceneObj.actions.length == 1) {
        let action = sceneObj.actions[0];
        rightButtonTitle = action.title;
        if (action.icon) rightButtonIcon = action.icon;
        if (action.iconIOS) rightButtonIcon = action.iconIOS;
        onRightButtonPress = action.onSelect;
      } else {
        rightButtonTitle = sceneObj.actionsTitle || 'Actions';
        if (sceneObj.actionsIcon) rightButtonIcon = sceneObj.actionsIcon;
        if (sceneObj.actionsIconIOS) rightButtonIcon = sceneObj.actionsIconIOS;
        let actions = sceneObj.actions;
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
            if (!(optionIndex == actions.length)) {
              actions[optionIndex].onSelect && actions[optionIndex].onSelect();
            }
          })
        }
      }
    }

    return {
      component: SceneComponent,
      title: sceneObj.title,
      passProps: SceneComponentProps,
      rightButtonTitle,
      rightButtonIcon,
      onRightButtonPress
    };
  }
}
