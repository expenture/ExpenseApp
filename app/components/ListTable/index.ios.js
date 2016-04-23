/**
 * @providesModule components/ListTable
 */

import React, {
  Component,
  PropTypes,
  View,
  TouchableWithoutFeedback
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
      let cellstyle;
      if (this.props.detail) cellstyle = 'RightDetail';
      if (this.props.subtitle) cellstyle = 'Subtitle';

      let accessory;
      if (this.props.navigated) accessory = 'DisclosureIndicator';

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
              title={this.props.title}
              detail={detail}
              onPress={this.props.onPress}
              isDisabled={this.props.disabled}
              cellTintColor={this.props.backgroundColor}
              highlightActiveOpacity={0.7}
            >
              {this.props.children}
            </Cell>
          </View>
        </TouchableWithoutFeedback>
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

