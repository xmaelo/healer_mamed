import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';

import { deviceHeight, shadowOpt, colors } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import StartNameScreen from './StartNameScreen';
// import SignInScreen from './SignInScreen';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <ScrollView contentContainerStyle={{height: deviceHeight - 25}}>
          <View style={styles.titleBox}>
            <Text extraLarge black extraBold>SIGN UP</Text>
          </View>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Username'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
              />
              <TextInput
                placeholder='Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
              />
              <TextInput
                placeholder='Re Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/envelope.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 22, height: 17}}
              />
              <TextInput
                placeholder='Email'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={CommonStyles.buttonBox}>
            <GradientButton
              onPressButton={this._handleClickSignUpButton.bind(this)}
              setting={shadowOpt}
              btnText="SIGN UP"
            />
          </View>
          <View style={styles.noteBox}>
            <Text normal lightGrey regular>
              Have an account?
              <Text> </Text>
              <Text
                style={{color: colors.softBlue}}
                onPress={() => this._handleClickSignIn()}>
                SIGN IN
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickSignUpButton() {
    //this.props.navigation.navigate('StartNameScreen');
    this.props.navigation.navigate('VerifyPhoneScreen');
  }

  _handleClickSignIn() {
    // const screen = SignInScreen;
    // const params = null;
    // const path = null;
    // const { router } = screen;
    // const action = path && router.getActionForPathAndParams(path, params);

    // this.props.navigation.navigate('SignInScreen', {}, action);
    this.props.navigation.navigate('SignInScreen');
  }
}

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 52,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.38,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.32,
        marginBottom: spaceHeight * 0.18,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 255,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.15,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
  }
});
