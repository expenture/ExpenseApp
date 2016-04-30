import React from 'react';
import ContainerBase from 'ContainerBase';

import BlankPageView from 'views/BlankPageView';

export default class AccountsContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    return <BlankPageView ref="view" title="AccountsContainer" />;
  }

  onFocus() {
    const view = this.refs.view;
    view && view.remountStatusBar && view.remountStatusBar();
  }
}
