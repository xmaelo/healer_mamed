import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontFamily,
  fontSize,
} from '../styles/variables';
import PrimeModal from './PrimeModal';

export default class AlertDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      modalVisible,
      onRequestClose,
    } = this.props;

    return (
      <PrimeModal
        modalVisible={modalVisible}
        onRequestClose={onRequestClose}
        containerStyle={{
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        innerContainerStyle={{
          width: deviceWidth - 60,
          borderRadius: 10,
          backgroundColor: colors.white,
        }}
        body={this.renderBody()}
      />
    );
  }

  renderBody(){
    return (
      <View>
        <View style={styles.modalBody}>
          {this.props.dlTitle.component}
          {this.props.dlMessage.component}
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[this.props.dismissBtnStyle, styles.button]}
            onPress={this.props.dismissBtn.onPress}>
            <Text style={this.props.dismissLabelStyle}>
              {this.props.dismissBtn.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[this.props.acceptBtnStyle, styles.button]}
            onPress={this.props.acceptBtn.onPress}>
            <Text style={this.props.acceptLabelStyle}>
              {this.props.acceptBtn.text}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBody: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  modalFooter: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AlertDialog.propTypes = {
  onRequestClose: PropTypes.func,
  modalVisible: PropTypes.bool,
  dlTitle: PropTypes.any,
  dlMessage: PropTypes.any,
  dismissBtnStyle: PropTypes.any,
  acceptBtnStyle: PropTypes.any,
  dismissLabelStyle: PropTypes.any,
  acceptLabelStyle: PropTypes.any,
  dismissBtn: PropTypes.any,
  acceptBtn: PropTypes.any,
};

AlertDialog.defaultProps = {
  dismissBtnStyle: {
    width: (deviceWidth - 60) /2,
    height: 44,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.softBlue,
  },
  acceptBtnStyle: {
    width: (deviceWidth - 60) /2,
    height: 44,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
  },
  dismissLabelStyle: {
    color: colors.white,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
  },
  acceptLabelStyle: {
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
  }
};
