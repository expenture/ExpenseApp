/**
 * TabView.ios.js
 * A universal tab page and tab bar wrapper, providing tabs across different
 * platforms with the same API and logic. This is the iOS version.
 *
 * @providesModule components/TabView
 */

import React, {
  Component,
  PropTypes,
  TabBarIOS,
  Image
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
    badge: PropTypes.number,
    onSelect: PropTypes.func
  };
}

export default class TabView extends Component {
  static Item = Item;
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialTab: PropTypes.number,
    onTabSelected: PropTypes.func,
    onCurrentTabPress: PropTypes.func
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
      <TabBarIOS>
        {this.props.children.map((item, i) => {
          let selected = this.state.currentTab === i;

          if (selected) {
            if (item.props.onSelect) item.props.onSelect();
          }

          return (
            <TabBarIOS.Item
              key={i}
              title={item.props.title}
              icon={item.props.iconIOS || item.props.icon || require('./images/Icon.png')}
              selectedIcon={
                item.props.selectedIconIOS ||
                item.props.selectedIcon ||
                require('./images/SelectedIcon.png')
              }
              selectedTab={item.props.selectedTab}
              badge={item.props.badge}
              selected={selected}
              onPress={() => this.selectTab(i)}
            >
              {item.props.children}
            </TabBarIOS.Item>
          );
        })}
      </TabBarIOS>
    );
  }

  selectTab(i) {
    if (this.state.currentTab !== i) {
      this.setState({ currentTab: i });
    } else if (this.props.onCurrentTabPress) {
      this.props.onCurrentTabPress();
    }

    if (this.props.onTabSelected) {
      this.props.onTabSelected(i);
    }
  }
}
