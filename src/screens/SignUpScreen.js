import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton'; 
import CheckBox from '../elements/CheckBox'; 

import { deviceHeight, shadowOpt, colors } from '../styles/variables';
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import StartNameScreen from './StartNameScreen';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
// import SignInScreen from './SignInScreen';
import { getArrondissementData } from "./statefull/appStatefull";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      username: "",
      tel: "",
      password: "",
      repass: "", 
      arrs: null,
    }
  }

  async componentDidMount(){
    let arrs = await getArrondissementData();
    console.log('arrs commeback', arrs)
    this.setState({ arrs: arrs});
  }

   messageWithPosition (position = "bottom",  extra = {}) {
    let message = {
       message: "Le mot de passe ne correspond pas.",
      type: "default",
      position,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message);
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
                placeholder="Non d'utilsateur"
                style={CommonStyles.textInput}
                value={this.state.username}
                onChangeText = {(ev)=>{this.setState({username: ev})}}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
              />
              <TextInput
                placeholder='Mot de passe'
                value={this.state.password}
                onChangeText = {(ev)=>{this.setState({password: ev})}}
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
                placeholder='Confirmation'
                value={this.state.repass}
                onChangeText = {(ev)=>{this.setState({repass: ev})}}
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
                placeholder='Télephone'
                value={this.state.tel}
                onChangeText = {(ev)=>{this.setState({tel: ev})}}
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
              J'ai déja un compte?
              <Text> </Text>
              <Text
                style={{color: colors.softBlue}}
                onPress={() => this._handleClickSignIn()}>
                Se connecter
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  async _handleClickSignUpButton() {
    //this.props.navigation.navigate('StartNameScreen');
    if(this.state.password.toString() !== this.state.repass.toString()){
      this.messageWithPosition();
      return true; //show flashing message
    } 
    let infos = {
      username: this.state.username,
      password: this.state.password, 
      tel1: this.state.tel
    }  
    await this.props.dispatchBaseInfos(infos);
    console.log('this.state.arrs', this.state.arrs)
    //this.props.navigation.navigate('VerifyPhoneScreen', {arrs: this.state.arrs});
    this.props.navigation.navigate('StartNameScreen', {arrs: this.state.arrs});
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



const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchBaseInfos: async (infos) => {
      dispatch({type: "DISPACT_BASE_INFOS", infos: infos});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);