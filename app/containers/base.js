/**
 * ContainerBase
 *
 * This class extends the base React Component and adds the functionality to:
 *
 * - Can have a `onConstruct` and `onDestruct` prop function, which are called
 *   when the component is mounted / unmounted with the self ref, this is
 *   mostly used by the parent element (e.g. `MainFrameContainer`) to controll
 *   the element.
 *
 * @providesModule ContainerBase
 */

import React, { Component, PropTypes } from 'react';

export default class ContainerBase extends Component {
  static PropTypes = {
    onConstruct: PropTypes.func,
    onDestruct: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      focusKey: 0
    };
  }

  _handleConstruct() {
    this.props && this.props.onConstruct && this.props.onConstruct(this);
  }

  _handleDestruct() {
    this.props && this.props.onDestruct && this.props.onDestruct(this);
  }

  componentWillMount() {
    this._handleConstruct();
  }

  componentWillUnmount() {
    this._handleDestruct();
  }
}
