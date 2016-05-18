import React, { PropTypes } from 'react';
import ContainerBase from 'ContainerBase';

import DeviceInfo from 'utils/DeviceInfo';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

export default class DeviceInfoContainer extends ContainerBase {
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
            header="Device Unique ID"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getUniqueID()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Device Manufacturer"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getManufacturer()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Device Model"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getModel()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Device ID"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getDeviceId()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="System Name"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getSystemName()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="System Version"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getSystemVersion()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Device Name"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getDeviceName()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="User Agent"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getUserAgent()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Locale"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getDeviceLocale()}
              autoCorrect={false}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Country"
          >
            <ListTable.Cell
              textInput={true}
              onChange={() => {}}
              value={DeviceInfo.getDeviceCountry()}
              autoCorrect={false}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
