/**
 * The top level index and root of containers.
 */

import React, { Component } from 'react';
import TabView from 'components/TabView';
import AppNavigator from 'components/AppNavigator';
import RootNavigator from 'components/RootNavigator';

import SignInContainer from './SignInContainer';
import MainFrameContainer from './MainFrameContainer';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (!this.state.signedIn) {
      return <SignInContainer tempSignInAction={() => this.setState({ signedIn: true })} rootNavigator={navigator} />;
    }

    return (
      <MainFrameContainer />
    );
  }
}
