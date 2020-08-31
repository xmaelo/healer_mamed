import React, { Component } from 'react';
import * as Font from 'expo-font';
//import { Provider } from "mobx-react";
import { Dimensions, StatusBar, View, Platform, AppRegistry, Alert  } from 'react-native';
import { createNavigator, createAppContainer, addNavigationHelpers } from 'react-navigation';
//import stores from "./mobx" 
import ScalingDrawer from './elements/ScalingDrawer';
import { _retrieveData } from "./screens/statefull/storeLocalStorage";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Progress from 'react-native-progress';
import LeftMenu from './components/LeftMenu';
import HealerRouter from './routes/IntroStack'; 
import { Provider } from 'react-redux'
import app from './reducer/appStore'
import FlashMessage from "react-native-flash-message";
import { connect } from 'react-redux'
 
const {width, height} = Dimensions.get('window');

const defaultScalingDrawerConfig = {
  scalingFactor: 0.8,
  minimizeFactor: 0.7,
  swipeOffset: 0 
};

class CustomDrawerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      open: false,
    }
  }
 
  async componentDidMount() {
    //console.log('this?props.init componenet', this.props)
    await Font.loadAsync({
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
    });
    let data = await _retrieveData();
    await this._getLocationAsync();
    if(data){
      this.setState({ fontLoaded: true, open: true });  
      console.log('data _retrieveData', data)
      await this.props.publishJournal(data)
      this.props.navigation.navigate("MainServiceScreen");
    }else{
      this.setState({ fontLoaded: true, open: false });  
    }
  }

   createThreeButtonAlert = () =>
    Alert.alert(
      "Permissions Refusée",
      "maMED a besoin de la localisation pour fonctionner correctement",
      [
        {
          text: "Réessayer",
          onPress: () => {console.log("Ask me later pressed"); this._getLocationAsync()}
        }
      ], 
      { cancelable: false }
    );

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      this.createThreeButtonAlert()

      console.log('permission denied');
      //this.messageWithPosition()
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log('location location', location)
    let region = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.015, 
                  longitudeDelta: 0.0121,
                }
    await this.props.setLocalisation({region: region, location: location})
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    /** Active Drawer Swipe **/
    if (nextProps.navigation.state.index === 0)
      //this._drawer.blockSwipeAbleDrawer(false);

    if ( 
      nextProps.navigation.state.index === 0
      && this.props.navigation.state.index === 0
    ) {
     // this._drawer.blockSwipeAbleDrawer(false);
      //this._drawer.close();
    }

    /** Block Drawer Swipe **/
    if (nextProps.navigation.state.index > 0) {
      this._drawer.blockSwipeAbleDrawer(true);
    }
  }

  render() {
    if (this.state.fontLoaded === false) {
      return (
        <View>
          <Progress.Circle size={30} indeterminate={true} />
        </View>
      )
    }

    const { routes, index } = this.props.navigation.state;
    const ActiveScreen = HealerRouter.getComponentForState(this.props.navigation.state);
    console.log('ActiveScreen',ActiveScreen)
    console.log('this.props.navigation',  this.props.navigation)
    let data =  _retrieveData();
      return (
          <ScalingDrawer
            ref={ref => this._drawer = ref}
            content={ <LeftMenu drawer={this._drawer} navigation={this.props.navigation} /> }
            {...defaultScalingDrawerConfig}
          >
            <StatusBar backgroundColor={'transparent'} translucent />
            <View style={{ flex: 1, height: height }}>
              <ActiveScreen 
                navigation={{
                  ...this.props.navigation,
                  state: routes[index],
                  openDrawer: () => this._drawer.open(),
                  closeDrawer: () => this._drawer.close(),
                }}
              />
            </View>
          </ScalingDrawer>
      )
  }
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    publishJournal: async (data) => {  
      dispatch({type: "PUBLISH_JOURNAL", data: data});
    },
    setLocalisation: async (data) => {
      dispatch({type: 'SET_LOCALISATION', data: data})
    }
  };
}
const Connect = connect(mapStateToProps, mapDispatchToProps)(CustomDrawerView);
const AppNavigator = createNavigator((Connect), HealerRouter, {});
const AppContainer = createAppContainer(AppNavigator);

class App extends Component{

  componentDidMount() {
    
  }
  render() {
    return (
      <Provider store={app}>
        <AppContainer />
        <FlashMessage position="top" animated={true} />
      </Provider>
    )
  };
}



export default App;

