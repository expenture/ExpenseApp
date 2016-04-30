import React, { PropTypes } from 'react';
import ContainerBase from 'ContainerBase';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';

export default class UIPlaygroundContainer extends ContainerBase {
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
            header="Root Level Components"
          >
            <ListTable.Cell
              title="AppNavigator"
              navigated={true}
              onPress={() => {
                let ComponentDemo = require('../../components/AppNavigator/Demo').default;
                let element = <ComponentDemo exitDemo={this.props.rootNavigator.pop} />;
                this.props.rootNavigator.push({ element, animation: 'fade' });
              }}
            />
            <ListTable.Cell
              title="AppFrame"
              navigated={true}
              onPress={() => {
                let ComponentDemo = require('../../components/AppFrame/Demo').default;
                let element = <ComponentDemo exitDemo={this.props.rootNavigator.pop} />;
                this.props.rootNavigator.push({ element, animation: 'fade' });
              }}
            />
          </ListTable.Section>
          <ListTable.Section
            header="Nested Components"
          >
            <ListTable.Cell
              title="ListTable"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({
                  name: 'dev-center-ui-playground',
                  componentName: 'ListTable',
                  componentDemo: require('../../components/ListTable/Demo').default
                });
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }
}
