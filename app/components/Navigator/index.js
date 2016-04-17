/**
 * Navigator.js
 * A universal navigator wrapper, providing navigators across different
 * platforms with the same API and logic. This is the web version.
 */

import React, { Component, PropTypes } from 'react';
var Navigator = require('ReactNavigator');

export default class NavigatorE extends Component {
  propTypes: {
    initialRoute: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired
  };

  constructor() {
    super();
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        renderScene={(route, navigator) => {
          const sceneObj = this.props.renderScene(route, navigator);
          console.log(sceneObj)
          const SceneComponent = sceneObj.component;
          const SceneComponentProps = sceneObj.passProps;
          return <SceneComponent {...SceneComponentProps} navigator={navigator} title={sceneObj.title} />;
        }}
      />
    );
  }
}
