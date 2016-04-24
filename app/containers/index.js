/**
 * The top level index and root of containers.
 */

import React, { Component } from 'react';

import DevCenterContainer from './DevCenterContainer';
import SignInContainer from './SignInContainer';
import MainFrameContainer from './MainFrameContainer';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.state.devCenter) {
      return <DevCenterContainer />;
    }

    if (!this.state.signedIn) {
      return <SignInContainer tempSignInAction={() => this.setState({ signedIn: true })} />;
    }

    return (
      <MainFrameContainer />
    );
  }
}
