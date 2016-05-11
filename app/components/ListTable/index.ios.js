/**
 * @providesModule components/ListTable
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput
} from 'react-native';

import {
  TableView,
  Section,
  Cell,
  CustomCell
} from 'react-native-tableview-simple';

export default class ListTable extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <TableView>
        <View
          style={{ paddingVertical: 14 }}
        >
          {this.props.children}
        </View>
      </TableView>
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
        <Section
          header={this.props.header}
          footer={this.props.footer}
        >
          {this.props.children}
        </Section>
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
        checked: this.props.checked
      };
    }

    componentWillReceiveProps(nextProps) {
      if (typeof nextProps.checked !== 'undefined') {
        this.state.checked = nextProps.checked;
      }
    }

    render() {
      if (this.props.children) {
        return (
          <View style={{
            paddingLeft: 15,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFF'
          }}>
            {this.props.children}
          </View>
        );
      }

      if (this.props.textInput) {
        const textStyle = [{
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
            <CustomCell
              cellHeight={this.props.multiline && 160}
            >
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
                  this.props.style
                ]}
              />
            </CustomCell>
          </TouchableWithoutFeedback>
        );
      }

      let cellstyle;
      if (this.props.detail) cellstyle = 'RightDetail';
      if (this.props.subtitle) cellstyle = 'Subtitle';

      let accessory;
      if (this.props.checked) accessory = 'Checkmark';
      if (this.props.navigated) accessory = 'DisclosureIndicator';
      if (this.props.switch) accessory = 'Switch';

      let onPress = this.props.onPress || this.props.onCheck && (() => {
        this.props.onCheck(!this.state.checked);
      });

      let detail = this.props.detail || this.props.subtitle;

      return (
        <TouchableWithoutFeedback
          onPress={this.handlePress.bind(this)}
        >
          <View
            pointerEvents={this.props.disabled ? 'box-only' : 'box-none' }
          >
            <Cell
              cellstyle={cellstyle}
              accessory={accessory}
              switchValue={this.props.switched}
              onSwitchValueChange={this.props.onSwitch}
              title={this.props.title}
              detail={detail}
              onPress={onPress}
              isLoading={this.props.loading}
              isDisabled={this.props.disabled}
              cellTintColor={this.props.backgroundColor}
              highlightActiveOpacity={0.7}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }

    handlePress() {
      if (this.props.disabled) {
        this.props.onDisabledPress && this.props.onDisabledPress();
      } else if (this.props.onPress) {
        this.props.onPress();
      } else if (this.refs.textInput) {
        this.refs.textInput.focus();
      }
    }
  };
}

