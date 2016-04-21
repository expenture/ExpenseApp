/**
 * @providesModule views/BlankPageView
 */

import React, {
  PropTypes,
  Component,
  View,
  Text
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
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
