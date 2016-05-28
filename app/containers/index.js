/**
 * The top level index and root of containers.
 */

import React, { Component } from 'react';

import config from 'config';
import getGlobal from 'utils/getGlobal';

import DevCenterContainer from './DevCenterContainer';
import SignInContainer from './SignInContainer';
import MainFrameContainer from './MainFrameContainer';

export default class AppContainer extends Component {
  constructor() {
    super();

    this.state = {
      devMode: config.devMode
    };

    const glob = getGlobal();
    if (glob) {
      glob.devMode = this.devMode;
    }
  }

  render() {
    if (this.state.devMode) {
      return <DevCenterContainer />;
    }

    if (!this.state.signedIn) {
      return <SignInContainer tempSignInAction={() => this.setState({ signedIn: true })} />;
    }

    return (
      <MainFrameContainer />
    );
  }

  devMode = (tf) => {
    this.setState({ devMode: tf });
  }
}
