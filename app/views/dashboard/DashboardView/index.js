/**
 * @providesModule views/DashboardView
 */

import React, {
  PropTypes,
  Component,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import Color from 'color';

import StatusBar from 'components/StatusBar';
import ScrollView from 'components/ScrollView';
import View from 'components/View';
import Text from 'components/Text';

import colors from 'constants/colors';

export default class DashboardView extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <StatusBar
          key={this.props.focusKey}
          barStyle="light-content"
        />
        <View style={styles.header}>
          <View style={styles.headerStatisticsRow}>
            <View style={styles.headerStatisticsRowLabel}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelTitleText}>
                資產
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelDescriptionText}>
                固定資產不列入統計
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
                NT${' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.greenLight }
                ]}
              >
                1,337,000
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.greenLight }
                ]}
              >
                .00
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
                NT${' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.redLight }
                ]}
              >
                -65,535
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.redLight }
                ]}
              >
                .00
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
                預估結餘
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.headerStatisticsRowLabelDescriptionText}
              >
                本月預期收入扣除已知支出
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
                NT${' '}
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountIntText,
                  { color: colors.blueLight }
                ]}
              >
                108,000
              </Text>

              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={[
                  styles.headerStatisticsRowDataAmountFloatText,
                  { color: colors.blueLight }
                ]}
              >
                .00
              </Text>
            </View>
            <Text></Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => this.props.onNotificationPress()}
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
                2 未讀，1 待處理
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.notificationSectionAssistText}
              >
                ：發現未知帳戶、大筆金額轉帳通知、消費提醒 － 12 月電費、帳單繳費通知
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
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.light
  },
  header: {
    backgroundColor: colors.dark,
    marginTop: -1000,
    paddingTop: 1000 + 15,
    height: 1180,
    paddingLeft: 24,
    paddingRight: 20
  },
  headerStatisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 38,
    marginBottom: 15
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
