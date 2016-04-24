import React, {
  Component,
  PropTypes
} from 'react';

import ScrollView from 'components/ScrollView';
import ListTable from 'components/ListTable';
import View from 'components/View';
import Text from 'components/Text';

import packageInfo from 'packageInfo';
import buildInfo from 'buildInfo';

export default class MoreMenuContainer extends Component {
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
            <ListTable.Cell>
              <Text>
                {`${packageInfo.name}\nv${packageInfo.version}`}
              </Text>
            </ListTable.Cell>
            <ListTable.Cell>
              <Text>
                {`Git commit: ${buildInfo.commit.substring(0, 8)}\n`}
                {`Build: ${buildInfo.timeStamp}\n`}
                {`${buildInfo.user}@${buildInfo.hostname}`}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          <ListTable.Section header="UI & Components">
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
