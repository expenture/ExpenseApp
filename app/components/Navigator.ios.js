/**
 * Navigator.ios.js
 * A universal navigator wrapper, providing navigators across different
 * platforms with the same API.
 */

import React, { Component, PropTypes, NavigatorIOS } from 'react-native';

export default class Navigator extends Component {
  propTypes: {
    initialRoute: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired
  };

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
        initialRoute={renderRouteObject(initialRoute, navigator)}
      />
    );
  }

  _renderRouteObject(route, navigator) {
    const sceneObj = this.props.renderScene(route, navigator);
    const SceneComponent = sceneObj.component;
    const SceneComponentProps = sceneObj.passProps;
    SceneComponentProps.navigator = navigator;

    return {
      component: SceneComponent,
      title: sceneObj.title,
      passProps: SceneComponentProps
    };
  }
}
