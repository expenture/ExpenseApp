import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import SignInView from 'views/SignInView';

export default class SignInContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <SignInView
        handleSignIn={this._signIn}
      />
    );
  }

  @autobind
  _signIn() {
    this.props.tempSignInAction();
  }
}
