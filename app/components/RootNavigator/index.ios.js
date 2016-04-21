/**
 * RootNavigator
 *
 * @providesModule components/RootNavigator
 */

import React, {
  Navigator
} from 'react-native';

export default class RootNavigator extends Navigator {
  static defaultProps = {
    ...Navigator.defaultProps,
    style: { backgroundColor: '#000' }
  };
}
