import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import AppRealm from 'AppRealm';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

@connect(state => ({
  realmState: state.realm
}))
export default class AppRealmContainer extends ContainerBase {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: null
    };
  }

  render() {
    return (
      <ScrollView>
        <StatusBar key={this.state.focusKey} barStyle="default" />
        <ListTable>
          <ListTable.Section
            header="Realm State"
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
                {JSON.stringify(this.props.realmState, null, 2)}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          {(() => {
            switch (this.state.mode) {
            case 'eval-script':
              return (
                <ListTable.Section
                  header="Eval Script"
                  key="es"
                  footer={'Type the script to eval, then Press "Eval Script" to run it and get the results.\n\nWARNING: this can be harmful.'}
                >
                  <ListTable.Cell
                    title="Script"
                    textInput={true}
                    multiline={true}
                    value={this.state.script}
                    onChangeText={(t) => this.setState({ script: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    key="ssft-ans"
                    title="Eval Script"
                    onPress={() => {
                      try {
                        const realm = AppRealm.realm;
                        const result = eval(this.state.script);
                        alert(JSON.stringify(result, null, 2));
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    onPress={() => {
                      this.setState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'set-realm-id':
              return (
                <ListTable.Section
                  header="Set Realm ID"
                  key="ID"
                  footer={'Enter the new Realm ID and press "Set Realm ID" to change the Realm.'}
                >
                  <ListTable.Cell
                    title="Realm ID"
                    textInput={true}
                    value={this.state.realmID}
                    onChangeText={(t) => this.setState({ realmID: t })}
                    placeholder="xxxx-xxxxxxxx-xxxxxxxx-xxxx"
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Set Realm ID"
                    onPress={() => {
                      const { realmID } = this.state;
                      AppRealm.realmID = realmID;
                      this.setState({ mode: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    onPress={() => {
                      this.setState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            default:
              return (
                <ListTable.Section
                  header="Actions"
                  key="Actions"
                  footer={'\nRealm is used to provide offline support and data syncing for the iOS and Android app.'}
                >
                  <ListTable.Cell
                    title="Eval Script"
                    onPress={() => {
                      this.setState({
                        mode: 'eval-script',
                        script: '// var realm = AppRealm.getRealmFromID(\'test\');\n// var a = new Account({ name: \'New Account\' });\n// realm.write(function () { realm.create(\'Account\', a); });\n\nvar accounts = realm.objects(\'Account\');\naccounts.filtered(\'name CONTAINS $0\', \'New\');'
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Sync Accounts"
                    onPress={() => {
                      AppRealm.syncAccounts({ throwError: true }).then(() => {
                        alert('Sync accounts success');
                      }).catch((e) => {
                        alert('Sync accounts failure: ' + e);
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Sync Transactions"
                    onPress={() => {
                      AppRealm.syncTransactions({ throwError: true }).then(() => {
                        alert('Sync transactions success');
                      }).catch((e) => {
                        alert('Sync transactions failure: ' + e);
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Reset"
                    onPress={() => {
                      try {
                        AppRealm.reset();
                      } catch (e) {
                        alert('Error: ' + e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Reset (Force)"
                    onPress={() => {
                      AppRealm.reset({ force: true });
                    }}
                  />
                </ListTable.Section>
              );
            }
          })()}
        </ListTable>
      </ScrollView>
    );
  }
}
