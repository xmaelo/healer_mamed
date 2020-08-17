import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { TextInput, View, StyleSheet, Image, TouchableHighlight, ScrollView, StatusBar, Platform } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox'; 

import { deviceWidth, deviceHeight, shadowOpt, colors } from '../styles/variables';
import { showMessage, hideMessage } from "react-native-flash-message";
import { _retrieveData, _storeData } from "./statefull/storeLocalStorage";
import CommonStyles from '../styles/CommonStyles';
import SignUpScreen from './SignUpScreen'; 
import { connect } from 'react-redux'
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { getPersonalData, login } from "./statefull/appStatefull";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      remember: false,
      show: true,
      message: "Connection en cours ...",
      password: '',
      username: '',
    };
  } 

  async componentDidMount() {
    console.log('sign in componenet did mount before call api');
    await _retrieveData();
    
  }
  initJournal = async (id) => { 
    this.setState({message: 'Initialisation du Journal ...'});
    this.messageWithPosition3();
    let data = await getPersonalData('/api_v1/apis/'+id+'/profiles.json');
    console.log('response from api',data)
    this.setState({ show : false}) 
    this.props.publishJournal(data);
    hideMessage(); 
    let rs = await _storeData(data);
    console.log('after sstore data', rs)
    this.props.navigation.navigate('MainServiceScreen', {id: data.personne.id})
  }
  login = async () => {
    this.messageWithPosition();
    let ob = {
      username: this.state.username,//'patient',//
      password: this.state.password //'romain'//
    }
    let data = await login(ob);
    if(data.data && data.data.success && data.data.success == true){
      console.log('in login',data);
      this.initJournal(data.data.id);
    }
    else{
      this.setState({
        message: "Une erreur inconnue est survenue"
      })
      this.messageWithPosition2(); 
    }
    
  }
   messageWithPosition = (position = "bottom",  extra = {}) => {
    let message = {
       message: "Connection en cours ...",
      type: "default",
      position,
      autoHide: false,
      // animationDuration: 1000, 
      icon: { icon: "auto", position: "left" },
      duration: 6000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message)
    
  }
  messageWithPosition2 = (position = "bottom",  extra = {}) => {
    let message = {
       message: "Une erreur inconnue est survenue",
      type: "default",
      position,
      autoHide: false,
      // animationDuration: 1000, 
      duration: 6000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message)
    
  }
  messageWithPosition3 = (position = "bottom",  extra = {}) => {
    let message = {
       message: "Initialisation du Journal ...",
      type: "default",
      position,
      autoHide: false,
      icon: { icon: "auto", position: "left" },
      animationDuration: 1000, 
      autoHide: false,
      duration: 6000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message)
    
  }

  render() {
    console.log('data props', this.props.data)
    return (
      <View style={CommonStyles.normalSinglePage}>
        <ScrollView contentContainerStyle={{height: deviceHeight - 25}}>
          <View style={styles.titleBox}>
            <Text extraLarge black extraBold>SIGN IN</Text>
          </View>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{
                  position:'absolute',
                  bottom: 12,
                  left: 20,
                  width: 19,
                  height: 22
                }}
              /> 
              <TextInput
                placeholder="Nom d'utilisateur"
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText = {(evt) => this.setState({username: evt})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20, width: 17, height: 22}}
              />
              <TextInput
                placeholder='Mot de passe'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText = {(evt) => this.setState({password: evt})}
              />
            </View>
            <View style={styles.subFormBox}>
              <CheckBox
                label='Se souvenir de moi'
                checked={this.state.remember}
                onChange={(checked) => this.setState({remember: !this.state.remember}) }
                checkedImage={require('../../img/healer/check.png')}
                uncheckedImage={require('../../img/healer/icUncheck.png')}
              />
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this._handleClickFortgotPass()}>
                <Image
                  source={require('../../img/healer/icForgotPass.png')}
                  style={{width: 40, height: 40}}
                />
              </TouchableHighlight> 
            </View>
          </View>
          <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
            <GradientButton
              onPressButton={() => this.login()}
              setting={shadowOpt}
              btnText="Se Connecter"
            />
          </View>
          {
            <View style={CommonStyles.buttonBox}>
              <Image
                source={require('../../img/healer/log.png')}
                style={{
                  position:'absolute',
                  // bottom: 1,
                  // left: 20,
                  width: 220,
                  height: 110
                }}
              />
              {
                // <GradientButton
                //   onPressButton={this._goToSignUpScreen.bind(this)}
                //   setting={shadowOpt}
                //   btnText="Sign In with Facebook"
                // />
                }
            </View>
          }
          <View style={styles.noteBox}>
            <Text normal lightGrey regular>
              Si vous n'avez pas de compte ?
              <Text> </Text>
              <Text
                style={{color: colors.softBlue}}
                onPress={() => this._goToSignUpScreen()}>
                En Créer
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _goToSignUpScreen() {
    this.props.navigation.navigate('SignUpScreen');
  }
  _goToMainScreen() {
    this.props.navigation.navigate('MainServiceScreen');
  }

  _handleClickFortgotPass() {
    this.props.navigation.navigate('ForgotPasswordScreen');
  }
}

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 52,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.30,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.30,
        marginBottom: spaceHeight * 0.20,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 190,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.05,
  },
  subFormBox: {
    width: deviceWidth - 85,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
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
    publishJournal: async (data) => {
      dispatch({type: "PUBLISH_JOURNAL", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
