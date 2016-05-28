/**
 * @providesModule views/NotificationsView
 */

import React, { Component, PropTypes } from 'react';
import {
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

import moment, { getCalendarDateLocale } from 'utils/moment';

import colors from 'constants/colors';

export default class NotificationsView extends Component {
  static propTypes = {
    // UI Props
    focusKey: PropTypes.any,
    // UI State
    refreshing: PropTypes.bool,
    // Data
    notifications: PropTypes.array,
    unhandledNotifications: PropTypes.array,
    unreadNotifications: PropTypes.array,
    // Action Handlers
    onNotificationPress: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob.rows[rowID],
      getSectionHeaderData: (dataBlob, sectionID) => dataBlob.sections[sectionID],
      rowHasChanged: (r1, r2) => {
        // TODO: Update if current minute changed
        return r1.uid !== r2.uid ||
               r1.readAt !== r2.readAt ||
               r1.handledAt !== r2.handledAt ||
               r1.updatedAt !== r2.updatedAt;
      },
      sectionHeaderHasChanged: (s1, s2) => s1.code !== s2.code
    });
  }

  render() {
    const { props } = this;

    const unreadNotificationsObj = props.unreadNotifications.reduce((obj, n) => ({ ...obj, [n.uid]: n }), {});
    const unhandledNotificationsObj = props.unhandledNotifications.reduce((obj, n) => ({ ...obj, [n.uid]: n }), {});
    const notificationsObj = props.notifications.reduce((obj, n) => ({ ...obj, [n.uid]: n }), {});

    let sectionIDs = [
      'unread',
      'unhandled'
    ];

    let rowIDs = [];
    rowIDs.push(props.unreadNotifications.map(n => n.uid));
    rowIDs.push(props.unhandledNotifications.map(n => n.uid));

    let dataBlob = {
      sections: {
        unread: {
          code: 'unread',
          title: "未讀"
        },
        unhandled: {
          code: 'unhandled',
          title: "待處理"
        }
      },
      rows: {
        ...unreadNotificationsObj,
        ...unhandledNotificationsObj,
        ...notificationsObj
      }
    };

    let notificationsForEachLastMomentDateString;
    let notificationsForEachLastSectionIndex = 1;
    props.notifications.forEach((notification) => {
      let notificationMoment = moment(notification.datetime);
      let notificationMomentDateString = notificationMoment.format('YYYY-MM-DD');

      if (notificationMomentDateString !== notificationsForEachLastMomentDateString) {
        sectionIDs.push(notificationMomentDateString);

        dataBlob.sections[notificationMomentDateString] = {
          code: notificationMomentDateString,
          title: notificationMoment.calendar(null, getCalendarDateLocale())
        };

        rowIDs.push([]);
        notificationsForEachLastSectionIndex += 1;
        notificationsForEachLastMomentDateString = notificationMomentDateString;
      }

      rowIDs[notificationsForEachLastSectionIndex].push(notification.uid);
    });

    this.dataSource = this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    return (
      <ListView
        dataSource={this.dataSource}
        onEndReached={props.onLoadMore}
        renderScrollComponent={(scProps) => {
          return (
            <ScrollView
              {...scProps}
              refreshControl={
                <RefreshControl
                  refreshing={props.refreshing}
                  onRefresh={props.onRefresh}
                />
              }
            />
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
              onPress={() => props.onNotificationPress(rowData.uid)}
            >
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitleText}>
                    {rowData && rowData.title}
                  </Text>
                  <View style={styles.rowMessage}>
                    <Text
                      style={styles.rowMessageText}
                      numberOfLines={12}
                    >
                      {rowData && rowData.message}
                    </Text>
                  </View>
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
        renderHeader={() => {
          return (
            <StatusBar
              key={this.props.focusKey}
              barStyle="light-content"
              networkActivityIndicatorVisible={props.refreshing}
            />
          );
        }}
      />
    );
  }
}

const iconSize = 18;
const iconPadding = 8;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 12,
    height: 24,
    justifyContent: 'center',
    backgroundColor: '#DDD'
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: iconSize + (iconSize > 0 ? iconPadding : 0)
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  rowIcon: {
    marginTop: -1,
    width: iconSize,
    height: iconSize,
    backgroundColor: '#EEE',
    borderRadius: iconSize * 0.2
  },
  rowContent: {
    flex: 1,
    marginLeft: iconSize > 0 ? iconPadding : 0,
    flexDirection: 'column'
  },
  rowTitleText: {
    fontSize: 14,
    fontWeight: '700'
  },
  rowMessage: {
    marginTop: 4,
    flexDirection: 'row'
  },
  rowMessageText: {
    flex: 1
  },
  rowSeparator: {
    marginLeft: 12 - 1 + iconSize + (iconSize > 0 ? iconPadding : 0),
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EEE'
  }
});
