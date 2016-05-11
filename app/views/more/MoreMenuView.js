/**
 * @providesModule views/more/MoreMenuView
 */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import ListTable from 'components/ListTable';

import style from 'constants/style';

export default class MoreMenuView extends Component {
  static propTypes = {
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
      <ScrollView
        style={{ backgroundColor: style.IOS_BACKGROUND_COLOR }}
      >
        <StatusBar
          key={this.state.statusBarIndex}
          barStyle="default"
        />
        <ListTable>
          <ListTable.Section
            header="Hello World"
          >
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell With Press"
              onPress={() => alert('Cell pressed.')}
            />
            <ListTable.Cell
              title="A Disabled Cell With Press"
              onPress={() => alert('Cell pressed.')}
              onDisabledPress={() => alert('Disabled cell pressed.')}
              disabled={true}
            />
          </ListTable.Section>
          <ListTable.Section
            header="音樂的故事"
          >
            <ListTable.Cell
              title="涼爽的橄欖林"
            />
            <ListTable.Cell
              title="秀逸的果實"
            />
            <ListTable.Cell
              title="在風籟中裝一個農夫"
            />
          </ListTable.Section>
          <ListTable.Section
            footer={"\n流入涼爽的橄欖林中，沒福見著你的父親，我既是你的父親，這次我再來歐洲你已經早一個星期回去，你離開了媽的懷抱，你愛好音樂的故事，知道你，只要把話匣開上，因此你得嚴格的為己，並且在他活潑的神情裏我想見了你，不止是苦，我們的鏈永遠是制定我們行動的上司！\n\n比方說，小書你媽曾經件件的指給我看，並且在他活潑的神情裏我想見了你，反是這般不近情的冷漠？或是拜倫那埃及裝的姿態；但最要緊的是穿上你最舊的舊鞋，你回到了天父的懷抱，還是有人成心種著的？"}
          >
            <ListTable.Cell
              title="A Navigated Cell"
              navigated={true}
            />
            <ListTable.Cell
              title="A Cell With Detail"
              detail="Detail"
            />
            <ListTable.Cell
              title="A Cell With Detail"
              detail={3}
            />
            <ListTable.Cell
              title="A Navigated Cell With Detail"
              navigated={true}
              detail={3}
            />
            <ListTable.Cell
              title="A Cell With Subtitle"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
          <ListTable.Section
            header="Cells With Custom Background"
          >
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#FFF"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#888"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#F00"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#0F0"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#00F"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#F00"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#0F0"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#00F"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#F00"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#0F0"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#00F"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
              backgroundColor="#000"
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
