import React, { PropTypes } from 'react';
import ContainerBase from 'ContainerBase';

import DeviceInfo from 'utils/DeviceInfo';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import View from 'components/View';
import Text from 'components/Text';

import packageInfo from 'packageInfo';
import buildInfo from 'buildInfo';

export default class MoreMenuContainer extends ContainerBase {
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
          <ListTable.Section>
            <ListTable.Cell>
              <Text>
                {`${packageInfo.name}\nv${packageInfo.version}`}
              </Text>
            </ListTable.Cell>
            <ListTable.Cell>
              <Text>
                {`Bun. ID: ${DeviceInfo.getBundleId()}\n`}
                {`Version: ${DeviceInfo.getVersion()} (${DeviceInfo.getReadableVersion()})\n`}
                {`Build number: ${DeviceInfo.getBuildNumber()}\n`}
                {`Git commit: ${buildInfo.commit.substring(0, 8)}\n`}
                {`Build: ${buildInfo.timeStamp}\n`}
                {`${buildInfo.user}@${buildInfo.hostname}`}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          <ListTable.Section header="Core">
            <ListTable.Cell
              title="Redux Store"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-redux-store' });
              }}
            />
            <ListTable.Cell
              title="Backend Session"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-BackendSession' });
              }}
            />
          </ListTable.Section>

          <ListTable.Section header="Modules & API">
            <ListTable.Cell
              title="Expenture API"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-ExpentureAPI' });
              }}
            />
            <ListTable.Cell
              title="Push Notification"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-PushNotification' });
              }}
            />
            <ListTable.Cell
              title="FB API"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-FBAPI' });
              }}
            />
            <ListTable.Cell
              title="Device Info"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-DeviceInfo' });
              }}
            />
          </ListTable.Section>

          <ListTable.Section header="Design & UI & Components">
            <ListTable.Cell
              title="Design Spec"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-design-spec' });
              }}
            />
            <ListTable.Cell
              title="UI Playground"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-ui-playground' });
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
