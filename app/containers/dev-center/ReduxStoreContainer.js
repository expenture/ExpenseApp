import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import store from 'store';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

@connect(state => ({
  state: state
}))
export default class ReduxStoreContainer extends ContainerBase {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: null
    };
  }

  render() {
    return (
      <ScrollView>
        <StatusBar key={this.state.focusKey} barStyle="default" />
        <ListTable>
          <ListTable.Section
            header="Current State"
          >
            <ListTable.Cell>
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Menlo',
                  fontWeight: '100',
                  fontSize: 12
                }}
              >
                {JSON.stringify(this.props.state, null, 2)}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          {(() => {
            switch (this.state.mode) {
            case 'set-state-for-testing':
              return (
                <ListTable.Section
                  header="Set State For Testing"
                  key="ssft"
                  footer={'Edit the state and press the "Apply New State" button to set the new state, or press the "Reset State" button to reset the state to the initial status.\n\nNote that it is dangerous to modify the state as it might broke the app. In the most worst situation, it might cause data lost.'}
                >
                  <ListTable.Cell
                    title="New State"
                    textInput={true}
                    multiline={true}
                    value={this.state.newStateString}
                    onChangeText={(t) => this.setState({ newStateString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    key="ssft-ans"
                    title="Apply New State"
                    onPress={this.setStateForTesting}
                  />
                  <ListTable.Cell
                    key="rsft"
                    title="Reset State"
                    onPress={this.resetStateForTesting}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    onPress={this.disableSetStateForTesting}
                  />
                </ListTable.Section>
              );
            default:
              return (
                <ListTable.Section
                  header="Actions"
                  footer={'\nThe Redux store is the state container of the app.\n\nHere you can perform some actions such as modifying the state directly, or reset the state to the initial status.\n\nNote that it is dangerous to modify the state as it might broke the app.'}
                  key="Actions"
                >
                  <ListTable.Cell
                    title="Set State For Testing"
                    onPress={this.enableSetStateForTesting}
                  />
                  <ListTable.Cell
                    title="Log & Time Traveling"
                    disabled={true}
                    onDisabledPress={() => alert('This is not yet implemented.')}
                  />
                </ListTable.Section>
              );
            }
          })()}
        </ListTable>
      </ScrollView>
    );
  }

  @autobind
  enableSetStateForTesting() {
    this.setState({
      newStateString: JSON.stringify(this.props.state, null, 2),
      mode: 'set-state-for-testing'
    });
  }

  @autobind
  disableSetStateForTesting() {
    this.setState({ mode: null });
  }

  @autobind
  setStateForTesting() {
    try {
      store.enableTesting();
      store.setStateForTesting(JSON.parse(this.state.newStateString));
      this.disableSetStateForTesting();
    } catch (e) {
      alert(e);
    }
  }

  @autobind
  resetStateForTesting() {
    store.enableTesting();
    store.resetStateForTesting();
    this.disableSetStateForTesting();
  }
}
