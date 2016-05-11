import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import store from 'store';
import expentureAPI from 'expentureAPI';

import ScrollView from 'components/ScrollView';
import StatusBar from 'components/StatusBar';
import ListTable from 'components/ListTable';
import Text from 'components/Text';

@connect(state => ({
  expentureAPIState: state.expentureAPI
}))
export default class ExpentureAPIContainer extends ContainerBase {
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
            header="Expenture API State"
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
                {JSON.stringify(this.props.expentureAPIState, null, 2)}
              </Text>
            </ListTable.Cell>
          </ListTable.Section>

          {(() => {
            switch (this.state.mode) {
            case 'sign-in':
              return (
                <ListTable.Section
                  header="Sign In"
                >
                  <ListTable.Cell
                    title="Username"
                    key="Username"
                    textInput={true}
                    value={this.state.username}
                    onChangeText={(t) => this.setState({ username: t })}
                    placeholder="Username"
                    keyboardAppearance="light"
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Password"
                    key="Password"
                    textInput={true}
                    value={this.state.password}
                    onChangeText={(t) => this.setState({ password: t })}
                    placeholder="Password"
                    keyboardAppearance="dark"
                    autoCorrect={false}
                    secureTextEntry={true}
                  />
                  <ListTable.Cell
                    title="Sign In"
                    key="Sign In"
                    onPress={() => {
                      const { username, password } = this.state;
                      expentureAPI.signIn(username, password);
                      this.setState({ mode: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    key="Cancel"
                    onPress={() => {
                      this.setState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'fetch':
              return (
                <ListTable.Section
                  header="Fetch"
                >
                  <ListTable.Cell
                    title="URL"
                    key="URL"
                    textInput={true}
                    value={this.state.url}
                    onChangeText={(t) => this.setState({ url: t })}
                    placeholder="/..."
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Options"
                    key="Options"
                    textInput={true}
                    value={this.state.options}
                    onChangeText={(t) => this.setState({ options: t })}
                    placeholder="{}"
                    autoCorrect={false}
                    multiline={true}
                    style={{
                      fontFamily: 'Menlo',
                      fontWeight: '100',
                      fontSize: 12
                    }}
                  />
                  <ListTable.Cell
                    title="Fetch"
                    key="Fetch"
                    onPress={async () => {
                      try {
                        const { url, options } = this.state;
                        const response = await expentureAPI.fetch(url, JSON.parse(options));
                        const responseStatus = response.status;
                        const responseText = response.text();
                        alert(`Status: ${responseStatus}, Text: ${responseText}`);
                        this.setState({ mode: null });
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    key="Cancel"
                    onPress={() => {
                      this.setState({ mode: null });
                    }}
                  />
                </ListTable.Section>
              );
            case 'set-backend-url':
              return (
                <ListTable.Section
                  header="Set Backend URL"
                >
                  <ListTable.Cell
                    title="Backend URL"
                    key="Backend URL"
                    textInput={true}
                    value={this.state.backendURL}
                    onChangeText={(t) => this.setState({ backendURL: t })}
                    placeholder="https://..."
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Set Backend URL"
                    key="Set Backend URL"
                    onPress={() => {
                      const { backendURL } = this.state;
                      expentureAPI.setBackendURL(backendURL);
                      this.setState({ mode: null });
                    }}
                  />
                  <ListTable.Cell
                    title="Cancel"
                    key="Cancel"
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
                >
                  <ListTable.Cell
                    title="Sign In"
                    key="Sign In"
                    onPress={() => {
                      this.setState({ mode: 'sign-in' });
                    }}
                  />
                  <ListTable.Cell
                    title="Sign Out"
                    key="Sign Out"
                    onPress={() => {
                      expentureAPI.signOut();
                    }}
                  />
                  <ListTable.Cell
                    title="Get Access Token"
                    key="Get Access Token"
                    onPress={async () => {
                      const token = await expentureAPI.asyncGetAccessToken();
                      alert(`Access Token: ${JSON.stringify(token)}`);
                    }}
                  />
                  <ListTable.Cell
                    title="Fetch"
                    key="Fetch"
                    onPress={() => {
                      this.setState({ mode: 'fetch', url: '/ping', options: '{\n  "method":  "GET"\n}' });
                    }}
                  />

                  <ListTable.Cell
                    title="Set Backend URL"
                    key="Set Backend URL"
                    onPress={() => {
                      this.setState({ mode: 'set-backend-url' });
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

  enableSetStateForTesting() {
    this.setState({
      newStateString: JSON.stringify(this.props.state, null, 2),
      setStateForTestingEnabled: true
    });
  }

  disableSetStateForTesting() {
    this.setState({ setStateForTestingEnabled: false });
  }

  setStateForTesting() {
    try {
      store.enableTesting();
      store.setStateForTesting(JSON.parse(this.state.newStateString));
      this.disableSetStateForTesting();
    } catch (e) {
      alert(e);
    }
  }

  resetStateForTesting() {
    store.enableTesting();
    store.resetStateForTesting();
  }
}
