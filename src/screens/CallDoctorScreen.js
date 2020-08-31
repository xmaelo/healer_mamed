import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  StatusBar,
  Vibration, 
  Linking,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../elements/Text';
 
import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight, 
  blueGradient,
  colors
} from '../styles/variables';

export default class CallDoctorScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const ONE_SECOND_IN_MS = 500;
    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS
    ];
    Vibration.vibrate(PATTERN, true);
  }

  render() {
    return (
      <View style={[CommonStyles.normalPage, {alignItems: 'center'}]}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor={colors.softBlue}
        />
        <View style={styles.textCont}>
          <Text grey regular style={{marginBottom: 8, fontSize: 24}}>
            Appel en cours...
          </Text>
          <Text header black semiBold>Dr. Nguefack Maurice</Text>
        </View>
        <View style={styles.parentCir}>
          <View style={styles.childCir}> 
            <Image
              source={require('../../img/person/doc_portrait.png')}
              style={{width: 160, height: 184}}
            />
          </View>
        </View>
          <View>
            <Image
              source={require('../../img/healer/log.png')}
              style={{width: 160, height: 84}}
            />
          </View>
        <View
          style={styles.buttonBox}
          >
          <View style={styles.panelBody}> 
              <TouchableOpacity 
                onPress={this._handleClickEndCallButton.bind(this)}
                style={styles.buttonBox} 
              >
                <View style={[styles.leftItem]}>
                    <Image
                      source={require('../../img/healer/icCall.png')}
                      style={{alignItems: 'center', width: 85, height: 90}}
                    /> 
                </View>
              </TouchableOpacity >
              <TouchableOpacity
                style={styles.buttonBox}
                onPress={()=>Linking.openURL(this.props.navigation.state.params.link)}
              >
                <View style={styles.rightItem}>
                  <Image
                    source={require('../../img/healer/esclip.png')}
                    style={{alignItems: 'center', width: 85, height: 90}}
                  />
                </View>
              </TouchableOpacity >
          </View>
        </View>
      </View>
    );
  }

  _handleClickEndCallButton() {
    Vibration.cancel()
    this.props.navigation.goBack(null);
  }
}

const ELEMENT_HEIGHT = 365;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  textCont: {
    alignItems: 'center',
    marginTop: spaceHeight * 0.2,
  },
  parentCir: {
    height: 230,
    width: 230,
    marginTop: spaceHeight * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(229,229,229)',
    borderRadius: 200
  },
  panelBody: {
    width: deviceWidth - 30, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 85
  },
  childCir: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    borderWidth: 1,
    borderColor: 'rgb(229,229,229)',
    borderRadius: 200
  },
  leftItem: {
    width: (deviceWidth -130) /2,
    marginBottom: 10,
  },
  rightItem: {
    width: (deviceWidth - 100) /2,
    marginBottom: 10,
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  }
});
