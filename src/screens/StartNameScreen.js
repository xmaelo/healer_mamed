import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import { deviceWidth, deviceHeight, shadowOpt } from '../styles/variables';
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import StartBirthdayScreen from './StartBirthdayScreen';
import RNPickerSelect from 'react-native-picker-select';
import { showMessage, hideMessage } from "react-native-flash-message";

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
      Regions: [],
      reg: "",
      departements: null,
      all: [], 
      allDep: [],
      a: null,
      b: null,
      arrondissements: null,
    }
  }
  componentDidMount () {
    const Regs = this.props.navigation.state.params.arrs;
    console.log('Regs Regs ', Regs)
    this.setState({all: Regs})
    const Regions = [];
    Regs.map((reg, ind) => {
      let prototype = { label: reg.nom, value: ind};
      Regions.push(prototype);
    })
    this.setState({ Regions: Regions });
  }
  selectDep = (id) => {
    let departs = id ? this.state.all[id].departements : [];
    this.setState({allDep: departs, departements: null, arrondissements: null, a: null, b: null});
    console.log('departs', departs)
    let departements = [];
    departs.map((dep, ind) =>{
      let prototype = {label: dep.nom, value: ind};
      departements.push(prototype);
    })
    this.setState({departements: departements});
  }
  selectArr = (id) => {
    this.setState({a: null, arrondissements: null})
    let arrs = id ? this.state.allDep[id].arrondissements : [];
    console.log('arrs', arrs)
    let arrond = [];
    arrs.map((dep, ind) =>{
      let prototype = {label: dep.nom, value: dep.id};
      arrond.push(prototype);
    })
    this.setState({arrondissements: arrond});
  }

  render() {
    console.log('this.props', this.state.departements)
    const Reg = {
      label: 'Votre région',
      value: null,
      color: '#9EA0A4',
    };
    const Dep = {
      label: 'Votre Département',
      value: null,
      color: '#9EA0A4',
    };
    const Arr = {
      label: 'Votre Arrondissement',
      value: null,
      color: '#9EA0A4',
    };
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
        <ScrollView style={CommonStyles.scrollView}>
          <View style={{alignSelf: 'center'}}>
            <View style={CommonStyles.textInputField}>
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
            <View style={CommonStyles.textInputField}>
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
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/envelope.png')}
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
            <View style={CommonStyles.textInputField}>
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
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/emergency-call.png')}
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
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/location.png')}
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
          <View  style={{alignSelf: 'center'}}>
            <RNPickerSelect
              onValueChange={(value) => { 
                              this.selectDep(value);
                              console.log(value)
                              this.setState({reg: value})
                            }}
              items={this.state.Regions}
              placeholder={Reg}
              useNativeAndroidPickerStyle={false}
              style = {{...pickerSelectStyles}}
          />
          </View>
          <View style={{height: 10, alignSelf: 'center'}}>
            
          </View>
          {
            this.state.departements ?
            <View  style={{alignSelf: 'center'}}>
              <RNPickerSelect
                onValueChange={(value) => {
                        console.log(value);
                        this.setState({b: value})
                        this.selectArr(value);
                      }}
                items={this.state.departements ? this.state.departements : []}
                placeholder={Dep}
                useNativeAndroidPickerStyle={false}
                style = {{...pickerSelectStyles}}
                value={this.state.b}
            />
            </View> : null
          }
          <View style={{height: 10, alignSelf: 'center'}}>
            
          </View>
          {
            this.state.arrondissements ?
            <View  style={{alignSelf: 'center'}}>
              <RNPickerSelect
                onValueChange={(value) => {
                  this.setState({a: value})
                  console.log('value', value)
                }}
                items={this.state.arrondissements ? this.state.arrondissements : null}
                placeholder={Arr}
                useNativeAndroidPickerStyle={false}
                style = {{...pickerSelectStyles}}
                value={this.state.a}
            />
            </View> : null
          }
          <View style={{height: 15, alignSelf: 'center'}}>
            
          </View>
          <View style={{height: 45, alignSelf: 'center'}}>
            <GradientButton
              onPressButton={this.onStartYourBirthDayScreen.bind(this)}
              setting={shadowOpt}
              btnText="Continuer"
            />
          </View>
        </ScrollView >
      </View>
    );
  }

  bannerError(error) {
    console.log("Banner error", error);
  }
  onStartYourBirthDayScreenZ() {
  }
  flash (position = "bottom",  extra = {}) {
    let message = {
       message: "vous n'avez pas selectionner quelque chose",
      type: "default",
      position,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message);
  }

  onStartYourBirthDayScreen() {
    if(!this.state.a){
      //return this.flash();
    }
    const nameOb = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      pu: this.state.tu,
      telu: this.state.tu,
      pucontact: this.state.pu,
      arondis: this.state.a,
      departement: this.state.b,
      region: this.state.reg,
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: 270,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 300,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StartNameScreen);