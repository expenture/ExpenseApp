/**
 * ContainerBase
 *
 * This class extends the base React Component and adds the functionality to:
 *
 * - Can have a `onConstruct` and `onDestruct` prop function, which are called
 *   when the component is mounted / unmounted with the self ref, this is
 *   mostly used by the parent element (e.g. `MainFrameContainer`) to controll
 *   the element.
 * - Add a registerView function to register the main view, and, handle
 *   onFocus, onBlur, and onRefresh events with the default behavior: pass the
 *   event down to the view.
 *
 * @providesModule ContainerBase
 */

import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

export default class ContainerBase extends Component {
  static PropTypes = {
    onConstruct: PropTypes.func.isRequired,
    onDestruct: PropTypes.func.isRequired,
    appFrame: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      focusKey: 0
    };
  }

  @autobind
  delayedSetState(newState) {
    setTimeout(() => {
      this.setState(newState);
    }, 100);
  }

  @autobind
  registerView(ref) {
    if (!ref) return;

    this.view = ref;

    if (this.pendingViewFunction) {
      this.pendingViewFunction(ref);
      this.pendingViewFunction = null;
    }
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

  onFocus() {
    if (this.view) {
      this.view.onFocus && this.view.onFocus.bind(this.view)();
    } else {
      this.pendingViewFunction = (ref) => {
        if (this.props.appFrame.getCurrentContainerRef() === this) {
          ref.onFocus && ref.onFocus.bind(ref)();
        }
      };
    }
  }

  onBlur() {
    this.view && this.view.onBlur && this.view.onBlur.bind(this.view)();
  }

  onRefresh() {
    this.view && this.view.onRefresh && this.view.onRefresh.bind(this.view)();
  }
}
