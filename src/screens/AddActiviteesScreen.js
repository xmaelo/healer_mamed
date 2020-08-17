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
import {
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';
import Icon from 'react-native-vector-icons/Entypo';
import { updateCasContact } from "./statefull/appStatefull";
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import SelectBox from '../elements/SelectBox';
import { connect } from 'react-redux'
import CommonStyles from '../styles/CommonStyles';
import CheckBox from '../elements/CheckBox';

import AlertDialog from '../elements/AlertDialog';
import AlertDeleteDlMessage from '../components/list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from '../components/list-item/AlertDeleteDlTitle';
import MoreModal from '../components/list-item/MoreModal';
import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  shadowOpt
} from '../styles/variables';
import { onSaveActivity, getPersonalData } from "./statefull/appStatefull";
import { showMessage, hideMessage } from "react-native-flash-message";

class AddActiviteesScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      toMap: [],
      toux: false,
      rhume: false,
      podorat: false,
      diarrhee: false,
      mautete: false,
      fievre: null,
      generespiratiore: false,
      maugorge: false,
      fatigue: false,
      coubaturemusc: false,
      etatetrange: false,
      voyage: false,
      contact: false,
      spinner: false,
      modalVisible: false,
      visible: false,
      temperature: '',

    }
  }
  async componentDidMount() {
  	let itel = [
      {label: "Toux ?", key: "toux"},
      {label: "Rhume ?", key: "rhume"},
      {label: "Odorat ?", key: "podorat"},
      {label: "Diarrhée ?", key: "diarrhee"},
      {label: "Tete ?", key: "mautete"},
      {label: "Fievre ?", key: "fievre"},
      {label: "Gene ?", key: "generespiratiore"},
      {label: "George ?", key: "maugorge"},
      {label: "Fatigue ?", key: "fatigue"},
      {label: "Courbature ?", key: "coubaturemusc"},
      {label: "Etranger ?", key: "etatetrange"},
      {label: "Voyager ?", key: "voyage"},
      {label: "Contact ?", key: "contact"},
    ];
    this.setState({toMap: itel});
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
  _onSave = async () => {
  	let date = Date();
    let tDate = new Date(date).toLocaleDateString('fr-CA') +' '+ new Date(date).getHours()+':' +new Date(date).getMinutes();
    const { navigation } = this.props;
    this.setState({modalVisible: false});
    this.messageWithPosition();
    let ob  = {
        diagnostique: {
          toux: this.state.toux ,
          rhume: this.state.rhume ,
          podorat: this.state.podorat ,
          diarrhee: this.state.diarrhee ,
          mautete: this.state.mautete ,
          fievre: this.state.temperature ,
          generespiratiore: this.state.generespiratiore ,
          maugorge: this.state.maugorge ,
          fatigue: this.state.fatigue ,
          coubaturemusc: this.state.coubaturemusc ,
          etatetrange: this.state.etatetrange , 
          voyage: this.state.voyage ,
          contact: this.state.contact,
          datesave: tDate
        }
    } 
    console.log('this.props.data.personne.id', ob)
    let rs = await onSaveActivity(this.props.data.personne.id, ob);
    console.log('rsrsrsrsrsrsrsrs rs',rs)
    if(rs.data.success){
      let data = await getPersonalData('/api_v1/apis/2/profiles.json');
      console.log('response from api',data) 
      this.props.publishJournal(data);
	    // this.props.addNewInDiag(ob);
	    navigation.goBack(null)
	    hideMessage();
	    console.log(ob)
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
        	<Text style={styles.label}>
            	AVEZ VOUS:
          	</Text>
        </View>
        <ScrollView style={CommonStyles.scrollView}>
        <View style={styles.form}>
          	            
            	<View style={{height: 20, alignSelf: 'center'}}>
          		</View>
          	{this.state.toMap.map((item, key) =>{
          		return(
		          	<View key={key}>
			            <View style={styles.subFormBox}>
			            	<Text style={styles.label}>
				            	{item.label}
				          	</Text>
			              <CheckBox
			                label='Oui'
			                checked={this.state[item.key]}
			                onChange={(checked) => this.setState({[item.key]: !this.state[item.key]}) }
			                checkedImage={require('../../img/healer/check.png')}
			                uncheckedImage={require('../../img/healer/icUncheck.png')}
			              />
			              <CheckBox
			                label='Non'
			                checked={!this.state[item.key]}
			                onChange={(checked) => this.setState({[item.key]: !this.state[item.key]}) }
			                checkedImage={require('../../img/healer/check.png')}
			                uncheckedImage={require('../../img/healer/icUncheck.png')}
			              />
			            </View>
			            <View style={{height: 10, alignSelf: 'center'}}>
			          	</View>
			        </View>
			    )
		     })}

            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/high-temperature.png')}
                style={{
                  position:'absolute',
                  bottom: 12,
                  left: 20,
                  width: 22,
                  height: 25
                }}
              />
              <TextInput
                placeholder="votre température"
                onChangeText={(val)=>this.setState({temperature: val})}
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                value={this.state.temperature}
              />
            </View>

        </View>

        <View style={styles.btn}>
          <GradientButton
            onPressButton={()=>{this.setState({modalVisible: true})}}
            setting={shadowOpt}
            btnText="Sauver"
          />
        </View>
        <AlertDialog
          modalVisible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
              visible: false,
            });
          }}
          dlTitle={{
            component: <AlertDeleteDlTitle
              text='Sauvgarde'
            />
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText="Faut-il vraiment ajouter "
              highlightText='cet activité dans '
              behindText='votre liste?'
            />
          }}
          dismissBtn={{
            text: 'Non',
            onPress: () => { this.toggleAlertDeleteDialog(false) },
          }}
          acceptBtn={{
            text: 'Oui',
            onPress: () => { this._onSave() },
          }}
        />
        </ScrollView>
      </View>
    );
  }

  // Go to ListDrugsScreen
  _handleAddDrugs() {
    //this.props.navigation.navigate('ListDrugsScreen');
  }

   // Hide ande show alert dialog
  toggleAlertDeleteDialog(visible) {
    this.setState({
      modalVisible: visible,
      visible: false,
    });
  }

  // Hide and show MoreModal
  toggleMoreModal() {
    this.setState({
      modalVisible: this.state.modalVisible,
      visible: true
    });
  }

}

const ELEMENT_HEIGHT = 440;
const spaceHeight = deviceHeight - (ELEMENT_HEIGHT + NAV_HEIGHT + STATUSBAR_HEIGHT);

const styles = StyleSheet.create({
  addDrugBtn: {
    alignItems: 'center',
    marginTop: spaceHeight * 0.05,
    // marginBottom: spaceHeight * 0.29,
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
  label: {
  	width: 120,
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    marginTop: 5,
    textTransform: 'uppercase'
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
    addNewInDiag: async (data) => {
      dispatch({type: "ADD_DATA", data: data});
    },
    publishJournal: async (data) => {
      dispatch({type: "PUBLISH_JOURNAL", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddActiviteesScreen);
