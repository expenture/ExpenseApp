/**
 * @providesModule components/ScrollView
 */

import React from 'react';
import {
  ScrollView
} from 'react-native';

import style from 'constants/style';

class AppScrollView extends ScrollView {
  static defaultProps = {
    ...ScrollView.defaultProps,
    style: {
      ...(ScrollView.defaultProps && ScrollView.defaultProps.style),
      backgroundColor: style.IOS_BACKGROUND_COLOR
    }
  };
}

export default AppScrollView;
