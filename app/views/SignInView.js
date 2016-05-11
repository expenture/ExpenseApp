/**
 * @providesModule views/SignInView
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class SignInView extends Component {
  render() {
    // Data
    // const {} = this.props;
    // UI Props
    // const {} = this.props;
    // UI State
    // const {} = this.props;
    // Action Handlers
    const {
      handleSignIn
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Sign In
        </Text>
        <TouchableOpacity
          onPress={handleSignIn}
        >
          <Text>Sign In With Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
