import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';

import { deviceWidth, deviceHeight } from '../styles/variables';

export default class PrimeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={[this.props.containerStyle, styles.container]}>
          <View style={[this.props.innerContainerStyle, styles.innerContainer]}>
            {this.props.body}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
});

PrimeModal.propTypes = {
  onRequestClose: PropTypes.func,
  modalVisible: PropTypes.bool,
  containerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
};
