/**
 * Navigator.android.js
 * A universal navigator wrapper, providing navigators across different
 * platforms with the same API and logic. This is the Android version.
 *
 * @providesModule components/Navigator
 */

import React, {
  Component,
  PropTypes,
  Navigator,
  View,
  ToolbarAndroid
} from 'react-native';

import style from 'constants/style';

const APP_BAR_HEIGH = 56;
const BACK_ICON_WHITE = require('./images/android-arrow-back-icon-white.png');
const BACK_ICON_BLACK = require('./images/android-arrow-back-icon-black.png');
const MORE_ICON_WHITE = require('./images/android-more-icon-white.png');
const MORE_ICON_BLACK = require('./images/android-more-icon-black.png');

export default class NavigatorE extends Component {
  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.scenes = [];
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={this.props.initialRoute}
        renderScene={(route, navigator) => {
          const sceneObj = this.props.renderScene(route, navigator);
          const SceneComponent = sceneObj.component;
          const SceneComponentProps = sceneObj.passProps;

          let actions = [];
          if (sceneObj.actions && sceneObj.actions.length > 0) {
            actions = sceneObj.actions.map((action) => {
              return {
                ...action,
                icon: action.iconAndroid || action.icon
              };
            });
          }

          let color, navIcon, overflowIcon;

          color = '#FFFFFF';
          navIcon = BACK_ICON_WHITE;
          overflowIcon = MORE_ICON_WHITE;

          if (route.root) {
            navIcon = null;
          }

          return (
            <View
              style={{ flex: 1 }}
              ref={(r) => {
                this.scenes.push(r);
              }}
            >
              <ToolbarAndroid
                style={{ backgroundColor: style.PRIMARY_COLOR, height: APP_BAR_HEIGH }}
                titleColor={color}
                subtitleColor={color}
                title={sceneObj.title}
                navIcon={navIcon}
                overflowIcon={overflowIcon}
                onIconClicked={() => {
                  if (this.refs.nav && this.refs.nav.pop) {
                    this.refs.nav.pop();
                  }
                }}
                actions={actions}
                onActionSelected={(actionIndex) => {
                  actions[actionIndex].onSelect && actions[actionIndex].onSelect();
                }}
              />
                <SceneComponent {...SceneComponentProps} navigator={navigator} />
            </View>
          );
        }}
      />
    );
  }
}
