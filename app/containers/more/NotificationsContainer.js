import React from 'react';
import ContainerBase from 'ContainerBase';

import NotificationsView from 'views/NotificationsView';

export default class NotificationsContainer extends ContainerBase {
  constructor() {
    super();
  }

  render() {
    const now = new Date();
    const aHourAgo = new Date();
    aHourAgo.setHours(aHourAgo.getHours() - 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 2);
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 3);
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);

    const notifications = [
      {
        uid: 'n-3',
        title: '大筆金額轉出通知',
        message: '提醒您，最近已從「中華郵政」帳戶轉出了 NT$ 15,531.00 到「2400 **** 1883」。',
        datetime: yesterday,
        readAt: aHourAgo
      },
      {
        uid: 'n-5',
        title: '帳單繳費通知',
        message: '您的「國泰銀行玉璽卡」12 月份帳單將在下週一到期，提醒您記得繳款。',
        datetime: threeDaysAgo,
        hasAction: true,
        handledAt: yesterday,
        readAt: threeDaysAgo
      },
      {
        uid: 'n-6',
        title: '消費通知',
        message: '您本月累積在「飲食」分類的消費已經超過了上個月的 132%，共多出 NT$ 1,337.00。',
        datetime: threeDaysAgo,
        readAt: threeDaysAgo
      },
      {
        uid: 'n-7',
        title: '資產變動通知',
        message: '您的非固定資產在過去三個月累積成長了 11%，恭喜！',
        datetime: fourDaysAgo,
        readAt: fourDaysAgo
      },
      {
        uid: 'n-8',
        title: '帳務提醒',
        message: '提醒您，週期帳務「網路費 (NT$ 1,000.00)」即將在三天後到期。',
        datetime: fourDaysAgo,
        hasAction: true,
        handledAt: threeDaysAgo,
        readAt: fourDaysAgo
      },
      {
        uid: 'n-9',
        title: '帳務逾期通知',
        message: '您有一筆帳務「差旅費報帳 (NT$ 12,000.00)」逾期未結清，提醒您前往處理。',
        datetime: fourDaysAgo,
        hasAction: true,
        handledAt: threeDaysAgo,
        readAt: fourDaysAgo
      },
      {
        uid: 'n-10',
        title: '未入帳通知',
        message: '您的「國泰世華銀行 敗家用」帳號，在一週前「陶板屋晚餐」(NT$ -3,000.00) 的紀錄尚未入帳，提醒您核對。',
        datetime: fiveDaysAgo,
        hasAction: true,
        handledAt: threeDaysAgo,
        readAt: fiveDaysAgo
      }
    ];

    // readAt == null
    const unreadNotifications = [
      {
        uid: 'n-1',
        title: '發現未知的帳戶名稱',
        message: '同步服務「Apple Store 收據」時發現了新的未知帳戶／信用卡名稱：「**** 1234」，需要手動指定它是您的哪一個帳戶。',
        datetime: now,
        hasAction: true
      },
      {
        uid: 'n-2',
        title: '預算通知',
        message: '提醒您，您本月的「吃吃喝喝」預算已經消耗了 80%，距離預算週期結束還有 11 天，剩下的每日平均額度是：NT$ 42.38。',
        datetime: aHourAgo
      }
    ];

    // hasAction == true && handledAt == null && readAt != null
    const unhandledNotifications = [
      {
        uid: 'n-4',
        title: '帳單繳費通知',
        message: '您的「花旗饗樂卡」12 月份帳單將在下週三到期，提醒您記得繳款。',
        datetime: threeDaysAgo,
        hasAction: true,
        readAt: aHourAgo
      }
    ];

    return (
      <NotificationsView
        focusKey={this.state.focusKey}
        refreshing={false}
        notifications={notifications}
        unreadNotifications={unreadNotifications}
        unhandledNotifications={unhandledNotifications}
        onNotificationPress={(notificationUID) => {}}
        onLoadMore={() => {}}
        onRefresh={() => {}}
      />
    );
  }
}
