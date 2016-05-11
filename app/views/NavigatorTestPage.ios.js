/**
 * @providesModule views/NavigatorTestPage
 */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class NavigatorTestPage extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    nextRoute: PropTypes.object
  }

  constructor() {
    super();
    this._goToNextRoute = this._goToNextRoute.bind(this);
    this._goBack = this._goBack.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <Text>
          This is route: {JSON.stringify(this.props.route, null, 2)}{'\n'}
        </Text>
        {(() => {
          if (this.props.nextRoute) {
            return (
              <TouchableOpacity onPress={this._goToNextRoute}>
                <Text style={{ fontSize: 18, padding: 8 }}>Go To Next Route</Text>
              </TouchableOpacity>
            );
          }
        })()}
        <TouchableOpacity onPress={this._goBack}>
          <Text style={{ fontSize: 18, padding: 8 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _goToNextRoute() {
    this.props.navigator.push(this.props.nextRoute);
  }

  _goBack() {
    this.props.navigator.pop();
  }
}
