import React, { PropTypes } from 'react';
import ContainerBase from 'ContainerBase';

// TODO: Place this view to views, remove RN here
import { Image, Dimensions } from 'react-native';

import Lightbox from'react-native-lightbox';

import StatusBar from 'components/StatusBar';
import ScrollView from 'components/ScrollView';
import ListTable from 'components/ListTable';

export default class DesignSpecContainer extends ContainerBase {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.specImageSource) {
      let { width, height } = Dimensions.get('window');
      return (
        <ScrollView
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          <StatusBar key={this.state.focusKey} barStyle="default" />
          <Lightbox
            // TODO: Make Android work here
            // navigator={this.props.navigator}
          >
            <Image
              style={{ width: width, height: height * 0.7 }}
              resizeMode="contain"
              source={this.props.specImageSource}
            />
          </Lightbox>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <StatusBar key={this.state.focusKey} barStyle="default" />
          <ListTable>
            <ListTable.Section>
              <ListTable.Cell
                title="Identity Colors"
                navigated={true}
                onPress={() => {
                  this.props.navigator.push({
                    name: 'dev-center-design-spec',
                    specName: 'Identity Colors',
                    specImageSource: require('../../images/Spec/IdentityColors.png')
                  });
                }}
              />
              <ListTable.Cell
                title="Color Applications"
                navigated={true}
                onPress={() => {
                  this.props.navigator.push({
                    name: 'dev-center-design-spec',
                    specName: 'Color Applications',
                    specImageSource: require('../../images/Spec/ColorApplications.png')
                  });
                }}
              />
            </ListTable.Section>
          </ListTable>
        </ScrollView>
      );
    }
  }
}
