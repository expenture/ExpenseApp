/**
 * @providesModule components/ScrollView
 */

import React, {
  Component,
  ScrollView
} from 'react-native';

import style from 'constants/style';

export default class AppScrollView extends Component {
  render() {
    return (
      <ScrollView
        {...this.props}
        style={[
          { backgroundColor: style.ANDROID_BACKGROUND_COLOR },
          this.props && this.props.style
        ]}
      />
    );
  }
}
