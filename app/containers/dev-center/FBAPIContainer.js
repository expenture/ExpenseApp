import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import FBAPI from 'FBAPI';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

@connect(state => ({
  fbAPIState: state.fbAPI
}))
export default class FBAPIContainer extends ContainerBase {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <StatusBar key={this.state.focusKey} barStyle="default" />
        <ListTable>
          <ListTable.Section
            header="FB API State"
            key="State"
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
                {JSON.stringify(this.props.fbAPIState, null, 2)}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          <ListTable.Section
            header="Actions"
            key="Actions"
            footer={'\nThe FBAPI module is the API wrapper for Facebook.\n\nHere you can test the functions on it directly.'}
          >
            <ListTable.Cell
              title="Login"
              onPress={() => {
                FBAPI.login().then((tokenObj) => {
                  alert(`FB login success. Access token: ${JSON.stringify(tokenObj)}`);
                }).catch(e => {
                  alert(`FB login failed with error: ${e}.`);
                });
              }}
            />
            <ListTable.Cell
              title="Logout"
              onPress={() => {
                FBAPI.logout().then(() => {
                  alert('FB logout success.');
                }).catch(e => {
                  alert(`FB logout failed with error: ${e}.`);
                });
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
