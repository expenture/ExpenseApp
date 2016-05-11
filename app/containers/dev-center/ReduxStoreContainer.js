import React, { PropTypes } from 'react';
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
      setStateForTestingEnabled: false
    };

    this.enableSetStateForTesting = this.enableSetStateForTesting.bind(this);
    this.disableSetStateForTesting = this.disableSetStateForTesting.bind(this);
    this.setStateForTesting = this.setStateForTesting.bind(this);
    this.resetStateForTesting = this.resetStateForTesting.bind(this);
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

          <ListTable.Section
            header="Actions"
          >
            {(() => {
              if (this.state.setStateForTestingEnabled) {
                return (
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
                );
              } else {
                return (
                  <ListTable.Cell
                    key="ssft"
                    title="Set State For Testing"
                    onPress={this.enableSetStateForTesting}
                  />
                );
              }
            })()}
            {(() => {
              if (this.state.setStateForTestingEnabled) {
                return (
                  <ListTable.Cell
                    key="ssft-ans"
                    title="Apply New State"
                    onPress={this.setStateForTesting}
                  />
                );
              } else {
                return (
                  <ListTable.Cell
                    key="rsft"
                    title="Reset State For Testing"
                    onPress={this.resetStateForTesting}
                  />
                );
              }
            })()}
            {(() => {
              if (this.state.setStateForTestingEnabled) {
                return (
                  <ListTable.Cell
                    key="ssft-c"
                    title="Cancel"
                    onPress={this.disableSetStateForTesting}
                  />
                );
              } else {
                return (
                  <ListTable.Cell
                    title="Log & Time Traveling"
                    disabled={true}
                    onDisabledPress={() => alert('This is not yet implemented.')}
                  />
                );
              }
            })()}
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }

  enableSetStateForTesting() {
    this.setState({
      newStateString: JSON.stringify(this.props.state, null, 2),
      setStateForTestingEnabled: true
    });
  }

  disableSetStateForTesting() {
    this.setState({ setStateForTestingEnabled: false });
  }

  setStateForTesting() {
    try {
      store.enableTesting();
      store.setStateForTesting(JSON.parse(this.state.newStateString));
      this.disableSetStateForTesting();
    } catch (e) {
      alert(e);
    }
  }

  resetStateForTesting() {
    store.enableTesting();
    store.resetStateForTesting();
  }
}
