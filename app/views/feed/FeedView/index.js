/**
 * @providesModule views/FeedView
 */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  StyleSheet,
  StatusBar,
  ScrollView,
  ListView,
  View,
  Text,
  RefreshControl,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Transaction from 'models/Transaction';

import moment, { getCalendarDateLocale } from 'utils/moment';
import parseMoney from 'utils/parseMoney';

import colors from 'constants/colors';

export default class FeedView extends Component {
  static propTypes = {
    // UI Props
    focusKey: PropTypes.any,
    // UI State
    refreshing: PropTypes.bool,
    // Data
    startingDate: PropTypes.instanceOf(Date).isRequired,
    endingDate: PropTypes.instanceOf(Date).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.instanceOf(Transaction)).isRequired,
    // Action Handlers
    onTransactionPress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDay: null,
      scrollY: 0
    };

    this.dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob.rows[rowID],
      getSectionHeaderData: (dataBlob, sectionID) => dataBlob.sections[sectionID],
      rowHasChanged: (r1, r2) => {
        // TODO: Update if current minute changed
        return r1.uid !== r2.uid ||
               r1.updatedAt !== r2.updatedAt;
      },
      sectionHeaderHasChanged: (s1, s2) => s1.code !== s2.code
    });

    this.updateDataSource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions !== this.props.transactions) {
      this.updateDataSource();
    }
  }

  render() {
    const { props } = this;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          key={props.focusKey}
          barStyle="light-content"
          networkActivityIndicatorVisible={props.refreshing}
        />
        <TransactionsListView
          parent={this}
          dataSource={this.dataSource}
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
          onTransactionPress={props.onTransactionPress}
        />
        <View style={styles.head}>
          <View style={styles.headToolbar}>
            <View style={styles.headToolbarRightAction}>
            </View>
            <View style={styles.headToolbarTitle}>
              <Text style={styles.headToolbarTitleText} numberOfLines={1}>
                {(this.state.selectedDay && this.state.selectedDay !== this.days[this.days.length - 1]) ? moment(this.state.selectedDay).format('ll') : '時間軸'}
              </Text>
              {(() => {
                const daySummery = this.daySummeries &&
                                   this.state.selectedDay &&
                                   this.daySummeries[this.state.selectedDay];

                if (daySummery) return (
                  <Text style={styles.headToolbarSubtitleText} numberOfLines={1}>
                    {daySummery}
                  </Text>
                );
              })()}
            </View>
            <View style={styles.headToolbarLeftAction}>
            </View>
          </View>
          <Animated.View
            style={[
              styles.headChart,
              {
                // transform: [
                //   {
                //     translateY: this.state.scrollY.interpolate({
                //       inputRange: [-99999, 0, (headMaxHeight - headMinHeight), 99999],
                //       outputRange: [0, 0, -(headMaxHeight - headMinHeight) / 2, -(headMaxHeight - headMinHeight) / 2]
                //     })
                //   },
                //   {
                //     scaleY: this.state.scrollY.interpolate({
                //       inputRange: [-99999, 0, (headMaxHeight - headMinHeight), 99999],
                //       outputRange: [1, 1, headChartMinScale, headChartMinScale]
                //     })
                //   }
                // ]
              }
            ]}
          >
            <ExpenseBarChart
              parent={this}
              days={this.days}
              dailyExpenses={this.dailyExpenses}
              dailyIncomes={this.dailyIncomes}
              // selectedDay={this.state.selectedDay}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.scrollDetectInterval = setInterval(this._scrollDetectIntervalFunction, 100);

    this.scrollView.scrollTo({ y: -headMinHeight, animated: false });
  }

  _scrollDetectIntervalFunction = () => {
    if (this.state.scrolling) return;
    if (this.scrollDetectIntervalLastScrollY === this.scrollY) return;
    this.scrollDetectIntervalLastScrollY = this.scrollY;

    const gridScrollY = parseInt(this.scrollY / 12, 10) * 12;

    if (this.scrollViewGridScrollY !== gridScrollY) {
      this.scrollViewGridScrollY = gridScrollY;

      const selectedDay = this.scrollSectionMap &&
                          this.scrollSectionMap[gridScrollY];

      if (selectedDay && selectedDay !== this.state.selectedDay) {
        this.setState({ selectedDay });
      }
    }

  }

  componentWillUnmount() {
    clearInterval(this.scrollDetectInterval);
  }

  scrollToDay = (dayStr) => {
    // const sectionIndex = this.sectionIDs.indexOf(dayStr);
    // if (sectionIndex < 0) return;

    // const rowsBefore = this.rowIDs.slice(0, sectionIndex);

    // const scrollToY =
    //   sectionHeight * sectionIndex +
    //   rowHeight * rowsBefore.map(rows => rows.length)
    //                         .reduce((sum, length) => sum + length, 0) +
    //   separatorHeight * rowsBefore.map(rows => rows.length - 1)
    //                               .reduce((sum, length) => sum + length, 0);

    const scrollToY = this.sectionPositions[dayStr];

    if (scrollToY) {
      this.setState({ scrolling: true, selectedDay: dayStr });

      this.listView.scrollTo({ y: scrollToY - headMinHeight });

      clearTimeout(this.scrollToDayTimeout);
      this.scrollToDayTimeout = setTimeout(() => {
        this.setState({ scrolling: false });
      }, 800);
    }
  }

  onRefresh = () => {
    if (!this.days) return;
    this.scrollToDay(this.days[this.days.length - 1]);
  }

  updateDataSource = () => {
    const { props } = this;

    const startingMoment = moment(props.startingDate);
    const startingDayOfYear = startingMoment.dayOfYear();
    const endingMoment = moment(props.endingDate);
    const endingDayOfYear = endingMoment.dayOfYear();
    const lastYearDays = moment(startingMoment).dayOfYear(-1).dayOfYear() + 1;
    let rangeDays = startingDayOfYear - endingDayOfYear;
    if (rangeDays < 0) {
      rangeDays += lastYearDays;
    }
    let days = (new Array(rangeDays));
    let dailyExpenses = (new Array(rangeDays)).fill(0);
    let dailyIncomes = (new Array(rangeDays)).fill(0);

    const transactionsObj = props.transactions.reduce((obj, n) => ({ ...obj, [n.uid]: n }), {});

    let sectionIDs = [];
    let rowIDs = [];
    let sectionPositions = {};

    let dataBlob = {
      sections: {},
      rows: transactionsObj
    };

    let transactionsForEachLastMomentDateString;
    let transactionsForEachLastSectionIndex = -1;
    let transactionsForEachPosition = 0;
    props.transactions.forEach((transaction) => {
      let transactionMoment = moment(transaction.datetime);
      const transactionDayOfYear = transactionMoment.dayOfYear();
      let transactionDaysFromStart = startingDayOfYear - transactionDayOfYear;
      // handle cross year
      if (transactionDaysFromStart < 0) {
        transactionDaysFromStart += lastYearDays;
      }
      let transactionMomentDateString = transactionMoment.format('YYYY-MM-DD');

      if (transactionMomentDateString !== transactionsForEachLastMomentDateString) {
        days[transactionDaysFromStart] = transactionMomentDateString;
        sectionIDs.push(transactionMomentDateString);

        dataBlob.sections[transactionMomentDateString] = {
          code: transactionMomentDateString,
          title: transactionMoment.calendar(null, getCalendarDateLocale())
        };

        sectionPositions[transactionMomentDateString] = transactionsForEachPosition - separatorHeight;
        rowIDs.push([]);
        transactionsForEachLastSectionIndex += 1;
        transactionsForEachPosition -= separatorHeight;
        transactionsForEachPosition += sectionHeight;
        transactionsForEachLastMomentDateString = transactionMomentDateString;
      }

      if (transaction.amount < 0) {
        dailyExpenses[transactionDaysFromStart] -= transaction.amount;
      } else {
        dailyIncomes[transactionDaysFromStart] += transaction.amount;
      }

      rowIDs[transactionsForEachLastSectionIndex].push(transaction.uid);
      transactionsForEachPosition += rowHeight;
      transactionsForEachPosition += separatorHeight;
    });

    this.dataBlob = dataBlob;
    this.sectionIDs = sectionIDs;
    this.rowIDs = rowIDs;
    this.sectionPositions = sectionPositions;
    this.dataSource = this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    this.days = days.reverse();
    this.dailyExpenses = dailyExpenses.reverse();
    this.dailyIncomes = dailyIncomes.reverse();

    setTimeout(() => {
      let scrollSectionMap = {};

      let forLoopLastSectionID = sectionIDs[0];
      let forLoopNextSectionIndex = 1;
      let forLoopNextSectionID = sectionIDs[forLoopNextSectionIndex];
      for (let i = 0; i < transactionsForEachPosition; i += 12) {
        if (i > sectionPositions[forLoopNextSectionID] - sectionHeight) {
          forLoopLastSectionID = forLoopNextSectionID;
          forLoopNextSectionIndex++;
          forLoopNextSectionID = sectionIDs[forLoopNextSectionIndex];
        }
        scrollSectionMap[i] = forLoopLastSectionID;
      }

      this.scrollSectionMap = scrollSectionMap;
    }, 0);

    setTimeout(() => {
      let daySummeries = {};

      days.forEach((day, i) => {
        let summery = [];
        const dayIndex = days.indexOf(day);

        if (dayIndex < 0) return;
        const dayExpense = dailyExpenses[dayIndex];
        const dayIncome = dailyIncomes[dayIndex];

        if (dayExpense > 0) {
          summery.push(`消費：NT$ ${parseMoney(dayExpense)[0]}`);
        }

        if (dayIncome > 0) {
          summery.push(`收入：NT$ ${parseMoney(dayIncome)[0]}`);
        }

        daySummeries[day] = summery.join('，');
      });

      this.daySummeries = daySummeries;
      this.setState({ daySummeries });
    }, 0);
  }
}

