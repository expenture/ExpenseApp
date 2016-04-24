/**
 * @providesModule components/ListTable
 *
 * Ref: https://www.google.com/design/spec/components/lists.html
 */

import React, {
  Component,
  PropTypes,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';

export default class ListTable extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <View
        style={styles.listTable}
      >
        {this.props.children}
      </View>
    );
  }

  static Section = class extends Component {
    static propTypes = {
      header: PropTypes.string,
      footer: PropTypes.string,
      children: PropTypes.any
    };

    render() {
      return (
        <View
          style={styles.section}
        >
          {(() => {
            if (this.props.header) return (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                  {this.props.header}
                </Text>
              </View>
            );
          })()}
          <View style={styles.sectionContent}>
            {this.props.children}
          </View>
          {(() => {
            if (this.props.footer) return (
              <View style={styles.sectionFooter}>
                <Text style={styles.sectionFooterText}>
                  {this.props.footer}
                </Text>
              </View>
            );
          })()}
        </View>
      );
    }
  };

  static Cell = class extends Component {
    static propTypes = {
      title: PropTypes.string,
      navigated: PropTypes.bool,
      detail: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      subtitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      onPress: PropTypes.func,
      onDisabledPress: PropTypes.func,
      disabled: PropTypes.bool,
      children: PropTypes.any,
      backgroundColor: PropTypes.string
    };

    render() {
      let Wrapper = TouchableWithoutFeedback;
      if (this.props.onPress && !this.props.disabled) {
        Wrapper = TouchableNativeFeedback;
      }

      let subtitle = this.props.detail || this.props.subtitle;

      return (
        <Wrapper onPress={this.handlePress.bind(this)}>
          <View style={[
            styles.cell,
            this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
          ]}>
            <View style={this.props.disabled && { opacity: 0.4 }}>
              {(() => {
                if (this.props.title) {
                  return (
                    <Text style={[
                      styles.cellTitleText,
                      subtitle && styles.cellTitleText_withSubtitle
                    ]}>
                      {this.props.title}
                    </Text>
                  );
                }
              })()}
              {(() => {
                if (subtitle) {
                  return (
                    <Text style={styles.cellSubtitleText}>{subtitle}</Text>
                  );
                }
              })()}
              {this.props.children}
            </View>
          </View>
        </Wrapper>
      );
    }

    handlePress() {
      if (this.props.disabled) {
        this.props.onDisabledPress && this.props.onDisabledPress();
      } else {
        this.props.onPress && this.props.onPress();
      }
    }
  };
}

const styles = StyleSheet.create({
  listTable: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#EEE'
  },
  section: {
    paddingVertical: 14
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  sectionHeaderText: {
    color: '#727272',
    fontSize: 14,
    fontWeight: '700'
  },
  sectionFooter: {
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  sectionFooterText: {
    color: '#727272',
    fontSize: 12
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  cell: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellTitleText: {
    marginVertical: 5,
    color: '#1F1F1F',
    fontSize: 16
  },
  cellTitleText_withSubtitle: {
    marginVertical: 0
  },
  cellSubtitleText: {
    color: '#727272',
    fontSize: 16
  }
});
