/**
 * @providesModule components/ListTable
 *
 * Ref: https://www.google.com/design/spec/components/lists.html
 */

import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Switch,
  ProgressBarAndroid
} from 'react-native';

import Checkbox from 'react-native-android-checkbox';

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
          style={[
            styles.section,
            !this.props.children && { paddingTop: 0 }
          ]}
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
          {(() => {
            if (this.props.children) return (
              <View style={styles.sectionContent}>
                {this.props.children}
              </View>
            );
          })()}
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
      textInput: PropTypes.bool,
      navigated: PropTypes.bool,
      switch: PropTypes.bool,
      switched: PropTypes.bool,
      check: PropTypes.bool,
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
      onSwitch: PropTypes.func,
      onCheck: PropTypes.func,
      checked: PropTypes.bool,
      loading: PropTypes.bool,
      disabled: PropTypes.bool,
      children: PropTypes.any,
      backgroundColor: PropTypes.string
    };

    constructor(props) {
      super(props);
      this.state = {
        switched: this.props.switched,
        checked: this.props.checked
      };
    }

    componentWillReceiveProps(nextProps) {
      if (typeof nextProps.switched !== 'undefined') {
        this.state.switched = nextProps.switched;
      }
      if (typeof nextProps.checked !== 'undefined') {
        this.state.checked = nextProps.checked;
      }
    }

    render() {
      if (this.props.textInput) {
        const textStyle = [styles.cellTitleText, {
          flex: 20,
          fontSize: 16,
          paddingRight: 2
        }, this.props.disabled && {
          color: 'grey'
        }];

        return (
          <TouchableWithoutFeedback
            onPress={this.handlePress.bind(this)}
          >
            <View style={[
              styles.cell,
              this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
            ]}>
              {(() => {
                if (this.props.title) return (
                  <Text
                    style={[
                      textStyle,
                      { flex: 8 }
                    ]}
                    numberOfLines={1}
                  >
                    {this.props.title}
                  </Text>
                );
              })()}
              <TextInput
                {...this.props}
                ref="textInput"
                editable={!this.props.disabled}
                style={[
                  textStyle,
                  {
                    padding: 0,
                    height: this.props.multiline ? 160 : 26
                  },
                  this.props.style
                ]}
                placeholderTextColor="#1F1F1F55"
                numberOfLines={this.props.multiline ? 8 : 1}
                underlineColorAndroid="transparent"
              />
            </View>
          </TouchableWithoutFeedback>
        );
      }

      let Wrapper = TouchableWithoutFeedback;
      if ((this.props.onPress || this.props.onSwitch || this.props.onCheck) && !this.props.disabled) {
        Wrapper = TouchableNativeFeedback;
      }

      let subtitle = this.props.detail || this.props.subtitle;

      return (
        <Wrapper onPress={this.handlePress.bind(this)}>
          <View style={[
            styles.cell,
            this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
          ]}>
            {(() => {
              if (this.props.check || this.props.checked) {
                return (
                  <Checkbox
                    style={{ paddingRight: 32 }}
                    value={this.props.checked}
                    onValueChange={this.props.onCheck}
                    disabled={this.props.disabled}
                  />
                );
              }
            })()}
            <View style={[
              { flex: 1 },
              this.props.disabled && { opacity: 0.4 }
            ]}>
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
            {(() => {
              if (this.props.loading) return (
                <ProgressBarAndroid
                  style={{ paddingHorizontal: 6 }}
                  styleAttr="Small"
                />
              );
            })()}
            {(() => {
              if (this.props.switch) return (
                <Switch
                  ref="switch"
                  style={{ paddingLeft: 2 }}
                  value={this.props.switched}
                  onValueChange={this.props.onSwitch}
                  disabled={this.disabled}
                />
              );
            })()}
          </View>
        </Wrapper>
      );
    }

    handlePress() {
      if (this.props.disabled) {
        this.props.onDisabledPress && this.props.onDisabledPress();
      } else if (this.props.onPress) {
        this.props.onPress();
      } else if (this.props.onSwitch) {
        this.props.onSwitch(!this.state.switched);
      } else if (this.props.onCheck) {
        this.props.onCheck(!this.state.checked);
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
    fontSize: 13,
    lineHeight: 16
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
