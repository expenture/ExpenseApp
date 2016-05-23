import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import store from 'store';
import ModelsControllor from 'ModelsControllor';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

export default class ModelsContainer extends ContainerBase {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: null,
      modelsControllorBackendName: ModelsControllor.backendName
    };
  }

  render() {
    return (
      <ScrollView>
        <StatusBar key={this.state.focusKey} barStyle="default" />
        <ListTable>

          {(() => {
            switch (this.state.mode) {
            case 'query':
              return (
                <ListTable.Section
                  header="Models Controller - Query"
                  key="mcq"
                >
                  {this.getModelNameInput()}
                  <ListTable.Cell
                    title="Options"
                    textInput={true}
                    multiline={true}
                    value={this.state.queryOptionsString}
                    onChangeText={(t) => this.setState({ queryOptionsString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    title="Query"
                    onPress={() => {
                      const { modelName, queryOptionsString } = this.state;
                      try {
                        let queryOptions = JSON.parse(queryOptionsString)
                        ModelsControllor.query(modelName, queryOptions).then((result) => {
                          alert(JSON.stringify(result, null, 2));
                        }).catch((e) => {
                          alert('ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'find':
              return (
                <ListTable.Section
                  header="Models Controller - Find"
                  key="mcf"
                >
                  {this.getModelNameInput()}
                  {this.getUIDInput()}
                  <ListTable.Cell
                    title="Find"
                    onPress={() => {
                      const { modelName, uid } = this.state;
                      ModelsControllor.find(modelName, uid).then((result) => {
                        alert(JSON.stringify(result, null, 2));
                      }).catch((e) => {
                        alert('ERROR: ' + e);
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'create':
              return (
                <ListTable.Section
                  header="Models Controller - Create"
                  key="mcc"
                >
                  <ListTable.Cell
                    title="Create"
                    onPress={() => {
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'update':
              return (
                <ListTable.Section
                  header="Models Controller - Update"
                  key="mcu"
                >
                  <ListTable.Cell
                    title="Update"
                    onPress={() => {
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'delete':
              return (
                <ListTable.Section
                  header="Models Controller - Delete"
                  key="mcd"
                >
                  <ListTable.Cell
                    title="Delete"
                    onPress={() => {
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            default:
              return (
                <ListTable.Section
                  header="Models Controller Actions"
                  key="mca"
                  footer={'The ModelsController is the manager of data models. You can query, find, create, update or delete data (CRUD) by using the ModelsController.'}
                >
                  <ListTable.Cell
                    title="Query"
                    onPress={() => {
                      this.delayedSetState({
                        mode: 'query',
                        modelName: 'Transaction',
                        queryOptionsString: `{
  "filter": {
    "tags": ["~=", "food"],
    "amount": ["<", 0],
    "datetime": [
      "><",
      ${(new Date()).setHours(-24)},
      ${(new Date()).getTime()}
    ]
  },
  "sort": "-datetime",
  "limit": 5
}`
                       });
                    }}
                  />
                  <ListTable.Cell
                    title="Find"
                    onPress={() => {
                      this.delayedSetState({ mode: 'find' });
                    }}
                  />
                  <ListTable.Cell
                    title="Create"
                    onPress={() => {
                      this.delayedSetState({ mode: 'create' });
                    }}
                  />
                  <ListTable.Cell
                    title="Update"
                    onPress={() => {
                      this.delayedSetState({ mode: 'update' });
                    }}
                  />
                  <ListTable.Cell
                    title="Delete"
                    onPress={() => {
                      this.delayedSetState({ mode: 'delete' });
                    }}
                  />
                </ListTable.Section>
              );
            }
          })()}

          <ListTable.Section
            header="Data Backend"
            key="sb"
            footer={'The backend where ModelsControllor access data from.\nOn the native app, the backend defaults to the Realm, while on the web app, only web API is available.'}
          >
            <ListTable.Cell
              title="Web API"
              check={true}
              checked={this.state.modelsControllorBackendName === 'api'}
              onCheck={() => {
                ModelsControllor.setBackend('api');
                this.setState({ modelsControllorBackendName: ModelsControllor.backendName });
              }}
            />
            <ListTable.Cell
              title="Realm"
              check={true}
              checked={this.state.modelsControllorBackendName === 'realm'}
              onCheck={() => {
                ModelsControllor.setBackend('realm');
                this.setState({ modelsControllorBackendName: ModelsControllor.backendName });
              }}
            />
          </ListTable.Section>

          <ListTable.Section
            header="Backends"
            key="bs"
          >
            <ListTable.Cell
              title="Web API"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-ExpentureAPI' });
              }}
            />
            <ListTable.Cell
              title="Realm"
              navigated={true}
              onPress={() => {
                this.props.navigator.push({ name: 'dev-center-AppRealm' });
              }}
            />
          </ListTable.Section>
        </ListTable>
      </ScrollView>
    );
  }

  getModelNameInput = () => {
    return (
      <ListTable.Cell
        title="Model N."
        textInput={true}
        value={this.state.modelName}
        onChangeText={(t) => this.setState({ modelName: t })}
        placeholder="Account (Example)"
        autoCapitalize="words"
        autoCorrect={true}
      />
    );
  }

  getUIDInput = () => {
    return (
      <ListTable.Cell
        title="UID"
        textInput={true}
        value={this.state.uid}
        onChangeText={(t) => this.setState({ uid: t })}
        placeholder="xxxx-xxxx-xxxx-xxxx"
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }
}
