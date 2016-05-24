import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import store from 'store';
import ModelsController from 'ModelsController';

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
      utilsMode: null,
      modelsControllerBackendName: ModelsController.backendName
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
                  footer={'Query for (list) data. Type in the parameters and press "Query", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  <ListTable.Cell
                    title="Options"
                    textInput={true}
                    multiline={true}
                    autoCapitalize="none"
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
                        let queryOptions = JSON.parse(queryOptionsString);
                        ModelsController.query(modelName, queryOptions).then((result) => {
                          const results = JSON.stringify(result, null, 2);
                          this.setState({ results });
                          alert(results);
                        }).catch((e) => {
                          alert('ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, queryOptionsString: `{
  "filter": {\n    \n  },
  "sort": "-updatedAt",
  "limit": 5
}`, results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'find':
              return (
                <ListTable.Section
                  header="Models Controller - Find"
                  key="mcf"
                  footer={'Find a single record by uid. Type in the parameters and press "Find", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  {this.getUIDInput()}
                  <ListTable.Cell
                    title="Find"
                    onPress={() => {
                      const { modelName, uid } = this.state;
                      ModelsController.find(modelName, uid).then((result) => {
                        const results = JSON.stringify(result, null, 2);
                        this.setState({ results });
                        alert(results);
                      }).catch((e) => {
                        alert('ERROR: ' + e);
                      });
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, uid: null, results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'create':
              return (
                <ListTable.Section
                  header="Models Controller - Create"
                  key="mcc"
                  footer={'Create new data. Type in the parameters and press "Create", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  <ListTable.Cell
                    title="Obj"
                    textInput={true}
                    multiline={true}
                    autoCapitalize="none"
                    value={this.state.createObjString}
                    onChangeText={(t) => this.setState({ createObjString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    title="Create"
                    onPress={() => {
                      const { modelName, createObjString } = this.state;
                      try {
                        let createObj = JSON.parse(createObjString);
                        ModelsController.create(modelName, createObj).then((result) => {
                          const results = JSON.stringify(result, null, 2);
                          this.setState({ results });
                          alert(results);
                        }).catch((e) => {
                          alert('ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, createObjString: '{\n  \n}', results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'update':
              return (
                <ListTable.Section
                  header="Models Controller - Update"
                  key="mcu"
                  footer={'Update a record. Type in the parameters and press "Update", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  {this.getUIDInput()}
                  <ListTable.Cell
                    title="Obj"
                    textInput={true}
                    multiline={true}
                    autoCapitalize="none"
                    value={this.state.updateObjString}
                    onChangeText={(t) => this.setState({ updateObjString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    title="Update"
                    onPress={() => {
                      const { modelName, uid, updateObjString } = this.state;
                      try {
                        let updateObj = JSON.parse(updateObjString);
                        ModelsController.update(modelName, uid, updateObj).then((result) => {
                          const results = JSON.stringify(result, null, 2);
                          this.setState({ results });
                          alert(results);
                        }).catch((e) => {
                          alert('ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, uid: null, updateObjString: '{\n  \n}', results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'destroy':
              return (
                <ListTable.Section
                  header="Models Controller - Destroy"
                  key="mcd"
                  footer={'Delete data. Type in the parameters and press "Delete", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  {this.getUIDInput()}
                  <ListTable.Cell
                    title="Destroy"
                    onPress={() => {
                      const { modelName, uid } = this.state;
                      ModelsController.destroy(modelName, uid).then((result) => {
                        const results = JSON.stringify(result, null, 2);
                        this.setState({ results });
                        alert(results);
                      }).catch((e) => {
                        alert('ERROR: ' + e);
                      });
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, uid: null, results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'validate':
              return (
                <ListTable.Section
                  header="Models Controller - Validate"
                  key="mcv"
                  footer={'Validate data object. Type in the parameters and press "Validate", the results will be alerted and shown below.\n\nSample parameters are set by default, press "Clear" to clear the inputs.'}
                >
                  {this.getModelNameInput()}
                  <ListTable.Cell
                    title="Obj"
                    textInput={true}
                    multiline={true}
                    autoCapitalize="none"
                    value={this.state.validateObjString}
                    onChangeText={(t) => this.setState({ validateObjString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    title="Validate"
                    onPress={() => {
                      const { modelName, validateObjString } = this.state;
                      try {
                        let validateObj = JSON.parse(validateObjString);
                        ModelsController.validate(modelName, validateObj).then((result) => {
                          const results = JSON.stringify(validateObj, null, 2);
                          this.setState({ results });
                          alert(result ? 'Is valid.' : 'is INVALID!');
                        }).catch((e) => {
                          alert('ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Validate (With Throw)"
                    onPress={() => {
                      const { modelName, validateObjString } = this.state;
                      try {
                        let validateObj = JSON.parse(validateObjString);
                        ModelsController.validate(modelName, validateObj, { throwError: true }).then(() => {
                          const results = JSON.stringify(validateObj, null, 2);
                          this.setState({ results });
                          alert('Is valid.');
                        }).catch((e) => {
                          alert('Has ERROR: ' + e);
                        });
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  {this.getResultsOutput()}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ modelName: null, validateObjString: '{\n  \n}', results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ mode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            default:
              return (
                <ListTable.Section
                  header="Models Controller Actions"
                  key="mca"
                  footer={'The ModelsController is the manager of data models. You can query, find, create, update or destroy data (CRUD) by using the ModelsController.'}
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
                    onPress={async () => {
                      let transactions = await ModelsController.query('Transaction', { limit: 1 });
                      let uid = transactions[0] && transactions[0].uid;
                      this.delayedSetState({ mode: 'find', modelName: 'Transaction', uid });
                    }}
                  />
                  <ListTable.Cell
                    title="Create"
                    onPress={() => {
                      this.delayedSetState({
                        mode: 'create',
                        modelName: 'Account',
                        createObjString: `{
  "kind": "debit",
  "name": "New Testing Account",
  "currency": "TWD",
  "balance": 5000000
}`
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Update"
                    onPress={async () => {
                      let a = await ModelsController.query('Account', {
                        filter: {
                          name: ['=', 'New Testing Account']
                        },
                        limit: 1
                      });
                      a = a[0];
                      let uid = a && a.uid;
                      this.delayedSetState({
                        mode: 'update',
                        modelName: 'Account',
                        uid,
                        updateObjString: `{
  "name": "Testing Update Account",
  "balance": 100000000
}`
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Destroy"
                    onPress={async () => {
                      let a = await ModelsController.query('Account', {
                        filter: {
                          name: ['=', 'New Testing Account']
                        },
                        limit: 1
                      });
                      a = a[0];
                      let uid = a && a.uid;
                      this.delayedSetState({
                        mode: 'destroy',
                        modelName: 'Account',
                        uid
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Validate"
                    onPress={() => {
                      this.delayedSetState({
                        mode: 'validate',
                        modelName: 'Account',
                        validateObjString: `{
  "kind": "debit",
  "currency": "TWD",
  "balance": 5000000
}`
                      });
                    }}
                  />
                </ListTable.Section>
              );
            }
          })()}

          {(() => {
            switch (this.state.utilsMode) {
            case 'eval-script':
              return (
                <ListTable.Section
                  header="Eval Script"
                  key="es"
                  footer={'Type the script to eval, then Press "Eval Script" to run it and get the results.\n\nUse the log() function to pass in the results if executing async functions.\n\nWARNING: this can be harmful.'}
                >
                  <ListTable.Cell
                    title="Script"
                    textInput={true}
                    multiline={true}
                    autoCapitalize="none"
                    value={this.state.evalScriptString}
                    onChangeText={(t) => this.setState({ evalScriptString: t })}
                    autoCorrect={false}
                    autoFocus={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    key="es"
                    title="Eval Script"
                    onPress={() => {
                      this.setState({ results: '' });

                      const log = (...results) => {
                        results.forEach(result => {
                          const resultStr = JSON.stringify(result, null, 2);
                          this.setState({ esResults: this.state.results + '\n\n' + resultStr });
                        });
                      };

                      try {
                        const result = eval(this.state.evalScriptString);
                        log(result);
                      } catch (e) {
                        alert('ERROR: ' + e);
                      }
                    }}
                  />
                  {this.getResultsOutput(this.state.esResults)}
                  <ListTable.Cell
                    title="Clear"
                    onPress={() => {
                      this.delayedSetState({ evalScriptString: null, results: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
                    onPress={() => {
                      this.delayedSetState({ utilsMode: null, results: null });
                    }}
                  />
                </ListTable.Section>
              );
            default:
              return (
                <ListTable.Section
                  header="Utils"
                  key="u"
                  footer={'Utilities for testing.'}
                >
                  <ListTable.Cell
                    title="Eval Script"
                    onPress={() => {
                      this.delayedSetState({
                        utilsMode: 'eval-script',
                        evalScriptString: `// Type the ES5 script here
var a1 = new Account({ name: 'An Account' });
ModelsController.validate('Account', a1).then(function (result) {
  log(result, a1);
});

ModelsController.query('Account').then(function (accounts) {
  var a2 = accounts[0];
  a2.type = 'setting-this-is-invalid';
  ModelsController.validate('Account', a2).then(function (result) {
    log(result, a2);
  });
});

':)';
`
                       });
                    }}
                  />
                </ListTable.Section>
              );
            }
          })()}

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

          <ListTable.Section
            header="Select Data Backend"
            key="sb"
            footer={'The backend where ModelsController access data from.\nOn the native app, the backend defaults to the Realm, while on the web app, only web API is available.'}
          >
            <ListTable.Cell
              title="Web API"
              check={true}
              checked={this.state.modelsControllerBackendName === 'api'}
              onCheck={() => {
                ModelsController.setBackend('api');
                this.setState({ modelsControllerBackendName: ModelsController.backendName });
              }}
            />
            <ListTable.Cell
              title="Realm"
              check={true}
              checked={this.state.modelsControllerBackendName === 'realm'}
              onCheck={() => {
                ModelsController.setBackend('realm');
                this.setState({ modelsControllerBackendName: ModelsController.backendName });
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

  getResultsOutput = (results = this.state.results) => {
    if (results) {
      return (
        <ListTable.Cell
          title="Results"
          textInput={true}
          multiline={true}
          value={results}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            fontFamily: 'Menlo',
            fontWeight: '100',
            fontSize: 12
          }}
        />
      );
    } else {
      return (
        <ListTable.Cell
          title="No Results Yet"
          disabled={true}
        />
      );
    }
  }
}
