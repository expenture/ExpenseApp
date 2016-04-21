/**
 * TabView.ios.js
 * A universal tab page and tab bar wrapper, providing tabs across different
 * platforms with the same API and logic. This is the Android version.
 *
 * Following the bottom navigation of Material Design:
 * https://www.google.com/design/spec/components/bottom-navigation.html
 *
 * @providesModule components/TabView
 */

import React, {
  Component,
  PropTypes,
  View,
  TouchableNativeFeedback,
  Image,
  Text,
  LayoutAnimation
} from 'react-native';

import style from 'constants/style';

class Item extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: Image.propTypes.source,
    selectedIcon: Image.propTypes.source,
    iconIOS: Image.propTypes.source,
    selectedIconIOS: Image.propTypes.source,
    iconAndroid: Image.propTypes.source,
    selectedIconAndroid: Image.propTypes.source,
    badge: PropTypes.number
  };
}

export default class TabView extends Component {
  static Item = Item;
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialTab: PropTypes.number
  };
  static defaultProps = {
    initialTab: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.initialTab
    };
    this.selectTab = this.selectTab.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.props.children.map((item, i) => {
            let viewStyle = {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              transform: this.state.currentTab === i ? [] : [{ translateX: 100000 }]
            };
            return (
              <View key={i} style={viewStyle}>
                {item.props.children}
              </View>
            );
          })}
        </View>
        <View style={{ height: 56, flexDirection: 'row', backgroundColor: '#FFF' }}>
          {this.props.children.map((item, i) => {
            let selected = this.state.currentTab === i;
            let tabIcon = item.props.iconAndroid || item.props.icon || require('./images/unselected.png');
            if (selected) {
              tabIcon = item.props.selectedIconAndroid || item.props.selectedIcon || require('./images/selected.png');
            }
            return (
              <TouchableNativeFeedback
                key={i}
                style={{ flex: 1 }}
                onPress={() => this.selectTab(i)}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 6,
                    paddingBottom: 8,
                    paddingVertical: 12
                  }}
                >
                  <Image source={tabIcon} style={{ height: 24, width: 24 }} />
                  <Text
                    style={{
                      fontSize: 12
                    }}
                  >
                    {item.props.title}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
    );
  }

  selectTab(i) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ currentTab: i });
  }
}
