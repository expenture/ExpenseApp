import React from 'react';
import ContainerBase from 'ContainerBase';

import DashboardView from 'views/DashboardView';

export default class DashboardContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    const notificationPress = () => this.props.navigator.push({ name: 'notifications' });
    return <DashboardView ref="view" focusKey={this.state.focusKey} onNotificationPress={notificationPress} />;
  }

  onFocus() {
  }
}
