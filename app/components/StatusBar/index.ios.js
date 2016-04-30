/**
 * StatusBar
 *
 * @providesModule components/StatusBar
 */

import React, {
  StatusBar
} from 'react-native';

export default class AppStatusBar extends StatusBar {
  static defaultProps = {
    ...StatusBar.defaultProps
  };
}
