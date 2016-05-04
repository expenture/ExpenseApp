import React, { Component } from 'react';
import ContainerBase from 'ContainerBase';

import Platform from 'utils/Platform';

import BlankPageView from 'views/BlankPageView';

export default class NewTransactionContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    return <BlankPageView title="NewTransactionContainer" />;
  }

  handleBack() {}

  componentWillMount() {
    this._handleConstruct();
    if (Platform.OS === 'android') {
      this.registerAndroidHardwareBackPress.bind(this)();
    }
  }

  componentWillUnmount() {
    this._handleDestruct();
    if (Platform.OS === 'android') {
      this.unRegisterAndroidHardwareBackPress.bind(this)();
    }
  }

  registerAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;

    this.androidHardwareBackPressHandler = () => {
      this.handleBack();
      return true;
    };

    BackAndroid.addEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }

  unRegisterAndroidHardwareBackPress() {
    const RN = require('react-native');
    const { BackAndroid } = RN;
    BackAndroid.removeEventListener('hardwareBackPress', this.androidHardwareBackPressHandler);
  }
}
