import React, { Component } from 'react';

import SignInView from 'views/SignInView';

export default class SignInContainer extends Component {
  constructor() {
    super();
    this._signIn = this._signIn.bind(this);
  }

  render() {
    return (
      <SignInView
        handleSignIn={this._signIn}
      />
    );
  }

  _signIn() {
    this.props.tempSignInAction();
  }
}
