/**
 * @providesModule views/DashboardView
 */

import React, {
  PropTypes,
  Component,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { BarChart, PieChart } from 'react-native-ios-charts';
import Color from 'color';

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
      scrollContentOffsetY: initialScrollContentOffsetY
    };

    this.scrollToTop = this.scrollToTop.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // A hack to set the backgroundColor for some charts
    // (some of them may not have the correct backgroundColor if it has not
    //  been updated after mount)
    this.setState({ backgroundColor: colors.light });
  }

  render() {
    const { state, props } = this;

    let monthlyAmountsCount = 0;
    let monthlyExpenseAmountsCount =
      props.latestMonthlyExpenseAmounts &&
      props.latestMonthlyExpenseAmounts.length ||
      0;
    if (props.isIncomeShown) {
      let monthlyIncomeAmountsCount =
        props.latestMonthlyIncomeAmounts &&
        props.latestMonthlyIncomeAmounts.length ||
        0;
      monthlyAmountsCount =
        Math.min(monthlyExpenseAmountsCount, monthlyIncomeAmountsCount);
    } else {
      monthlyAmountsCount = monthlyExpenseAmountsCount;
    }
    const monthlyAmountsEndingDate = new Date(props.currentYear, props.currentMonth - 1);
    const monthlyAmountsStartingDate = new Date(props.currentYear, props.currentMonth - 1 - (monthlyAmountsCount - 1));
    let monthlyAmountsLabel = [];
    for (let i=0; i<monthlyAmountsCount; i++) {
      let date = new Date(props.currentYear, props.currentMonth - 1 - i);
      monthlyAmountsLabel.push((date.getMonth()).toString());
    }

    const monthlyExpenseAmounts = (new Array(monthlyAmountsCount)).fill(0).concat(props.latestMonthlyExpenseAmounts).slice(-monthlyAmountsCount);
    const monthlyIncomeAmounts = (new Array(monthlyAmountsCount)).fill(0).concat(props.latestMonthlyIncomeAmounts).slice(-monthlyAmountsCount);
    const monthlyExpectedExpenseAmounts = (new Array(monthlyAmountsCount)).fill(0).concat(props.latestMonthlyExpectedExpenseAmounts).slice(-monthlyAmountsCount);
    const monthlyExpectedIncomeAmounts = (new Array(monthlyAmountsCount)).fill(0).concat(props.latestMonthlyExpectedIncomeAmounts).slice(-monthlyAmountsCount);
    const monthlyExpenseMaxAmount = Math.min(...monthlyExpenseAmounts, ...monthlyExpectedExpenseAmounts);
    const monthlyIncomeMaxAmount = Math.max(...monthlyIncomeAmounts, ...monthlyExpectedIncomeAmounts);

    return (
      <ScrollView
        ref="scrollView"
        contentOffset={{ y: viewSettingsSectionHeight }}
        onScroll={this.handleScroll}
        scrollEventThrottle={1}
        snapToAlignment={this.state.scrollViewSnapToAlignment}
        snapToInterval={this.state.scrollViewSnapToInterval}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            tintColor="#FFFFFF99"
            onRefresh={props.onRefresh}
            title={' '}
          />
        }
      >
        <StatusBar
          key={props.focusKey}
          barStyle="light-content"
          networkActivityIndicatorVisible={props.refreshing}
        />
        <View style={styles.header}>
          <View style={styles.viewSettingsSection}>
            <TouchableOpacity
              style={styles.viewSettingsSectionOptionWrapper}
              onPress={props.onShowAllAssestsPress}
            >
              <View style={styles.viewSettingsSectionOption}>
                <Text
                  numberOfLines={1}
                  allowFontScaling={false}
                  style={styles.viewSettingsSectionOptionText}
                >
                  將固定資產列入統計
                </Text>
                <Image
                  style={styles.viewSettingsSectionOptionIcon}
                  source={props.isAllAssestsShown ? inlineOnIconLight : inlineOffIconLight}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.viewSettingsSectionOptionSeperator} />
            <TouchableOpacity
              style={styles.viewSettingsSectionOptionWrapper}
              onPress={props.onShowIncomePress}
            >
              <View style={[styles.viewSettingsSectionOption, styles.viewSettingsSectionOption_last]}>
                <Text
                  numberOfLines={1}
                  allowFontScaling={false}
                  style={styles.viewSettingsSectionOptionText}
                >
                  列入收入資料
                </Text>
                <Image
                  style={styles.viewSettingsSectionOptionIcon}
                  source={props.isIncomeShown ? inlineOnIconLight : inlineOffIconLight}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerStatisticsRow}>
            <View style={styles.headerStatisticsRowLabel}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelTitleText}>
                {props.isAllAssestsShown ? '總資產' : '資產'}
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelDescriptionText}>
                {props.isAllAssestsShown ? '固定資產已列入統計' : '固定資產不列入統計'}
              </Text>
            </View>
            <View style={styles.headerStatisticsRowData}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataCurrencyText,
                  { color: colors.greenLight }
                ]}
              >
                {props.currencyLabel + ' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.greenLight }
                ]}
              >
                {parseMoney(props.isAllAssestsShown ? props.allAssetsAmount : props.assetsAmount, true)[0]}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.greenLight }
                ]}
              >
                {parseMoney(props.isAllAssestsShown ? props.allAssetsAmount : props.assetsAmount, true)[1]}
              </Text>
            </View>
          </View>

          <View style={styles.headerStatisticsRow}>
            <View style={styles.headerStatisticsRowLabel}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelTitleText}
              >
                負債
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelDescriptionText}
              >
                包含信用卡帳單、欠款與借出
              </Text>
            </View>
            <View style={styles.headerStatisticsRowData}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataCurrencyText,
                  { color: colors.redLight }
                ]}
              >
                {props.currencyLabel + ' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.redLight }
                ]}
              >
                {parseMoney(props.debtsAmount, true)[0]}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.redLight }
                ]}
              >
                {parseMoney(props.debtsAmount, true)[1]}
              </Text>
            </View>
            <Text></Text>
          </View>

          <View style={styles.headerStatisticsRow}>
            <View style={styles.headerStatisticsRowLabel}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelTitleText}
              >
                {props.isIncomeShown ? '預估結餘' : '本月支出'}
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelDescriptionText}
              >
                {props.isIncomeShown ? '本月預期收入扣除已知支出' : '這個月的累計支出'}
              </Text>
            </View>
            <View style={styles.headerStatisticsRowData}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataCurrencyText,
                  { color: colors.blueLight }
                ]}
              >
                {props.currencyLabel + ' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.blueLight }
                ]}
              >
                {parseMoney(props.isIncomeShown ? props.monthlyEstimatedBalance : props.monthlyEstimatedExpense, true)[0]}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.blueLight }
                ]}
              >
                {parseMoney(props.isIncomeShown ? props.monthlyEstimatedBalance : props.monthlyEstimatedExpense, true)[1]}
              </Text>
            </View>
            <Text></Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={props.onNotificationsPress}
        >
          <View style={styles.notificationSection}>
            <View style={styles.notificationSectionContent}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.notificationSectionContentTitleText}
              >
                通知
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.notificationSectionContentText}
              >
                {(() => {
                  let descriptions = [];
                  if (props.unreadNotificationsCount && props.unreadNotificationsCount > 0) {
                    descriptions.push(`${props.unreadNotificationsCount} 未讀`);
                  }
                  if (props.pendingNotificationsCount && props.pendingNotificationsCount > 0) {
                    descriptions.push(`${props.pendingNotificationsCount} 待處理`);
                  }
                  return descriptions.join('，');
                })()}
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.notificationSectionAssistText}
              >
                {(() => {
                  if (props.notificationTitles &&
                      props.notificationTitles &&
                      props.notificationTitles.length &&
                      props.notificationTitles.length > 0) {
                    return `：${props.notificationTitles.join('、')}`;
                  }
                })()}
              </Text>
              <Image
                source={require('../../../images/Assets/Masks/FadeOutToWhite.png')}
                style={styles.notificationSectionContentFadeOutMask}
              />
            </View>
            <Image
              source={require('../../../images/iOS/Elements/MoreAccessoryIcon.png')}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.monthlyAmountsChartSection}
          >
            <View style={styles.sectionHeader}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.sectionHeaderTitleText}
              >
                {props.isIncomeShown ? '每月收支' : '每月支出'}
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.sectionHeaderDescriptionText}
              >
                {`${monthlyAmountsStartingDate.getFullYear()} 年 ${monthlyAmountsStartingDate.getMonth() + 1} 月 － ${monthlyAmountsEndingDate.getFullYear()} 年 ${monthlyAmountsEndingDate.getMonth() + 1} 月`}
              </Text>
            </View>
            {(() => {
              if (props.isIncomeShown) {
                return (
                  <View style={styles.monthlyAmountsChartContainer}>
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [monthlyExpenseMaxAmount/1000, monthlyIncomeMaxAmount/1000, ...monthlyExpectedExpenseAmounts.map(v => v/1000)],
                            colors: expectedExpenseBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [monthlyExpenseMaxAmount/1000, monthlyIncomeMaxAmount/1000, ...monthlyExpenseAmounts.map(v => v/1000)],
                            colors: expenseBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [monthlyExpenseMaxAmount/1000, monthlyIncomeMaxAmount/1000, ...monthlyExpectedIncomeAmounts.map(v => v/1000)],
                            colors: expectedIncomeBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [monthlyExpenseMaxAmount/1000, monthlyIncomeMaxAmount/1000, ...monthlyIncomeAmounts.map(v => v/1000)],
                            colors: incomeBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.monthlyAmountsChartContainer}>
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [-monthlyExpenseMaxAmount/1000, 0, ...monthlyExpectedExpenseAmounts.map(v => -v/1000)],
                            colors: expectedExpenseBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                    <BarChart
                      config={{
                        ...monthlyAmountsBarChartConfig,
                        dataSets: [
                          {
                            values: [-monthlyExpenseMaxAmount/1000, 0, ...monthlyExpenseAmounts.map(v => -v/1000)],
                            colors: expenseBarChartColors,
                            barSpace: 0.5,
                            drawValues: false
                          }
                        ],
                        labels: ['', '', ...monthlyAmountsLabel]
                      }}
                      style={styles.monthlyAmountsBarChart}
                    />
                  </View>
                );
              }
            })()}
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.expenseCategoriesChartSection}
          >
            <View style={styles.sectionHeader}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.sectionHeaderTitleText}
              >
                消費分類
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.sectionHeaderDescriptionText}
              >
                {`${props.currentYear} 年 ${props.currentMonth} 月`}
              </Text>
            </View>
            <View style={styles.expenseCategoriesChartContainer}>
              <PieChart
                config={{
                  ...expenseCategoriesPieChartConfig,
                  dataSets: [{
                    values: props.currentMonthExpenseTopCategories.map(c => c.percentage),
                    colors: props.currentMonthExpenseTopCategories.map(c => colors[c.color])
                  }],
                  labels: props.currentMonthExpenseTopCategories.map(c => c.name),
                  backgroundColor: state.backgroundColor
                }}
                style={styles.expenseCategoriesPieChart}
              />
              <View style={styles.expenseCategoriesPieChartLegend}>
                {props.currentMonthExpenseTopCategories.map((c, i) => {
                  return (
                    <View style={styles.expenseCategoriesPieChartLegendRow} key={i}>
                      <View style={[
                        styles.expenseCategoriesPieChartLegendForm,
                        { backgroundColor: colors[c.color] }
                      ]} />
                      <Text
                        numberOfLines={1}
                        allowFontScaling={false}
                        style={styles.expenseCategoriesPieChartLegendText}
                      >
                        {c.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.scrollViewExtendBackground} />
      </ScrollView>
    );
  }

  scrollToTop() {
    this.refs.scrollView.scrollTo({ y: initialScrollContentOffsetY });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshing !== this.props.refreshing) {
      if (nextProps.refreshing) {
        this.setScrollViewSnapping.bind(this)(false);
      } else {
        this.setScrollViewSnapping.bind(this)();

        if (this.state.scrollContentOffsetY < initialScrollContentOffsetY + 24) {
          setTimeout(this.scrollToTop, 1);
          setTimeout(this.scrollToTop, 50);
          setTimeout(this.scrollToTop, 100);
        }
      }
    }
  }

  handleScroll(e) {
    if (!(e.nativeEvent && e.nativeEvent.contentOffset)) return;

    this.state.scrollContentOffsetY = e.nativeEvent.contentOffset.y;

    if (this.props.refreshing) return;

    this.setScrollViewSnapping.bind(this)();
  }

  setScrollViewSnapping(enable = true) {
    const { scrollContentOffsetY } = this.state;

    const turnOnScrollViewSnappingForViewSettingsSection = () => {
      if (!this.state.scrollViewSnapToInterval) this.setState({
        scrollViewSnapToAlignment: snapToAlignmentForViewSettingsSection,
        scrollViewSnapToInterval: snapToIntervalForViewSettingsSection
      });
    };

    const turnOffScrollViewSnappingForViewSettingsSection = () => {
      if (this.state.scrollViewSnapToInterval) this.setState({
        scrollViewSnapToAlignment: null,
        scrollViewSnapToInterval: null
      });
    };

    if (enable &&
        scrollContentOffsetY < initialScrollContentOffsetY &&
        !this.props.refreshing) {
      turnOnScrollViewSnappingForViewSettingsSection();
    } else {
      turnOffScrollViewSnappingForViewSettingsSection();
    }
  }
}

