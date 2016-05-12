/**
 * @providesModule views/NavigatorTestPage
 */

import React, {
  Component,
  PropTypes
} from 'react';
import autobind from 'autobind-decorator';

export default class NavigatorTestPage extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    nextRoute: PropTypes.object
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>
          This is route: {JSON.stringify(this.props.route, null, 2)}{'\n'}
        </p>
        {(() => {
          if (this.props.nextRoute) {
            return (
              <p>
                <a href="javascript:void(0)" onClick={this._goToNextRoute}>
                  Go To Next Route
                </a>
              </p>
            );
          }
        })()}
        <p>
          <a href="javascript:void(0)" onClick={this._goBack}>
            Go Back
          </a>
        </p>
      </div>
    );
  }

  @autobind
  _goToNextRoute() {
    this.props.navigator.push(this.props.nextRoute);
  }

  @autobind
  _goBack() {
    this.props.navigator.pop();
  }
}
