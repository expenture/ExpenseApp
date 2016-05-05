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
        ref={(r) => this.registerView(r)}
        focusKey={this.state.focusKey}
        refreshing={state.refreshing}
        lastSyncDatetime={parseInt((new Date()).setMinutes(-10)/1000, 10)}
        mostAncientSyncerName={'花旗銀行'}
        mostAncientSyncerSyncedDatetime={parseInt((new Date()).setMinutes(-30)/1000, 10)}
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
        currentMonthExpenseTopCategories={[
          { name: '餐飲', color: 'sushi', percentage: 0.32 },
          { name: '家居', color: 'rhino', percentage: 0.20 },
          { name: '交通', color: 'havelockBlue', percentage: 0.14 },
          { name: '社交娛樂', color: 'supernova', percentage: 0.12 },
          { name: '戶外活動', color: 'fern', percentage: 0.07 },
          { name: '進修教育', color: 'amethystSmoke', percentage: 0.04 },
          { name: '健身', color: 'carnation', percentage: 0.03 },
          { name: '零食', color: 'tangerine', percentage: 0.03 },
          { name: '其他', color: 'grayChateau', percentage: 0.05 }
        ]}
        onNotificationsPress={handleNotificationPress}
        onShowAllAssestsPress={() => this.setState({ isAllAssestsShown: !this.state.isAllAssestsShown })}
        onShowIncomePress={() => this.setState({ isIncomeShown: !this.state.isIncomeShown })}
        onRefresh={handleRefresh}
      />
    );
  }
}