const inlineOffIconLight = require('../../../images/iOS/Elements/InlineOffIcon-Light.png');
const inlineOnIconLight = require('../../../images/iOS/Elements/InlineOnIcon-Light.png');

const viewSettingsSectionHeight = 46;
const monthlyAmountsChartHeight = 120;

const expenseBarChartColors = ['transparent', 'transparent'].concat((new Array(100)).fill(colors.redLight));
const incomeBarChartColors = ['transparent', 'transparent'].concat((new Array(100)).fill(colors.greenLight));
const expectedExpenseBarChartColors = ['transparent', 'transparent'].concat((new Array(100)).fill(Color(colors.redLight).lighten(0.2).hexString()));
const expectedIncomeBarChartColors = ['transparent', 'transparent'].concat((new Array(100)).fill(Color(colors.greenLight).lighten(0.2).hexString()));

const monthlyAmountsBarChartConfig = {
  userInteractionEnabled: false,
  noDataText: 'No Data',
  xEntrySpace: 0,
  yEntrySpace: 0,
  valueFormatter: {
    type: 'abbreviated',
    numberStyle: 'CurrencyAccountingStyle'
  },
  showLegend: false,
  drawBorders: false,
  gridBackgroundColor: 'transparent',
  xAxis: {
    enabled: true,
    position: 'bottom',
    drawGridLines: false,
    drawLabels: false,
    drawAxisLine: false
  },
  leftAxis: {
    enabled: true,
    position: 'inside',
    drawLabels: false,
    textSize: 11,
    textColor: colors.assistance,
    drawGridLines: false,
    gridColor: Color(colors.assistanceLight).lighten(0.8).hexString(),
    gridLineWidth: StyleSheet.hairlineWidth,
    gridDashedLine: {
      lineLength: 1,
      spaceLength: StyleSheet.hairlineWidth
    },
    drawAxisLine: false
  },
  rightAxis: {
    enabled: false
  },
  dragDecelerationEnabled: false,
  dragEnabled: true,
  highlightPerTap: true,
  scaleXEnabled: false,
  scaleYEnabled: false,
  pinchZoomEnabled: false,
  doubleTapToZoomEnabled: false,
  highlightPerDragEnabled: true
};

