import React, {
  Component,
  PropTypes
} from 'react';

import ScrollView from 'components/ScrollView';
import ListTable from 'components/ListTable';

export default class UIPlaygroundContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <ListTable>
          <ListTable.Section>
            <ListTable.Cell
              title="AppNavigator"
              navigated={true}
              onPress={() => {
                let navRoutes = {
                  name: 'dev-center-nav-demo', root: true, actionSet: 2, nextRoute: {
                    name: 'dev-center-nav-demo', actionSet: 1, dark: true, nextRoute: {
                      name: 'dev-center-nav-demo', actionSet: 3, nextRoute: {
                        name: 'dev-center-nav-demo', actionSet: 3, dark: true, nextRoute: {
                          name: 'dev-center-nav-demo'
                        }
                      }
                    }
                  }
                };
                this.props.navigator.push(navRoutes);
              }}
            />
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
