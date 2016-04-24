import React, { Component } from 'react';

import ScrollView from 'components/ScrollView';
import View from 'components/View';
import Text from 'components/Text';

import ListTable from 'components/ListTable';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchDemoValue: false,
      checkDemoValue: false,
      inputDemoValue: 'Hello'
    };
  }

  render() {
    return (
      <ScrollView>
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
            footer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
          <ListTable.Section>
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
          <ListTable.Section
            footer={"流入涼爽的橄欖林中，沒福見著你的父親，我既是你的父親，這次我再來歐洲你已經早一個星期回去，你離開了媽的懷抱，你愛好音樂的故事，知道你，只要把話匣開上，因此你得嚴格的為己，並且在他活潑的神情裏我想見了你，不止是苦，我們的鏈永遠是制定我們行動的上司！\n\n比方說，小書你媽曾經件件的指給我看，並且在他活潑的神情裏我想見了你，反是這般不近情的冷漠？或是拜倫那埃及裝的姿態；但最要緊的是穿上你最舊的舊鞋，你回到了天父的懷抱，還是有人成心種著的？"}
          />
          <ListTable.Section
            footer="On iOS, the switch only responds on pressing the switch itself, while on Android, the cell should be pressable and the switch will respond on the whole cell."
          >
            <ListTable.Cell
              title="A Switch Cell"
              switch={true}
              onSwitch={(v) => alert(`Switch to: ${v}`)}
            />
            <ListTable.Cell
              title="A Switched Cell"
              switch={true}
              switched={true}
              onSwitch={(v) => alert(`Switch to: ${v}`)}
            />
            <ListTable.Cell
              title="A Disabled Switch Cell"
              switch={true}
              disabled={true}
            />
            <ListTable.Cell
              title="A Disabled Switched Cell"
              switch={true}
              switched={true}
              disabled={true}
            />
            <ListTable.Cell
              title="A Switch Cell With Subtitle"
              subtitle="Hi there, how are you?"
              switch={true}
              switched={this.state.switchDemoValue}
              onSwitch={(v) => this.setState({ switchDemoValue: v })}
            />
            <ListTable.Cell
              title="A Switch Cell With Press"
              switch={true}
              switched={this.state.switchDemoValue}
              onSwitch={(v) => this.setState({ switchDemoValue: v })}
              onPress={() => alert('Cell pressed.')}
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Check Cell"
              check={true}
              onCheck={(v) => alert(`Check to ${v}.`)}
            />
            <ListTable.Cell
              title="A Checked Cell"
              check={true}
              checked={true}
              onCheck={(v) => alert(`Check to ${v}.`)}
            />
            <ListTable.Cell
              title="A Checked Cell With Subtitle"
              checked={true}
              subtitle="Hello subtitle!"
            />
            <ListTable.Cell
              title="A Disabled Checked Cell"
              disabled={true}
              checked={true}
            />
            <ListTable.Cell
              title="A Checkable Cell"
              check={true}
              checked={this.state.checkDemoValue}
              onCheck={(v) => this.setState({ checkDemoValue: v })}
            />
            <ListTable.Cell
              title="A Checkable Cell With Press"
              check={true}
              checked={this.state.checkDemoValue}
              onCheck={(v) => this.setState({ checkDemoValue: v })}
              onPress={() => alert('Cell pressed.')}
            />
            <ListTable.Cell
              title="A Cell"
            />
          </ListTable.Section>
          <ListTable.Section>
            <ListTable.Cell
              title="A Loading Cell"
              loading={true}
            />
            <ListTable.Cell
              title="A Navigated Loading Cell"
              navigated={true}
              loading={true}
            />
            <ListTable.Cell
              title="A Loading Cell With Detail"
              detail="Detail"
              loading={true}
            />
            <ListTable.Cell
              title="A Loading Switch Cell"
              switch={true}
              switched={this.state.switchDemoValue}
              onSwitch={(v) => this.setState({ switchDemoValue: v })}
              loading={true}
            />
            <ListTable.Cell
              title="A Loading Checked Cell"
              checked={true}
              loading={true}
            />
          </ListTable.Section>
          <ListTable.Section
            header="Text Input Cells"
          >
            <ListTable.Cell
              title="Label"
              textInput={true}
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="With Placeholder"
              placeholder="Placeholder"
              textInput={true}
            />
            <ListTable.Cell
              placeholder="Placeholder"
              textInput={true}
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="Multiline"
              textInput={true}
              multiline={true}
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="Numeric"
              textInput={true}
              keyboardType="numeric"
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="Email"
              textInput={true}
              keyboardType="email-address"
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="Phone"
              textInput={true}
              keyboardType="phone-pad"
              value={this.state.inputDemoValue}
              onChangeText={(t) => this.setState({ inputDemoValue: t })}
            />
            <ListTable.Cell
              title="Disabled"
              placeholder="Placeholder"
              textInput={true}
              value={this.state.inputDemoValue}
              disabled={true}
            />
            <ListTable.Cell
              title="Multiline Disabled"
              placeholder="Placeholder"
              textInput={true}
              multiline={true}
              value={this.state.inputDemoValue}
              disabled={true}
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
