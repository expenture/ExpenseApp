/**
 * @providesModule views/DashboardView
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';
import autobind from 'autobind-decorator';
import Orientation from 'react-native-orientation';

import Color from 'color';
import moment from 'utils/moment';

import StatusBar from 'components/StatusBar';
import ScrollView from 'components/ScrollView';
import View from 'components/View';
import Text from 'components/Text';

import colors from 'constants/colors';

import parseMoney from 'utils/parseMoney';

export default class DashboardView extends Component {
  static propTypes = {
    // UI Props
    focusKey: PropTypes.any,
    // UI State
    refreshing: PropTypes.bool,
    // Data
    lastSyncDatetime: PropTypes.number,
    mostAncientSyncerSyncedDatetime: PropTypes.number,
    mostAncientSyncerName: PropTypes.string,
    currencyLabel: PropTypes.string,
    currentYear: PropTypes.number,
    currentMonth: PropTypes.number,
    isAllAssestsShown: PropTypes.bool,
    isIncomeShown: PropTypes.bool,
    assetsAmount: PropTypes.number,
    allAssetsAmount: PropTypes.number,
    debtsAmount: PropTypes.number,
    monthlyEstimatedBalance: PropTypes.number,
    monthlyEstimatedExpense: PropTypes.number,
    unreadNotificationsCount: PropTypes.number,
    pendingNotificationsCount: PropTypes.number,
    notificationTitles: PropTypes.arrayOf(PropTypes.string),
    latestMonthlyExpenseAmounts: PropTypes.arrayOf(PropTypes.number),
    latestMonthlyIncomeAmounts: PropTypes.arrayOf(PropTypes.number),
    latestMonthlyExpectedExpenseAmounts: PropTypes.arrayOf(PropTypes.number),
    latestMonthlyExpectedIncomeAmounts: PropTypes.arrayOf(PropTypes.number),
    currentMonthExpenseTopCategories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired
    })),
    // Action Handlers
    onNotificationsPress: PropTypes.func.isRequired,
    onShowAllAssestsPress: PropTypes.func.isRequired,
    onShowIncomePress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      focus: false
    };
  }

  render() {
    const { state, props } = this;

    return (
      <ScrollView>
        <Text>Coming Soon</Text>
      </ScrollView>
    );
  }

  @autobind
  scrollToTop() {
    // this.refs.scrollView.scrollTo({ y: 0 });
  }

  @autobind
  onRefresh() {
    this.scrollToTop();
  }

  componentWillReceiveProps(nextProps) {
  }

  @autobind
  _orientationDidUpdate(orientation) {
    if (orientation !== 'PORTRAIT' && orientation !== 'LANDSCAPE') return;
    this.setState({ orientation });
  }

  componentWillMount() {
    const initialOrientation = Orientation.getInitialOrientation();
    this._orientationDidUpdate(initialOrientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidUpdate);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidUpdate);
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }
}

const styles = StyleSheet.create({
});
