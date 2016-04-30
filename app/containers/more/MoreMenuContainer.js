import React from 'react';
import ContainerBase from 'ContainerBase';

import MoreMenuView from 'views/more/MoreMenuView';

export default class MoreMenuContainer extends ContainerBase {
  constructor(props) {
    super(props);
  }

  render() {
    return <MoreMenuView ref="view" />;
  }

  onFocus() {
    const view = this.refs.view;
    view && view.remountStatusBar && view.remountStatusBar();
  }
}
