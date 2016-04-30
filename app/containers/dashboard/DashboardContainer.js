import React from 'react';
import ContainerBase from 'ContainerBase';

import DashboardView from 'views/DashboardView';

export default class DashboardContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    return <DashboardView ref="view" title="DashboardContainer" />;
  }

  onFocus() {
    const view = this.refs.view;
    view && view.remountStatusBar && view.remountStatusBar();
  }
}
