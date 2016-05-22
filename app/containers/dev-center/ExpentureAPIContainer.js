import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContainerBase from 'ContainerBase';

import store from 'store';
import ExpentureAPI from 'ExpentureAPI';

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
                  key="Sign In"
                  footer={'Enter the username (email) and password, then press "Sign In" to sign in (i.e. request for an access token).'}
                >
                  <ListTable.Cell
                    title="Username"
                    textInput={true}
                    value={this.state.username}
                    onChangeText={(t) => this.setState({ username: t })}
                    placeholder="Username"
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Password"
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
                    onPress={() => {
                      const { username, password } = this.state;
                      ExpentureAPI.signIn(username, password).then(() => {
                        alert('Sign in success.');
                      }).catch(() => {
                        alert('Sign in failure.');
                      });
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
            case 'fetch':
              return (
                <ListTable.Section
                  header="Fetch"
                  key="Fetch"
                  footer={'Send a fetch request to the backend server. Authentication is automatically handled if signed in and the status is "ready".\n\nEnter the request URL (first parameter of "fetch") and the options (object as JSON, the second parameter of "fetch") and press "Fetch" to send the request.'}
                >
                  <ListTable.Cell
                    title="URL"
                    textInput={true}
                    value={this.state.url}
                    onChangeText={(t) => this.setState({ url: t })}
                    placeholder="/..."
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Options"
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
                    onPress={async () => {
                      try {
                        const { url, options } = this.state;
                        const response = await ExpentureAPI.fetch(url, JSON.parse(options));
                        const responseStatus = response.status;
                        const responseText = await response.text();
                        alert(`Status: ${responseStatus}, Response Text: ${responseText}`);
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  />
                  <ListTable.Cell
                    title="Back"
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
                  key="URL"
                  footer={'Enter the new backend URL and press "Set Backend URL" to change the backend server URL.'}
                >
                  <ListTable.Cell
                    title="Backend URL"
                    textInput={true}
                    value={this.state.backendURL}
                    onChangeText={(t) => this.setState({ backendURL: t })}
                    placeholder="https://..."
                    autoCorrect={false}
                    autoFocus={true}
                  />
                  <ListTable.Cell
                    title="Set Backend URL"
                    onPress={() => {
                      const { backendURL } = this.state;
                      ExpentureAPI.setBackendURL(backendURL);
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
                  footer={'\nThe ExpentureAPI module is in charge to authenticate and send requests to the backend server. It store and updates its state in the redux store.\n\nHere you can test the functions on it directly.'}
                >
                  <ListTable.Cell
                    title="Sign In"
                    onPress={() => {
                      this.setState({ mode: 'sign-in' });
                    }}
                  />
                  <ListTable.Cell
                    title="Sign Out"
                    onPress={() => {
                      ExpentureAPI.signOut().then(() => {
                        alert('Sign out success.');
                      }).catch(() => {
                        alert('Sign out failure.');
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Sign Out (Force)"
                    onPress={() => {
                      ExpentureAPI.signOut({ force: true }).then(() => {
                        alert('Sign out success.');
                      }).catch(() => {
                        alert('Sign out failure.');
                      });
                    }}
                  />
                  <ListTable.Cell
                    title="Get Access Token"
                    onPress={async () => {
                      const token = await ExpentureAPI.asyncGetAccessToken();
                      alert(`Access Token: ${JSON.stringify(token)}`);
                    }}
                  />
                  <ListTable.Cell
                    title="Send Fetch Request"
                    onPress={() => {
                      this.setState({ mode: 'fetch', url: '/ping', options: '{\n  "method":  "GET"\n}' });
                    }}
                  />
                  <ListTable.Cell
                    title="Set Backend URL"
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
}
