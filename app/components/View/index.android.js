/**
 * @providesModule components/View
 */

import React, {
  Component,
  View
} from 'react-native';

export default class AppView extends Component {
  render() {
    return (
      <View
        {...this.props}
        style={[
          { flex: 1, backgroundColor: '#FFF' },
          this.props && this.props.style
        ]}
      />
    );
  }
}
