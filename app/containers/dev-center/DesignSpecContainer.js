import React, {
  Component,
  PropTypes
} from 'react';

// TODO: Place this view to views, remove RN here
import { Image, Dimensions } from 'react-native';

import Lightbox from'react-native-lightbox';

import ScrollView from 'components/ScrollView';
import ListTable from 'components/ListTable';

export default class DesignSpecContainer extends Component {
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
