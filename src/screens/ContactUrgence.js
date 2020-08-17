import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import GradientNavigationBar from '../elements/GradientNavigationBar'; 

import { deviceWidth, deviceHeight, shadowOpt } from '../styles/variables';
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import StartBirthdayScreen from './StartBirthdayScreen';
import RNPickerSelect from 'react-native-picker-select';
import { showMessage, hideMessage } from "react-native-flash-message";
import { updatePersonneUrgence } from "./statefull/appStatefull";
import AlertDialog from '../elements/AlertDialog';
import AlertDeleteDlMessage from '../components/list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from '../components/list-item/AlertDeleteDlTitle';


class ContactUrgence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      tel: "",
      lisible: false,
    }
  }
  componentDidMount () {
  	let nom_contact_urgence;
  	let telephone_contact_urgence;
  	if(this.props.nom_contact_urgence){
  		nom_contact_urgence = this.props.nom_contact_urgence;
  		telephone_contact_urgence = this.props.telephone_contact_urgence;
  	}
  	else{
  		nom_contact_urgence = this.props.data.nom_contact_urgence
  		telephone_contact_urgence = this.props.data.telephone_contact_urgence;
  	}
  	
  	let obj = {
  		nom_contact_urgence: nom_contact_urgence,
  		telephone_contact_urgence: telephone_contact_urgence
  	}
  	this.props.upContactUrgence(obj);
  	this.setState({
  		nom: nom_contact_urgence,
  		tel: telephone_contact_urgence
  	})
  }

  render() {
    
    return (
      <View style={CommonStyles.normalPage}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <GradientNavigationBar
          navigation={this.props.navigation}
          // menu
          back
          titleText={"Contact d'urgence"}
          titleImgStyle={{
            width: 73,
            height: 18,
          }}
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>Modifier contact</Text>
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
                source={require('../../img/healer/smartphone.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                value={this.state.tel}
                onChangeText = {(ev)=>{this.setState({tel: ev})}}
                placeholder='Télephone'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={{height: 15, alignSelf: 'center'}}>
            
          </View>
          <View style={{height: 45, alignSelf: 'center'}}>
            <GradientButton
              onPressButton={()=>{this.setState({lisible: true})}}
              setting={shadowOpt}
              btnText="Continuer"
            />
          </View>
          <AlertDialog
          modalVisible={this.state.lisible}
          onRequestClose={()=> this.setState({ lisible: false})}
          dlTitle={{
            component: <AlertDeleteDlTitle
              text='Sauvgarde'
            />
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText="Faut-il editer votre"//this.props.text1
              highlightText="contact d'urgence ?"//this.props.text2
              behindText=''
            />
          }}
          dismissBtn={{
            text: 'Non',
            onPress: () => { this.setState({ lisible: false})},
          }}
          acceptBtn={{
            text: 'Oui',
            onPress: () => {this.onStartYourBirthDayScreen()},
          }}
        />
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
       message: "Sauvegarde en cours ...",
      type: "default",
      position,
      autoHide: false,
      // animationDuration: 1000, 
      icon: { icon: "auto", position: "left" },
      duration: 6000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message);
  }

  async onStartYourBirthDayScreen() {
    this.setState({lisible: false})
    this.flash();
    const nameOb = {
      nom_contact_urgence: this.state.nom,
      telephone_contact_urgence: this.state.tel
    }
    const data = {
    	patient: {
    		pu: this.state.nom,
    		telu: this.state.tel
    	} 
    }
    console.log('this.props.data.id', this.props.data.personne.id, data)
    this.props.upContactUrgence(nameOb)
    let res = await updatePersonneUrgence(this.props.data.personne.id, data);
    console.log('result', res);
    hideMessage();
    this.props.navigation.navigate('MainServiceScreen')
    // const screen = StartBirthdayScreen;
    // const params = null;
    // const path = null; 
    // const { router } = screen;
    // const action = path && router.getActionForPathAndParams(path, params);

    //this.props.navigation.navigate('StartBirthdayScreen', {}, action);
  }
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    upContactUrgence: async (infos) => {
      dispatch({type: "UP_CONTACT_URGENCE", data: infos});
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactUrgence);