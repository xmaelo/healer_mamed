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
import { connect } from 'react-redux'
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import SelectBox from '../elements/SelectBox';
import { onSaveCasContact, updateCasContact, getPersonalData } from "./statefull/appStatefull";
import CommonStyles from '../styles/CommonStyles';
import CheckBox from '../elements/CheckBox';

import { showMessage, hideMessage } from "react-native-flash-message";
import AlertDialog from '../elements/AlertDialog';
import AlertDeleteDlMessage from '../components/list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from '../components/list-item/AlertDeleteDlTitle';

import { 
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  shadowOpt
} from '../styles/variables';

class AddCasContactScreen extends Component {
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
      lisible: false,
      lieurencontre: '',
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
	      lieurencontre: item.lieurencontre,
	      date: item.daterencontre
	    })
	    console.log('update state succes', item);
	}
  }
  _onSave = async () => { 
     const { navigation } = this.props;
     const item = this.props.navigation.state.params.item;
     const index = this.props.navigation.state.params.index;
    this.setState({lisible: false})
    	let data = {
            contact: {
              nom: this.state.nom,
              prenom: this.state.prenom,
              telephone: this.state.telephone,
              email: this.state.email,
              sexe: this.state.sexe,
              lieurencontre: this.state.lieurencontre,
              daterencontre: this.state.date
            }
    	   } 
      let res = await onSaveCasContact(this.props.data.personne.id, data);
      console.log('data', data)
      this.messageWithPosition();
      if(!item){

        // let dis = {
        //             lieurencontre: this.state.lieurencontre, 
        //             daterencontre: this.state.daterencontre,
        //             personne: data.contact
        //           }
        // await this.props.addCasContact(dis)
      }else{
        console.log('in elese')
        let res = await updateCasContact(item.id, item.personne.id, data);
        // await this.props.updateCasContact(data.contact, item.id);
      }

    let journal = await getPersonalData('/api_v1/apis/2/profiles.json');
    console.log('response from api',journal) 
    this.props.publishJournal(journal);
    hideMessage();
    navigation.goBack(null)
  }

  messageWithPosition = (position = "bottom",  extra = {}) => {
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
    showMessage(message)
    
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
                source={require('../../img/healer/edit.png')}
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
                source={require('../../img/healer/envelope.png')}
                style={{
                  position:'absolute',
                  bottom: 12,
                  left: 20,
                  width: 19,
                  height: 15
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
                source={require('../../img/healer/smartphone.png')}
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
                source={require('../../img/healer/placeholder.png')}
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
                value={this.state.lieurencontre}
                onChangeText={(val)=>this.setState({lieurencontre: val})}
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
            onPressButton={() => {this.setState({lisible: true})}}
            setting={shadowOpt}
            btnText="Enregistrer"
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
              frontText="Faut-il vraiment ajouter "//this.props.text1
              highlightText='cet activité dans '//this.props.text2
              behindText='votre liste?'
            />
          }}
          dismissBtn={{
            text: 'Non',
            onPress: () => { this.setState({ lisible: false})},
          }}
          acceptBtn={{
            text: 'Oui',
            onPress: () => {this._onSave()},
          }}
        />
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


const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    addCasContact: async (data) => {
      dispatch({type: "ADD_CASCONTACT", data: data});
    },
    updateCasContact: async (data, id) => {
      dispatch({type: "UPDATE_CASCONTACT", data: data, id: id});
    },
    publishJournal: async (data) => {
      dispatch({type: "PUBLISH_JOURNAL", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCasContactScreen);