class ExpenseBarChart extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.days !== nextProps.days ||
           this.props.dailyExpenses !== nextProps.dailyExpenses ||
           this.props.dailyIncomes !== nextProps.dailyIncomes ||
           this.props.selectedDay !== nextProps.selectedDay;
  }

  render() {
    const {
      parent,
      days,
      dailyExpenses,
      dailyIncomes,
      selectedDay
    } = this.props;

    return (
      <View
        style={styles.expenseBarChart}
        onLayout={(e) => {
          this.expenseBarChartX = e.nativeEvent.layout.x;
          this.expenseBarChartWidth = e.nativeEvent.layout.width;
        }}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={this.handleResponderMove}
      >
        {(() => {
          const dailyExpensesMax = Math.max(...dailyExpenses);

          return days.map((day, i) => {
            const expenseAmount = dailyExpenses[i];

            return (
              <ExpenseBarChartBar
                key={i}
                percentage={expenseAmount / dailyExpensesMax}
                onPress={() => parent.scrollToDay(day)}
              />
            );
          });
        })()}
      </View>
    );
  }

  handleResponderMove = (e) => {
    const { days, parent } = this.props;
    if (!this.expenseBarChartWidth) return;
    const dayIndex = parseInt((e.nativeEvent.pageX - this.expenseBarChartX) / (this.expenseBarChartWidth / days.length), 10);

    if (this.expenseBarChartResponderMoveDayIndex !== dayIndex) {
      this.expenseBarChartResponderMoveDayIndex = dayIndex;
      const day = days[dayIndex];
      parent.scrollToDay(day);
    }
  }
}

