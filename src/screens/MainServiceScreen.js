import React, { Component } from 'react';
import { TextInput, View, 
  StyleSheet, Image, TouchableHighlight, 
  Vibration, Platform } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar'; 
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';
import { connect } from 'react-redux'
import MenuItemBox from '../components/MenuItemBox';  
import CustomTabBar from '../components/CustomTabBar';  
import { _storeData } from "./statefull/storeLocalStorage";
import { getPersonalData, getSaveToken, arretSuivie, getMedecinSuivie } from "./statefull/appStatefull";
import { colors, fontSize, fontFamily } from '../styles/variables';
import GradientButton from '../elements/GradientButton';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';



class MainServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noSuivie: false,
    }
  } 
 //507F0gFWWBkueKQOj2MpbO  1
 //
  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.initSuivie()
    //Vibration.vibrate(1000 * 10);
    console.log('this.props.Journal',this.props, this.props.navigation.state.params);
    // const idpers = this.props.navigation.state.params.id;
    let data = this.props.data;
    // if(!idpers){
    //   console.log('before onGo');
    //   data = await getPersonalData('/api_v1/apis/'+this.props.data.personne.id+'/profiles.json');
    //   this.props.publishJournal(data);
    // }
    let rs = await _storeData(data);
    console.log('after sstore data', rs)
  }

  initSuivie = async () => {
    let resil = await getMedecinSuivie(this.props.data.personne.id);
    console.log('Suivi', resil)
    if(resil && resil[0] &&resil[0].medecin){
      this.props.setSuive({name: resil[0].medecin, id: resil[0].idmed, idSuivie: resil[0].id})
    }
    if(resil && resil.length === 0){
      this.setState({noSuivie: true})
      this.props.setSuive({})
    }
  }
  _handleNotification = notification => {
    Vibration.vibrate();
    this.setState({ notification: notification });
    console.log(notification);
  };
  arretSuivie = async() => {
     console.log('arretSuivie Suivi')
     //await arretSuivie();
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      console.log('finalStatus', finalStatus)
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync(); 
      console.log('token token token' ,token);
      this.setState({ expoPushToken: token });
      await getSaveToken(this.props.data.personne.id, token)
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  render() {
    const smallShadowOpt = {
      btnWidth: 125,
      btnHeight: 35,
      shadowHeight: 65,
      fontSize: 15,
    }
    return ( 
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          menu
          titleText={"Journal"}
          titleImgStyle={{
            width: 73,
            height: 18, 
          }} 
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/email.png'),
                buttonAction: this._handleClickEmailButton.bind(this),
                buttonWidth: 24,
                buttonHeight: 19,
              },
              {
                key: 2,
                buttonIcon: require('../../img/healer/notification.png'),
                buttonAction: this._handleClickNotificationButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 22,
              }
            ]
          }
        /> 
        <View style={styles.titleBox}>
          <Text medium black mediumBold style={{lineHeight: 49, marginBottom: 10}}>
            Mon Journal,
          </Text>
        </View>

        {(!this.state.noSuivie || this.props.data.suivie && this.props.data.suivie.name) &&
          <View style={[CommonStyles.itemWhiteBox,styles.card]}>
            <View style={styles.left}>
              <Image
                source={require('../../img/person/profil2.jpg')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View style={styles.right}>
              <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                 Suivi par: Dr. {this.props.data.suivie.name}
              </Text>
              <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23, paddingBottom: 10}}>
                5 mois déja
              </Text>
              <GradientButton
                onPressButton={async()=>{
                    //this.props.navigation.navigate("CallDoctorScreen");
                    await arretSuivie(this.props.data.suivie.idSuivie);
                    this.initSuivie();
                  }
                }
                setting={smallShadowOpt}
                btnText="Arreter "
              />
            </View>
          </View>
        }


        <View style={styles.fullField}>
          <View style={styles.colMainLeft}>
            <MenuItemBox
              header='Activités'
              subHeader={this.props.data.diagnostiques.length +' Trouvés'}
              icon={require('../../img/healer/surgeonIcon.png')}
              iconWidth={20}
              iconHeight={26}
              onPressCard={this._handleInsurranceScreen.bind(this)}
            />
            <MenuItemBox
              header='Resultats & Rapport'
              // subHeader='*** disponibles'
              icon={require('../../img/healer/medicineBookIcon.png')}
              iconWidth={20}
              iconHeight={26}
              onPressCard={this._handleClickDrugsShopScreen.bind(this)}
            />
          </View>
          <View style={styles.colMainRight}>
            <MenuItemBox
              header='Centres'
              subHeader={this.props.data.centres.length +' Hospitals'}
              icon={require('../../img/healer/hospital.png')}
              iconWidth={26}
              iconHeight={25}
              onPressCard={this._handleClickFindHospital.bind(this)}
            />
            <MenuItemBox
              header='Antécedents'
              // subHeader='26 services'
              icon={require('../../img/healer/clipboard1.png')}
              iconWidth={22}
              iconHeight={26}
              onPressCard={this._handleClickNotificationScreen.bind(this)}
            />
          </View>
        </View>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabHome'
        />
      </View>
    )
  }

  // Go to AppointmentScreen 
  _handleClickDrugsShopScreen() {
    this.props.navigation.navigate("DrugsShopScreen", {toFichiers: this.props.data.fichiers});
  }

  _handleClickNotificationButton() {
    this.props.navigation.navigate("NotificationScreen");
  }

  // Click email button 
  _handleClickEmailButton() {
    this.props.navigation.navigate("DoctorReviewScreen", {id: this.props.data.personne.id});
  }
 
  // Go to FindDoctorScreen
  _handleInsurranceScreen() { 
    this.props.navigation.navigate("InsurranceScreen", {toActivites: this.props.data.diagnostiques});
  }

  // Go to FindHospitalScreen
  _handleClickFindHospital() { 
    this.props.navigation.navigate("ResultFindHospitalScreen", {toCentres: this.props.data.centres});
  }

  // Go to NotificationScreenScreen 
  _handleClickNotificationScreen = () => {
    this.props.navigation.navigate("AntecedentScreen");
  }
}

MainServiceScreen.defaultNavigationOptions = {
  tabBarVisible: false,
};

const ELEMENT_HEIGHT = 430;
const spaceHeight = deviceHeight - (NAV_HEIGHT + TAB_HEIGHT + ELEMENT_HEIGHT);

const styles = StyleSheet.create({
  titleBox: {
    marginTop: spaceHeight * 0.12,
    paddingHorizontal: 27,
  },
  fullField: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: spaceHeight * 0.1,
  },
  colMainLeft: {
    flex: 1,
    marginRight: 8,
  },
  colMainRight: {
    flex: 1,
    marginLeft: 8,
  },
  left: {
    flexDirection: 'row',
    width: 44,
  },
  right: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    publishJournal: async (data) => {
      dispatch({type: "PUBLISH_JOURNAL", data: data});
    },
    setSuive: async (data) => {
      dispatch({type: "SET_SUIVIE", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainServiceScreen);
