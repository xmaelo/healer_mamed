import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import SelectBox from '../elements/SelectBox'; 
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { updateProfils, setImageRest} from "./statefull/appStatefull";
import CommonStyles from '../styles/CommonStyles';
import { connect } from 'react-redux'
import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  shadowOpt
} from '../styles/variables';
import { showMessage, hideMessage } from "react-native-flash-message";
class AddDrugsScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      tel_urg: "",
      con_urg: "",
      image: null,
    }
  }
  async componentDidMount() {
    const perons = this.props.navigation.state.params.personne;
    const peron = perons.personne;
    this.setState({
      nom: peron.nom,
      prenom: peron.prenom,
      telephone: peron.prenom,
      email: peron.email,
      con_urg: perons.nom_contact_urgence,
      tel_urg: perons.telephone_contact_urgence
    })
    this.getPermission();
  }

  getPermission = async () => {
    console.log('gt permissions run')
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) { 
      this.setState({image: result.uri});
      let data = {'pic-profile': result.uri}
     let re =  await setImageRest(this.props.data.personne.id, result.uri)
      await this.props.setImage(re.data);
      console.log('image uri', result.uri);
    } 
  };
  _onSave = async () => {
    const { navigation } = this.props;
    const data = {
      patient: {
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        telephone: this.state.telephone,
      }
    }
    this.messageWithPosition()
    let res = await updateProfils(this.props.data.personne.id ,data)
    await this.props.updateProfils(data.patient);
    hideMessage();
    //navigation.goBack(null)
  }

  messageWithPosition = (position = "bottom",  extra = {}) => {
    let message = {
       message: "Mise ajour en cours ...",
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
          titleText='Modifier profil'
        />
        <View style={styles.addDrugBtn}>
          <TouchableOpacity onPress={this.pickImage}>
            {!this.state.image ?
              <Image
                source={require('../../img/healer/addDrug.png')}
                style={{width: 90, height: 90}}
              /> :
              <Image 
                source={{ uri: this.state.image }} 
                style={{ width: 100, height: 100, borderRadius: 10 }} 
              />
            }
          </TouchableOpacity>
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
{
            // <View>
            //   <Text style={styles.text}>Informations d'urgence</Text>
            // </View>
            // <View style={CommonStyles.textInputField}>
            //   <Image
            //     source={require('../../img/healer/avatar.png')}
            //     style={{
            //       position:'absolute',
            //       bottom: 12,
            //       left: 20,
            //       width: 19,
            //       height: 22
            //     }}
            //   />
            //   <TextInput
            //     placeholder="Nom"
            //     value={this.state.con_urg}
            //     onChangeText={(val)=>this.setState({con_urg: val})}
            //     style={CommonStyles.textInput}
            //     underlineColorAndroid='transparent'
            //   />
            // </View>
            // <View style={CommonStyles.textInputField}>
            //   <Image
            //     source={require('../../img/healer/avatar.png')}
            //     style={{
            //       position:'absolute',
            //       bottom: 12,
            //       left: 20,
            //       width: 19,
            //       height: 22
            //     }}
            //   />
            //   <TextInput
            //     placeholder="telephone"
            //     value={this.state.tel_urg}
            //     onChangeText={(val)=>this.setState({tel_urg: val})}
            //     style={CommonStyles.textInput}
            //     underlineColorAndroid='transparent'
            //   />
            // </View>
}
              {
                // <SelectBox
                //   label='Medication Name'
                // />
                // <View style={styles.selectboxField}>
                //   <TouchableHighlight
                //     underlayColor={'transparent'}
                //   >
                //     <View style={styles.selectboxRow}>
                //       <Text style={CommonStyles.selectboxLabel}>Dosage</Text>
                //       <Icon
                //         style={{fontSize: 20, textAlign: 'center'}}
                //         name="chevron-thin-down"
                //         color="rgb(229,229,229)"
                //       />
                //     </View>
                //   </TouchableHighlight>
                //   <View style={{
                //     width: deviceWidth - 95,
                //     height: 0.7,
                //     backgroundColor: 'rgb(229,229,229)'
                //   }} />
                //   <TouchableHighlight
                //     underlayColor={'transparent'}
                //   >
                //     <View style={styles.selectboxRow}>
                //       <Text style={CommonStyles.selectboxLabel}>Unit</Text>
                //       <Icon
                //         style={{fontSize: 20, textAlign: 'center'}}
                //         name="chevron-thin-down"
                //         color="rgb(229,229,229)"
                //       />
                //     </View>
                //   </TouchableHighlight>
                // </View>
                // <SelectBox
                //   label='Appearance'
                // />
                // <SelectBox
                //   label='Infomation'
                // />
              }
        </View>

        <View style={styles.btn}>
          <GradientButton
            onPressButton={this._onSave}
            setting={shadowOpt}
            btnText="Mise A jour"
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
    marginTop: spaceHeight * 0.3,
    marginBottom: spaceHeight * 0.29,
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
    updateProfils: async (data) => {
      dispatch({type: "UPDATE_PROFILS", data: data});
    },
    setImage: async (data) => {
      dispatch({type: "SET_IMAGE", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDrugsScreen);
