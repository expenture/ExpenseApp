/**
 * StatusBar
 *
 * @providesModule components/StatusBar
 */

import React from 'react';
import {
  StatusBar
} from 'react-native';

export default class AppStatusBar extends StatusBar {
  static defaultProps = {
    ...StatusBar.defaultProps
  };
}