const expenseCategoriesPieChartConfig = {
  userInteractionEnabled: false,
  rotationAngle: 240,
  holeRadiusPercent: 0.52,
  transparentCircleRadiusPercent: 0,
  drawSliceTextEnabled: false,
  valueFormatter: {
    type: 'regular',
    numberStyle: 'PercentStyle'
  },
  showLegend: false
};

// Magic numers, these work for viewSettingsSectionHeight=46, I don't know why
const snapToIntervalForViewSettingsSection = 50;
const snapToAlignmentForViewSettingsSection = 'end';
const initialScrollContentOffsetY = -17;

const chartInnerPadding = 9.8;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.dark
  },
  scrollViewContent: {
    overflow: 'visible',
    backgroundColor: colors.light
  },
  header: {
    backgroundColor: colors.dark,
    height: 180 + viewSettingsSectionHeight
  },
  viewSettingsSection: {
    marginTop: -StyleSheet.hairlineWidth,
    marginBottom: 15,
    height: viewSettingsSectionHeight + StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.assistance,
    borderBottomColor: colors.assistance ,
    flexDirection: 'row'
  },
  viewSettingsSectionOptionWrapper: {
    flex: 1
  },
  viewSettingsSectionOption: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSettingsSectionOptionSeperator: {
    alignSelf: 'stretch',
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.assistance
  },
  viewSettingsSectionOptionText: {
    color: colors.light,
    fontSize: 11,
    opacity: 0.6
  },
  viewSettingsSectionOptionIcon: {
    marginLeft: 6,
    opacity: 0.3
  },
  headerStatisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 38,
    marginBottom: 15,
    paddingLeft: 24,
    paddingRight: 20
  },
  headerStatisticsRowLabel: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  headerStatisticsRowLabelTitleText: {
    color: colors.light,
    fontSize: 16,
    marginBottom: 4
  },
  headerStatisticsRowLabelDescriptionText: {
    color: colors.light,
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 2
  },
  headerStatisticsRowData: {
    flex: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  headerStatisticsRowDataCurrencyText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '200'
  },
  headerStatisticsRowDataAmountIntText: {
    color: colors.light,
    fontSize: 27,
    marginBottom: -3,
    fontWeight: '200'
  },
  headerStatisticsRowDataAmountFloatText: {
    color: colors.light,
    fontSize: 11,
    fontWeight: '200'
  },
  notificationSection: {
    flexDirection: 'row',
    height: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color(colors.assistanceLight).lighten(0.8).hexString(),
    paddingLeft: 24,
    alignItems: 'center',
    backgroundColor: colors.light
  },
  notificationSectionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden'
  },
  notificationSectionContentTitleText: {
    fontSize: 19,
    color: colors.dark,
    marginRight: 10
  },
  notificationSectionContentText: {
    fontSize: 11,
    color: colors.dark
  },
  notificationSectionAssistText: {
    fontSize: 11,
    color: colors.assistanceLight,
    marginLeft: 4
  },
  notificationSectionContentFadeOutMask: {
    position: 'absolute',
    right: 0
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: -4
  },
  sectionHeaderTitleText: {
    fontSize: 19,
    color: colors.dark,
    paddingBottom: 1
  },
  sectionHeaderDescriptionText: {
    fontSize: 11,
    color: colors.assistanceLight
  },
  monthlyAmountsChartSection: {
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color(colors.assistanceLight).lighten(0.8).hexString()
  },
  monthlyAmountsChartContainer: {
    flex: 1,
    marginHorizontal: 18,
    height: monthlyAmountsChartHeight,
    overflow: 'hidden'
  },
  monthlyAmountsBarChart: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -chartInnerPadding,
    right: -chartInnerPadding,
    bottom: -chartInnerPadding,
    left: -chartInnerPadding - 16
  },
  expenseCategoriesChartSection: {
    paddingBottom: 14
  },
  expenseCategoriesChartContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 18,
    height: 240
  },
  expenseCategoriesPieChart: {
    flex: 8,
    marginLeft: -chartInnerPadding
  },
  expenseCategoriesPieChartLegend: {
    flex: 3
  },
  expenseCategoriesPieChartLegendRow: {
    flexDirection: 'row',
    paddingVertical: 2.4
  },
  expenseCategoriesPieChartLegendForm: {
    borderRadius: 1000,
    height: 12,
    width: 12,
    marginRight: 4
  },
  expenseCategoriesPieChartLegendText: {
    flex: 1,
    fontSize: 12,
    color: colors.dark
  },
  scrollViewExtendBackground: {
    position: 'absolute',
    bottom: -999,
    left: 0,
    right: 0,
    height: 999,
    backgroundColor: colors.light
  }
});
