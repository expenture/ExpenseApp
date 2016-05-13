import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import PushNotification from 'PushNotification';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

@connect(state => ({
  pushNotificationState: state.pushNotification
}))
export default class PushNotificationContainer extends ContainerBase {
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
            header="PushNotification State"
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
                {JSON.stringify(this.props.pushNotificationState, null, 2)}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          <ListTable.Section
            header="Device Token"
            key="Device Token"
          >
            <ListTable.Cell
              textInput={true}
              placeholder="No device token"
              onChange={() => {}}
              value={(this.props.pushNotificationState || {}).deviceToken || ''}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Actions"
            key="Actions"
            footer={'\nThe PushNotification module is the API wrapper for push notification.\n\nHere you can test the functions on it directly.'}
          >
            <ListTable.Cell
              title="Request Permissions"
              onPress={() => {
                PushNotification.requestPermissions();
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
