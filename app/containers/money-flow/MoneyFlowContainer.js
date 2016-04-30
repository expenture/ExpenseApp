import React from 'react';
import ContainerBase from 'ContainerBase';

import BlankPageView from 'views/BlankPageView';

export default class MoneyFlowContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    return <BlankPageView ref="view" title="MoneyFlowContainer" />;
  }

  onFocus() {
    const view = this.refs.view;
    view && view.remountStatusBar && view.remountStatusBar();
  }
}
