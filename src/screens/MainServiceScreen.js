import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar'; 
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';
import { connect } from 'react-redux'
import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';  
import { _storeData } from "./statefull/storeLocalStorage";
import { getPersonalData } from "./statefull/appStatefull";

class MainServiceScreen extends Component {
  constructor(props) {
    super(props);
  } 

  async componentDidMount() {
    console.log('this.props.Journal',this.props, this.props.navigation.state.params);
    const idpers = this.props.navigation.state.params.id;
    let data = this.props.data;
    if(!idpers){
      console.log('before onGo');
      data = await getPersonalData('/api_v1/apis/'+this.props.data.personne.id+'/profiles.json');
      this.props.publishJournal(data);
    }
    let rs = await _storeData(data);
    console.log('after sstore data', rs)
  }

  render() {
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
          <Text title black mediumBold style={{lineHeight: 49, marginBottom: 10}}>
            Mon Journal,
          </Text>
          <Text title lightGrey extraBold>
            Comment prendre soins de vous?
          </Text>
        </View>
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
  _handleClickNotificationScreen() {
    this.props.navigation.navigate("NotificationScreen");
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

export default connect(mapStateToProps, mapDispatchToProps)(MainServiceScreen);