class ExpenseBarChartBar extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.percentage !== nextProps.percentage ||
           this.props.selected !== nextProps.selected ||
           this.props.onPress !== nextProps.onPress;
  }

  render() {
    const { selected, percentage, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.expenseBarChartBar}
      >
        <View style={styles.expenseBarChartBar}>
          <View style={{ flex: 1 }} />
          <View style={{
            flex: 3,
            height: percentage * headChartMaxHeight,
            backgroundColor: colors.assistanceLight
          }}/>
          <View style={{ flex: 1 }} />
        </View>
      </TouchableOpacity>
    );
  }
}

class TransactionsListView extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.dataSource !== nextProps.dataSource ||
           this.props.refreshing !== nextProps.refreshing ||
           this.props.onRefresh !== nextProps.onRefresh ||
           this.props.onTransactionPress !== nextProps.onTransactionPress;
  }
  render() {
    const { props } = this;
    const {
      parent,
      dataSource,
      refreshing,
      onRefresh,
      onTransactionPress
    } = props;

    return (
      <ListView
        ref={(ref) => { parent.listView = ref; }}
        dataSource={dataSource}
        scrollRenderAheadDistance={99999}
        pageSize={4}
        removeClippedSubviews={true}
        renderScrollComponent={(scProps) => {
          return (
            <ScrollView
              {...scProps}
              ref={(ref) => { parent.scrollView = ref; }}
              automaticallyAdjustContentInsets={false}
              contentInset={{ top: headMinHeight, bottom: 49 }}
              scrollIndicatorInsets={{ top: headMaxHeight, bottom: 49 }}
              // scrollEventThrottle={300}
              onScroll={(e) => {
                const scrollY = e.nativeEvent.contentOffset.y + headMinHeight;
                // parent.state.scrollY.setValue(scrollY);

                parent.scrollY = scrollY;

                if (scProps.onScroll) {
                  scProps.onScroll(e);
                }
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  style={styles.refreshControl}
                >
                </RefreshControl>
              }
            />
          );
        }}
        renderHeader={() => {
          return (
            <View style={styles.scrollPadding}/>
          );
        }}
        renderSectionHeader={(sectionData, sectionID) => {
          return (
            <View key={sectionID} style={styles.section}>
              <Text style={styles.sectionText}>
                {sectionData && sectionData.title}
              </Text>
            </View>
          );
        }}
        renderRow={(rowData, sectionID, rowID) => {
          return (
            <TouchableHighlight
              key={rowID}
              underlayColor="#555"
              onPress={() => onTransactionPress(rowData.uid)}
            >
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                </View>
                <View style={styles.rowContent}>
                  <Text
                    style={styles.rowTitleText}
                    numberOfLines={1}
                  >
                    {rowData && rowData.description}
                  </Text>
                  {(() => {
                    if (rowData.partyName) {
                      return (
                        <Text
                          style={styles.rowSubtitleText}
                          numberOfLines={1}
                        >
                          {rowData && rowData.partyName}
                        </Text>
                      );
                    }
                  })()}
                </View>
                <View style={styles.rowSummery}>
                  <Text
                    style={styles.rowSummeryAmountCurrencyText}
                    numberOfLines={1}
                  >
                    {rowData && rowData.currency}
                  </Text>
                  <Text
                    style={styles.rowSummeryAmountText}
                    numberOfLines={1}
                  >
                    {rowData && rowData.displayedAmount[0]}
                  </Text>
                  <Text
                    style={styles.rowSummeryAmountAssistText}
                    numberOfLines={1}
                  >
                    {rowData && rowData.displayedAmount[1]}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
        renderSeparator={(sectionID, rowID) => {
          return (
            <View
              key={`s-${sectionID}-${rowID}`}
              style={styles.rowSeparator}
            />
          );
        }}
      />
    );
  }
}

const statusBarHeight = 20;

// const headMaxHeight = 200;
const headMaxHeight = 144;
const headMinHeight = 144;
const headToolbarHeight = 44;
const headChartMaxHeight = headMaxHeight - statusBarHeight - headToolbarHeight;
const headChartMinHeight = headMinHeight - statusBarHeight - headToolbarHeight;
const headChartMinScale = headChartMinHeight / headChartMaxHeight;

const sectionHeight = 24;
const rowHeight = 48;
const separatorHeight = StyleSheet.hairlineWidth;
const rowHorizontalPadding = 12;
const iconSize = 29;
const iconMarginRight = 10;

const styles = StyleSheet.create({
  head: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: headMaxHeight
  },
  headToolbar: {
    height: headToolbarHeight + statusBarHeight,
    backgroundColor: colors.dark,
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headToolbarLeftAction: {

  },
  headToolbarRightAction: {

  },
  headToolbarTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headToolbarTitleText: {
    color: colors.light,
    fontSize: 17,
    fontWeight: '600'
  },
  headToolbarSubtitleText: {
    color: colors.light,
    fontSize: 12,
    marginTop: 2
  },
  headChart: {
    height: headChartMaxHeight,
    backgroundColor: colors.dark
  },
  expenseBarChart: {
    flex: 1,
    marginHorizontal: 8,
    height: headChartMaxHeight,
    flexDirection: 'row'
  },
  expenseBarChartBar: {
    flex: 1,
    height: headChartMaxHeight,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  refreshControl: {
  },
  scrollPadding: {
    height: headMaxHeight - headMinHeight
  },
  section: {
    paddingHorizontal: rowHorizontalPadding,
    height: sectionHeight,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4'
  },
  sectionText: {
    marginLeft: iconSize + iconMarginRight,
    fontSize: 16,
    color: colors.dark,
    fontWeight: '700'
  },
  row: {
    height: rowHeight,
    paddingHorizontal: rowHorizontalPadding,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  rowIcon: {
    width: iconSize,
    height: iconSize,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDD',
    borderRadius: iconSize * 0.2,
    backgroundColor: colors.supernova
  },
  rowContent: {
    marginLeft: iconMarginRight,
    flex: 1,
    flexDirection: 'column'
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.dark
  },
  rowSubtitleText: {
    fontSize: 11,
    fontWeight: '300',
    color: colors.assistanceLight
  },
  rowSummery: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  rowSummeryAmountCurrencyText: {
    marginRight: 4,
    paddingBottom: 2,
    fontSize: 11,
    fontWeight: '300',
    color: colors.dark
  },
  rowSummeryAmountText: {
    fontSize: 22,
    fontWeight: '200',
    color: colors.dark
  },
  rowSummeryAmountAssistText: {
    paddingBottom: 2,
    fontSize: 11,
    fontWeight: '300',
    color: colors.dark
  },
  rowSeparator: {
    marginLeft: rowHorizontalPadding + iconSize + iconMarginRight,
    height: separatorHeight,
    backgroundColor: '#EEE'
  }
});
