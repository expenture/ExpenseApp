/**
 * @providesModule views/DashboardView
 */

import React, {
  PropTypes,
  Component,
  StatusBar,
  View,
  Text
} from 'react-native';

export default class DashboardView extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      statusBarIndex: 0
    };

    this.remountStatusBar = this.remountStatusBar.bind(this);
  }

  remountStatusBar() {
    let statusBarIndex = this.state.statusBarIndex;
    statusBarIndex += 1;
    this.setState({ statusBarIndex });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StatusBar
          key={this.state.statusBarIndex}
          barStyle="light-content"
        />
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
