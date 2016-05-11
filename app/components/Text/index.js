/**
 * @providesModule components/Text
 */

import React, { Component, PropTypes } from 'react';
import {
  Text
} from 'react-native';

export default class AppText extends Component {
  static propTypes = {
    textStyle: PropTypes.string
  };

  render() {
    let style;

    switch (this.props.textStyle) {
    case 'centered-note':
      style = { textAlign: 'center' };
      break;
    }

    return (
      <Text
        {...this.props}
        style={[
          style,
          this.props && this.props.style
        ]}
      />
    );
  }
}
