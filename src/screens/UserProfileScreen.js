import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import GradientButton from '../elements/GradientButton';

import CustomTabBar from '../components/CustomTabBar';
import ItemWithDetail from '../components/ItemWithDetail';
import ProfileCard from '../components/user-profile/ProfileCard';
import InsurranceCard1 from '../components/user-profile/InsurranceCard1';
import { connect } from 'react-redux';
import { urlMedia } from "./statefull/appStatefull";
import { deviceWidth, deviceHeight, shadowOpt } from '../styles/variables';

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          menu
          titleText='Profile'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/settings.png'),
                buttonAction: this.onClickSettingButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              }
            ]
          }
        />
        <ScrollView style={CommonStyles.scrollView}>
          <View style={styles.avaCont}>
            <Image
              source={{uri: urlMedia+this.props.data.user.personne.image}}
              style={{width: 160, height: 160}}
            />
          </View>
          <View style={styles.nameCont}>
            <Text header black mediumBold>
              {this.props.data.user.personne.prenom}{" "}{this.props.data.user.personne.nom}
            </Text>
            <Text header black mediumBold>
              {this.props.data.user.personne.email}
            </Text>
          </View>
          <View style={CommonStyles.itemWhiteBox}>
            <View >
              <InsurranceCard1
                  
                  header={""}
                  image={require('../../img/healer/add.png')}
                  imageWidth={55}
                  imageHeight={55}
                  item={this.props.data.user}
                  name={"item.name"}
                  code={"item.code"}
                  group={"item.group"}
                  date={"item.date"}
                  plan={"item.plan"}
                  urlMedia={urlMedia}
                />
            </View>
            <View style={styles.rowBottom}>
                <GradientButton
                  onPressButton={this.navigateToAddDrugs}
                  setting={shadowOpt}
                  btnText="Modifier"
                />

            </View>
          </View>
        {
          // <View style={styles.otherCont}>
          //   <ItemWithDetail
          //     image={{
          //       url: require('../../img/healer/target.png'),
          //       width: 26,
          //       height: 26
          //     }}
          //     header='Goal Settings'
          //     onPressItem={this._handleClickGoalSettings.bind(this)}
          //   />
          //   <ItemWithDetail
          //     image={{
          //       url: require('../../img/healer/heart.png'),
          //       width: 26,
          //       height: 23.5 
          //     }}
          //     header='Doctor Favorites'
          //     onPressItem={this._handleClickDoctorFavorites.bind(this)}
          //   />
          //   <ItemWithDetail
          //     image={{
          //       url: require('../../img/healer/umbrella.png'),
          //       width: 22,
          //       height: 25 
          //     }}
          //     header='Insurrance'
          //     onPressItem={this._handleClickInsurrance.bind(this)}
          //   />
          // </View>
        }
        </ScrollView>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabFour'
        />
      </View>
    );
  }

  navigateToAddDrugs = () =>{
    this.props.navigation.navigate("AddDrugsScreen", {personne: this.props.data.user})
  }

  onClickSettingButton() {
    this.props.navigation.navigate("SettingsScreen");
  }

  // Go to GoalSettingsScreen 
  _handleClickGoalSettings() {
    this.props.navigation.navigate("GoalSettingsScreen");
  }

  // Go to DoctorFavoritesScreenr
  _handleClickDoctorFavorites() {
    this.props.navigation.navigate("DoctorFavoritesScreen");
  }

  // Go to InsurranceScreen 
  _handleClickInsurrance() {
    this.props.navigation.navigate("InsurranceScreen");
  }
}

UserProfileScreen.defaultNavigationOptions = {
  tabBarVisible: false,
}
const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  avaCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  nameCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  rowTop: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(229,229,229)',
    paddingTop: 20,
  },
  rowBottom: {
    flexDirection: 'row',
    paddingBottom: 20,
    textAlign: "center",
    marginLeft: 10,
  },
  otherCont: {
    marginBottom: 28,
  },
});

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserProfileScreen);
