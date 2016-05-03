import React from 'react';
import ContainerBase from 'ContainerBase';

import DashboardView from 'views/DashboardView';

export default class DashboardContainer extends ContainerBase {
  constructor() {
    super();
    this.state = {
      isIncomeShown: true
    };
  }

  render() {
    const { state, props } = this;
    const handleNotificationPress = () => this.props.navigator.push({ name: 'notifications' });
    const handleRefresh = () => {
      this.setState({ refreshing: true });
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
    };

    return (
      <DashboardView
        ref="view"
        focusKey={this.state.focusKey}
        refreshing={state.refreshing}
        currencyLabel="NT$"
        currentYear={2016}
        currentMonth={5}
        isAllAssestsShown={this.state.isAllAssestsShown}
        isIncomeShown={this.state.isIncomeShown}
        assetsAmount={1337000000}
        allAssetsAmount={102476800000}
        debtsAmount={-65535000}
        monthlyEstimatedBalance={108000000}
        monthlyEstimatedExpense={22000000}
        unreadNotificationsCount={2}
        pendingNotificationsCount={1}
        notificationTitles={['發現未知帳戶', '大筆金額轉帳通知', '消費提醒 － 12 月電費', '帳單繳費通知']}
        latestMonthlyExpenseAmounts={[-22000000, -20000000, -52000000, -24194000, -24827000, -20494000, -19398000, -23402000, -25039000, -20395000, -23098000, -3091000]}
        latestMonthlyIncomeAmounts={[64000000, 65000000, 64000000, 68000000, 67483000, 69238000, 68000000, 68300000, 65000000, 64000000, 67000000, 12000000]}
        latestMonthlyExpectedExpenseAmounts={[-22000000, -20000000, -52000000, -24194000, -24827000, -20494000, -19398000, -23402000, -25039000, -20395000, -23098000, -23098000]}
        latestMonthlyExpectedIncomeAmounts={[64000000, 65000000, 64000000, 68000000, 67483000, 69238000, 68000000, 68300000, 65000000, 64000000, 67000000, 70000000]}
        onNotificationsPress={handleNotificationPress}
        onShowAllAssestsPress={() => this.setState({ isAllAssestsShown: !this.state.isAllAssestsShown })}
        onShowIncomePress={() => this.setState({ isIncomeShown: !this.state.isIncomeShown })}
        onRefresh={handleRefresh}
      />
    );
  }

  onFocus() {
  }

  onRefresh() {
    this.refs.view && this.refs.view.scrollToTop && this.refs.view.scrollToTop();
  }
}
