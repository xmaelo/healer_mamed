import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import {sizeHeight, sizeWidth} from '../util/Size';

import { deviceWidth, deviceHeight, shadowOpt, colors, fontSize } from '../styles/variables';
import CodeInput from 'react-native-confirmation-code-input';

export default class VerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[CommonStyles.normalPage, {flex: 0}]}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
        />
        <View style={styles.titleBox}>
          <Text header black semiBold >Verifcation du numero de telephone</Text>
          <Text normal grey regular
            style={{ width: deviceWidth - 70, marginTop: 15, textAlign: 'center' }}
          >
            Entrez le code que vous avez recu !
          </Text>
        </View>
        <CodeInput
          ref="codeInputRef1"
          className={'border-circle'}
          codeLength={4}
          placeholder="1"
          inputPosition='center'
          activeColor={'#76908E'}
          selectionColor={'#76908E'}
          inactiveColor={'#76908E'}
          keyboardType="numeric"
          codeInputStyle={[{
            color: '#76908E',
            borderWidth: sizeWidth(0.3),
            width: sizeWidth(12.8),
            height: sizeWidth(12.8),
            borderColor: "#76908E",
            borderRadius: sizeWidth(6.4)
          }]}
          containerStyle={{
            marginBottom: sizeHeight(12), 
            marginTop: sizeHeight(0.5),
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingHorizontal: 27.5,
          }}
          onFulfill={(code) => {
            this._onFulfill(code)
          }}
        />
        <View style={CommonStyles.buttonBox}>
          <GradientButton
            onPressButton={this._handleVerify.bind(this)}
            setting={shadowOpt}
            btnText="Verifier"
          />
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text
            style={{ color: colors.softBlue, fontSize: fontSize.header }}
            onPress={() => this._handleResend()}>
            Renvoyer le code
            </Text>
        </View>
      </View>
    );
  }

  _onFulfill(code) {
    // TODO
  } 

  _handleVerify() {
    // TODO
    this.props.navigation.navigate('StartNameScreen', {arrs: this.props.navigation.state.params.arrs});
  }

  _handleResend() {
    // TODO
  }
}

const styles = StyleSheet.create({
  titleBox: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 48,
  }
});
