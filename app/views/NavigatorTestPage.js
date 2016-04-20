/**
 * @providesModule views/NavigatorTestPage
 */

import React, {
  Component,
  PropTypes
} from 'react';

export default class NavigatorTestPage extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    nextRoute: PropTypes.object
  }

  constructor() {
    super();
    this._goToNextRoute = this._goToNextRoute.bind(this);
    this._goBack = this._goBack.bind(this);
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

  _goToNextRoute() {
    this.props.navigator.push(this.props.nextRoute);
  }

  _goBack() {
    this.props.navigator.pop();
  }
}
