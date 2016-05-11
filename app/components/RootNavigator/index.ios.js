/**
 * RootNavigator
 *
 * @providesModule components/RootNavigator
 */

import React from 'react';
import {
  Navigator
} from 'react-native';

export default class RootNavigator extends Navigator {
  static defaultProps = {
    ...Navigator.defaultProps,
    style: { backgroundColor: '#000' }
  };
}
