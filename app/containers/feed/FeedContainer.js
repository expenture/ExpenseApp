import React from 'react';
import autobind from 'autobind-decorator';
import ContainerBase from 'ContainerBase';

import FeedView from 'views/FeedView';

import Transaction from 'models/Transaction';

export default class FeedContainer extends ContainerBase {
  constructor() {
    super();

    this.state = {
      transactions: this.generateTransactionsData(),
      refreshing: false
    };
  }

  render() {
    let now = new Date();
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return (
      <FeedView
        ref={(r) => this.registerView(r)}
        focusKey={this.state.focusKey}
        refreshing={this.state.refreshing}
        startingDate={now}
        endingDate={thirtyDaysAgo}
        transactions={this.state.transactions}
        onTransactionPress={(transactionUID) => {}}
        onRefresh={this.refresh}
      />
    );
  }

  @autobind
  generateTransactionsData() {
    const now = new Date();
    const aHourAgo = new Date();
    aHourAgo.setHours(aHourAgo.getHours() - 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 2);
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 3);

    const transactions = [
      new Transaction({
        description: '居家水洗服務',
        painPartyName: 'Kuma Wash',
        amount: -1000 * 1000,
        datetime: now
      }),
      new Transaction({
        description: '焦糖星冰樂 (大)',
        painPartyName: 'Starbucks',
        amount: -100 * 1000,
        datetime: aHourAgo
      }),
      new Transaction({
        description: 'iTunes Match 年費',
        painPartyName: 'Apple iTunes',
        amount: -590 * 1000,
        datetime: aHourAgo
      }),
      new Transaction({
        description: '壽司均一價 $ 10 × 8',
        painPartyName: '爭鮮外帶 SUSHI TAKE OUT',
        amount: -80 * 1000,
        datetime: aHourAgo
      }),
      new Transaction({
        description: '全面啟動 19:20 × 2、雙人套餐',
        painPartyName: '威秀影城',
        amount: -680 * 1000,
        datetime: yesterday
      }),
      new Transaction({
        description: '陶板屋套餐 × 3',
        painPartyName: '陶板屋',
        amount: -1770 * 1000,
        datetime: yesterday
      }),
      new Transaction({
        description: 'ATM 存款',
        painPartyName: 'ATM 存款',
        amount: 5000 * 1000,
        datetime: yesterday
      }),
      new Transaction({
        description: '再生紙らくがき帳 無地・B5、水性六角ツイ...',
        painPartyName: 'MUJI 無印良品',
        amount: -190 * 1000,
        datetime: threeDaysAgo
      }),
      new Transaction({
        description: '日式火鍋豬肉片、泗州芥辣紫菜、美粒果...',
        painPartyName: '松清超市',
        amount: -3000 * 1000,
        datetime: threeDaysAgo
      }),
      new Transaction({
        description: '世界是設計 (9789865829964)',
        painPartyName: '博客來網路書店',
        amount: -289 * 1000,
        datetime: threeDaysAgo
      }),
      new Transaction({
        description: '沙拉 BAR 大亨堡 - 美式香腸',
        painPartyName: '統一超商 7-ELEVEN',
        amount: -50 * 1000,
        datetime: threeDaysAgo
      }),
      new Transaction({
        description: '左營－台北 早鳥優惠票',
        painPartyName: '台灣高鐵 THSR',
        amount: -1340 * 1000,
        datetime: fourDaysAgo
      }),
      new Transaction({
        description: '酒釀桂圓麵包、酒釀桂圓麵包 × 2',
        painPartyName: '吳寶春麵包店',
        amount: -1050 * 1000,
        datetime: fourDaysAgo
      })
    ];

    for (let i = 4; i < 30; i++) {
      let datetime = new Date();
      datetime.setDate(datetime.getDate() - i);

      let tCount = Math.random() * 8;

      for (let j = 0; j < tCount; j++) {
        transactions.push(new Transaction({
          description: '消費',
          amount: Math.random() * -500 * 1000,
          datetime
        }));
      }
    }

    return transactions;
  }

  @autobind
  refresh() {
    this.setState({ refreshing: true });

    let transactions = this.generateTransactionsData();

    setTimeout(() => {
      this.setState({ transactions, refreshing: false });
    }, 3000);
  }
}
