import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { updateCasContact } from "./statefull/appStatefull";
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import CheckBox from '../elements/CheckBox';
import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  shadowOpt
} from '../styles/variables';

export default class AddCasContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      date: null,
      sexe: null,
      lieu: null,
    }
  }
  async componentDidMount() {
    const item = this.props.navigation.state.params.item;
    if(item !== null){
	    this.setState({
	      nom: item.personne.nom, 
	      prenom: item.personne.prenom,
	      telephone: item.personne.telephone,
	      email: item.personne.email,
	      sexe: item.personne.sexe,
	      lieu: item.lieurencontre,
	      date: item.daterencontre
	    })
	    console.log('update state succes', item);
	}
  }
  _onSave = async () => {
  	let data = {

  	}
  }
  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Ajouter un Cas contact'
        />
        <View style={styles.addDrugBtn}>
        {
        //   <Image
        //     source={require('../../img/healer/addDrug.png')}
        //     style={{width: 90, height: 90}}
        //   />
        }
        </View>
        <ScrollView style={CommonStyles.scrollView}>
        <View style={styles.form}>
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
                placeholder="Nom"
                onChangeText={(val)=>this.setState({nom: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                value={this.state.nom}
              />
            </View>
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
                placeholder="Prenom"
                value={this.state.prenom}
                onChangeText={(val)=>this.setState({prenom: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
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
                placeholder="email"
                type="email"
                value={this.state.email}
                onChangeText={(val)=>this.setState({email: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
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
                placeholder="Tel"
                type="number"
                value={this.state.telephone}
                onChangeText={(val)=>this.setState({telephone: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
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
                placeholder="DD/MM/YYYY"
                type="text"
                value={this.state.date}
                onChangeText={(val)=>this.setState({date: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
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
                placeholder="Lieu"
                type="text"
                value={this.state.lieu}
                onChangeText={(val)=>this.setState({lieu: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.subFormBox}>
              <CheckBox
                label='Masculin'
                checked={this.state.sexe === 'MASCULIN'}
                onChange={(checked) => this.setState({sexe: 'MASCULIN'}) }
                checkedImage={require('../../img/healer/check.png')}
                uncheckedImage={require('../../img/healer/icUncheck.png')}
              />
              <CheckBox
                label='Feminin'
                checked={this.state.sexe === 'FEMININ'}
                onChange={(checked) => this.setState({sexe: 'FEMININ'}) }
                checkedImage={require('../../img/healer/check.png')}
                uncheckedImage={require('../../img/healer/icUncheck.png')}
              />
            </View>

        </View>

        <View style={styles.btn}>
          <GradientButton
            onPressButton={this._onSave}
            setting={shadowOpt}
            btnText="Enregistrer"
          />
        </View>
        </ScrollView>
      </View>
    );
  }

  // Go to ListDrugsScreen
  _handleAddDrugs() {
    this.props.navigation.navigate('ListDrugsScreen');
  }
}

const ELEMENT_HEIGHT = 440;
const spaceHeight = deviceHeight - (ELEMENT_HEIGHT + NAV_HEIGHT + STATUSBAR_HEIGHT);

const styles = StyleSheet.create({
  addDrugBtn: {
    alignItems: 'center',
    marginTop: spaceHeight * 0.05,
    marginBottom: spaceHeight * 0.29,
  },
  subFormBox: {
    width: deviceWidth - 85,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  form: {
    // height: 305,
    alignItems: 'center',
  },
  selectboxField: {
    width: deviceWidth - 55,
    height: 91,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor:'rgb(229,229,229)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
    backgroundColor:'#fff',
  },
  selectboxRow: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    fontSize: 17,
    height: 30
  }
});
