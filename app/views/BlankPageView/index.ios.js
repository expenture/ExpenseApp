/**
 * @providesModule views/BlankPageView
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';

export default class BlankPageView extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StatusBar
          key={this.props.focusKey}
          barStyle={this.props.barStyle || 'default'}
        />
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
