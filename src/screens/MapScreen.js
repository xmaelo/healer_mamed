import React, { Component } from 'react';
import { View, StyleSheet, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';
import  MapView  from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { deviceWidth, deviceHeight, NAV_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';
import { connect } from 'react-redux'
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import MapCard from '../components/MapCard';

// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
 
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      region: null,
      doctorsList: [
        {
          id: 0,
          image: require('../../img/person/profil2.jpg'),
          name: 'Mon medecin',
          career: 'Cardiologist',
          ranking: 4.2,
          isSpecial: true
        },
        // {
        //   id: 1,
        //   image: require('../../img/person/pixta19279319M.png'),
        //   name: 'Fannie Larson',
        //   career: 'Gynecological',
        //   ranking: 4.2,
        //   isSpecial: true
        // },
        // {
        //   id: 2,
        //   image: require('../../img/person/pixta14912862M.png'),
        //   name: 'May Hampton',
        //   career: 'Cardiologist',
        //   ranking: 4.2,
        //   isSpecial: true
        // },
        // {
        //   id: 3,
        //   image: require('../../img/person/pixta19791094M.png'),
        //   name: 'Jose Holland',
        //   career: 'Pediatrician',
        //   ranking: 4.2,
        //   isSpecial: false
        // },
      ],
      markers: [
        {
          id: 0,
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        },
        {
          id: 1,
          latlng: {
            latitude: 38.78825,
            longitude: -123.4324,
          }
        },
      ]
    }
  }

  async componentDidMount() {
    //this._getLocationAsync();
  }


  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });

  //     console.log('permission denied');
  //     this.messageWithPosition()
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log('location location', location)
  //   let region = {
  //                 latitude: location.coords.latitude,
  //                 longitude: location.coords.longitude,
  //                 latitudeDelta: 0.015, 
  //                 longitudeDelta: 0.0121,
  //               }
  //   this.setState({location: location, region: region});
  // };

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Carte'
        />
        <View style={CommonStyles.noTabScrollView}>
          <View style ={styles.container}>
            {this.props.region ?
              <MapView
                style={styles.map}
                region={this.props.region}
              >
                {
                  this.state.markers.map((marker,index) => (
                    <MapView.Marker
                      key={marker.id}
                      coordinate={marker.latlng}
                      image={require('../../img/person/pixta21931547M.png')}
                    />
                  ))
                } 
              </MapView> : null
            }
            <View style={styles.info}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  this.state.doctorsList.map((item, index) => (
                    <MapCard
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      career={item.career}
                      ranking={item.ranking}
                      isSpecial={item.isSpecial}
                    />
                  ))
                }
              </ScrollView>
            </View>
            <TouchableHighlight
              underlayColor={'transparent'}
              style={styles.circleBtn}>
              <View>
                <Image
                  source={require('../../img/healer/blueEsclip.png')}
                  style={{alignItems: 'center', width: 70, height: 75}}
                />
                <Image
                    source={require('../../img/healer/whitePlaceholder.png')}
                    style={{width: 21.5, height: 26, marginTop: 18}}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  info: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 85,
      },
      android: {
        bottom: 95,
      },
    }),
  },
  circleBtn: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 60,
      },
      android: {
        bottom: 70,
      },
    }),
    right: 15,
  }
});

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MapScreen);