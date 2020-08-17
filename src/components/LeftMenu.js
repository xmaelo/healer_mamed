import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, Vibration, TouchableHighlight, Platform, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, colors, fontSize, fontFamily } from '../styles/variables';
import { connect } from 'react-redux'
import { _storeData } from "../screens/statefull/storeLocalStorage";
import { getCall } from "../screens/statefull/appStatefull";
import AlertDialog from '../elements/AlertDialog'; 
import AlertDeleteDlMessage from './list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from './list-item/AlertDeleteDlTitle';

const resetAction = (routeName) => NavigationActions.reset({
  index: 0,
  actions: [ 
    NavigationActions.navigate({routeName: routeName, drawer: 'close'}),
  ]
});

class LeftMenu extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    setInterval(async() => {
      let res = await getCall(this.props.data.personne.id);
      if(res.length != 0 && this._isMounted){
        console.log('link',res[0].link);
          this.setState({visible: true, link: res[0].link});
          Vibration.vibrate(1000 * 10);
      }
      }, 1000);
  }
  onNavigate(route) {
    this.props.navigation.dispatch(resetAction(route))
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    
    let isActive = '';
    const img = "https://covid19.mamed.care"+"/bundles/mamedcovid/assets/images/pictures/";
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}> 
          <View style={styles.avatar}>
           { this.props.data ?
            <Image
              source={{ uri: img+ this.props.data.personne.image }}
              style={{width: 70, height: 70, borderRadius: 20}}
            /> : null
           }
          </View>
          <Text style={styles.name}>
            {
              this.props.data ? this.props.data.personne.prenom : null }{" "}
            {this.props.data ? this.props.data.personne.nom : null}
          </Text>
          <Text style={styles.balance}>
            {this.props.data ? this.props.data.personne.email : null}
          </Text>
        </View>

        <View style={styles.menu}>
          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickHome.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'home') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'home' && styles.activeMenuText
                ]}
              >
                DASHBOARD
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDrug.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'drug') { 
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'drug' && styles.activeMenuText
                ]}
              >
                MESSAGES
              </Text>
            </View>
          </TouchableHighlight>
        {/*
          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDrug.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'drug') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'drug' && styles.activeMenuText
                ]}
              >
                DRUG
              </Text>
            </View>
          </TouchableHighlight>
        */}
          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDoctors.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'doctors') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'doctors' && styles.activeMenuText
                ]}
              >
                DONNEES
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickLocal.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'localisation') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'doctors' && styles.activeMenuText
                ]}
              >
                LOCALISATION
              </Text>
            </View>
          </TouchableHighlight>
        
        {
          // <TouchableHighlight
          //   underlayColor='#efefef'
          //   style={styles.itemBox}
          //   onPress={ this._handleClickServices.bind(this) }>
          //   <View style={styles.itemBox}>
          //     {
          //       (() => {
          //         if (isActive == 'services') {
          //           return (
          //             <View style={styles.activeItem} />
          //           )
          //         }
          //       })()
          //     }
          //     <Text
          //       style={[
          //         styles.menuText,
          //         isActive == 'services' && styles.activeMenuText
          //       ]}
          //     >
          //       SERVICES
          //     </Text>
          //   </View>
          // </TouchableHighlight>

          // <TouchableHighlight
          //   underlayColor='#efefef'
          //   style={styles.itemBox}
          //   onPress={ this._handleClickDashboard.bind(this) }>
          //   <View style={styles.itemBox}>
          //     {
          //       (() => {
          //         if (isActive == 'dashboard') {
          //           return (
          //             <View style={styles.activeItem} />
          //           )
          //         }
          //       })()
          //     }
          //     <Text
          //       style={[
          //         styles.menuText,
          //         isActive == 'dashboard' && styles.activeMenuText
          //       ]}
          //     >
          //       DASHBOARD
          //     </Text>
          //   </View>
          // </TouchableHighlight>

          // <TouchableHighlight
          //   underlayColor='#efefef'
          //   style={styles.itemBox}
          //   onPress={ this._handleClickProfile.bind(this) }>
          //   <View style={styles.itemBox}>
          //     {
          //       (() => {
          //         if (isActive == 'profile') {
          //           return (
          //             <View style={styles.activeItem} />
          //           )
          //         }
          //       })()
          //     }
          //     <Text
          //       style={[
          //         styles.menuText,
          //         isActive == 'profile' && styles.activeMenuText
          //       ]}
          //     >
          //       PROFILE
          //     </Text>
          //   </View>
          // </TouchableHighlight>

          // <TouchableHighlight
          //   underlayColor='#efefef'
          //   style={styles.itemBox}
          //   onPress={ this._handleClickNewHealthy.bind(this) }>
          //   <View style={styles.itemBox}>
          //     {
          //       (() => {
          //         if (isActive == 'newHealthy') {
          //           return (
          //             <View style={styles.activeItem} />
          //           )
          //         }
          //       })()
          //     }
          //     <Text
          //       style={[
          //         styles.menuText,
          //         isActive == 'newHealthy' && styles.activeMenuText
          //       ]}
          //     >
          //       NEW HEALTHY
          //     </Text>
          //   </View>
          // </TouchableHighlight>
          }
          <TouchableHighlight
            style={styles.itemBox}
            onPress={this.logout.bind(this)}
          >
            <Text style={styles.menuText}>LOG OUT</Text>
          </TouchableHighlight>
        </View>
        <AlertDialog
          modalVisible={this.state.visible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
              visible: false,
            });
          }}
          dlTitle={{
            component: <AlertDeleteDlTitle
              text='Appel en cours...'
            />
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText="Un appel a éte planifier "
              highlightText=''
              behindText=''
            />
          }}
          dismissBtn={{
            text: 'Lancer',
            onPress: () => { 
              Linking.openURL(this.state.link); 
            },
          }}
          acceptBtn={{
            text: 'Annuler',
            onPress: () => {this.setState({visible: false}); Vibration.cancel() },
          }}
        />      
      </View>
    );
  }

  // PRIVATE

  async logout(){
    await _storeData("");
    this.props.navigation.navigate('IntroOneScreen');
  }
  _handleClickHome() {
    this.setState({isActive:'home'});
    this.props.navigation.navigate('MainServiceScreen');
    this.props.drawer.close()
  }

  _handleClickDrug() {
    this.setState({isActive:'drug'});
    this.props.navigation.navigate('DoctorReviewScreen', {id: this.props.data.personne.id});
    this.props.drawer.close()
  }

  _handleClickDoctors() { 
    this.setState({isActive:'doctors'});
    this.props.navigation.navigate('InsurranceScreen', {toActivites: this.props.data.diagnostiques});
    this.props.drawer.close()
  }
  _handleClickLocal() { 
    this.setState({isActive:'localisation'});
    this.props.navigation.navigate('MapScreen', {medecin: this.props.data.medecins});
    this.props.drawer.close()
  }

  _handleClickDashboard() {
    this.setState({isActive:'dashboard'});
    this.props.navigation.navigate('DashboardTestIndicatorsScreen');
    this.props.drawer.close()
  }

  _handleClickProfile() {
    this.setState({isActive:'profile'});
    this.props.navigation.navigate('UserProfileScreen');
    this.props.drawer.close()
  }

  _handleClickServices() {
    this.setState({isActive:'services'});
    this.props.drawer.close()
  }

  _handleClickNewHealthy() {
    this.setState({isActive:'newHealthy'});
    this.props.navigation.navigate('HealerBlogsScreen');
    this.props.drawer.close()
  }
}

const ELEMENT_HEIGHT = 530;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth - 70,
    backgroundColor: '#fff',
  },
  userInfo: {
    height: 130,
    marginTop: spaceHeight * 0.46, 
    marginBottom: spaceHeight * 0.35, 
    paddingLeft: 30,
    paddingRight: 30,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 200,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 0.1 
      },
      android: {
        elevation: 12,
      },
    }),
  },
  name: {
    marginTop: 15,
    marginBottom: 5,
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
  },
  balance: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  menu: {
    height: 400,
  },
  itemBox: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
  },
  activeItem: {
    width: 5,
    height: 45,
    marginLeft: 0.2,
    backgroundColor: 'rgb(75,102,234)',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1 
      },
      android: {
        elevation: 12,
      },
    }),
  }, 
  menuText: {
    marginLeft: 30,
    color: 'rgb(150,150,150)',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  activeMenuText: {
    color: 'rgb(130,160,246)',
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);


