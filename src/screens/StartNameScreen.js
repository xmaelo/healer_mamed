import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import { deviceWidth, deviceHeight, shadowOpt } from '../styles/variables';
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import StartBirthdayScreen from './StartBirthdayScreen';
 
class StartNameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      email: "",
      tu: "",
      pu: "",
      arrondis: "",
      adresse: "",
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
          rightChildren={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.onStartYourBirthDayScreenZ.bind(this)}
            >
              {/*<Text header softBlue regular>Saut</Text>*/}
            </TouchableOpacity>
          }
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>Informations réquise</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.nom}
              onChangeText = {(ev)=>{this.setState({nom: ev})}}
              placeholder='Nom'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.prenom}
              onChangeText = {(ev)=>{this.setState({prenom: ev})}}
              placeholder='Prenom'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.email}
              onChangeText = {(ev)=>{this.setState({email: ev})}}
              placeholder='Email'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.pu}
              onChangeText = {(ev)=>{this.setState({pu: ev})}}
              placeholder="Personne d'urgence"
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.tu}
              onChangeText = {(ev)=>{this.setState({tu: ev})}}
              placeholder="Telephone d'urgence"
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.arrondis}
              onChangeText = {(ev)=>{this.setState({arrondis: ev})}}
              placeholder="Votre arrondissement"
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              value={this.state.adresse}
              onChangeText = {(ev)=>{this.setState({adresse: ev})}}
              placeholder="Votre adresse"
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{height: 45, alignSelf: 'center'}}>
          <GradientButton
            onPressButton={this.onStartYourBirthDayScreen.bind(this)}
            setting={shadowOpt}
            btnText="Continuer"
          />
        </View>
      </View>
    );
  }

  bannerError(error) {
    console.log("Banner error", error);
  }
  onStartYourBirthDayScreenZ() {
  }

  onStartYourBirthDayScreen() {
    const nameOb = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      pu: this.state.pu,
      telu: this.state.tu,
      arondis: this.state.arrondis,
      adresse: this.state.adresse
    }
    this.props.dispatchBaseInfos(nameOb)
    const screen = StartBirthdayScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('StartBirthdayScreen', {}, action);
  }
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchBaseInfos: async (infos) => {
      dispatch({type: "DISPATCH_NAME", nameOb: infos});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartNameScreen);