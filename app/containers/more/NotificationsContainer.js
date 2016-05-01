import React from 'react';
import ContainerBase from 'ContainerBase';

import BlankPageView from 'views/BlankPageView';

export default class NotificationsContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    return <BlankPageView title="NotificationsContainer" barStyle="light-content" focusKey={this.state.focusKey} />;
  }
}
