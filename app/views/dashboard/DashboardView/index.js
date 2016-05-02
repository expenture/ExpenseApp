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

  render() {
    const { state, props } = this;

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

// Magic numers, these work for viewSettingsSectionHeight=46, I don't know why
const snapToIntervalForViewSettingsSection = 50;
const snapToAlignmentForViewSettingsSection = 'end';
const initialScrollContentOffsetY = -17;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.dark
  },
  scrollViewContent: {
    paddingBottom: 1138,
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
    borderBottomColor: colors.assistance,
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
  }
});
