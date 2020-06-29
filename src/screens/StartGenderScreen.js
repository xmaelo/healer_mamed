import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, PickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScrollPicker from '../elements/ScrollPicker';
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar'; 
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, shadowOpt, blueGradient } from '../styles/variables';
import StartWeightScreen from './StartWeightScreen';
import { showMessage, hideMessage } from "react-native-flash-message";
import { onRegister } from "./statefull/appStatefull";

class StartGenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderIndex: 'MASCULIN',
      gender: "",
      location: null,
      errorMessage: "",

    };
  } 
  async componentDidMount() {
  }
 
  messageWithPosition (position = "bottom",  extra = {}) {
    let message = {
      message: "Mamed a besoin du service de oclisation pour fontionner.",
      type: "default",
      position,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message);
  }
  showMessage2 (position = "bottom",  extra = {}) {
    let message = {
      message: "Enregistrement Encours...",
      type: "default",
      position, 
      autoHide: false,
      // animationDuration: 1000, 
      icon: { icon: "auto", position: "left" },
      duration: 6000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message);
  }

  onGenderSelected(index) {
  }

  render() {
    const genders = ['FEMININ', 'MASCULIN'];
    const PickerItemIOS = PickerIOS.Item;
    const scrollHeight = 330;

    return (
      <View style={CommonStyles.normalPage}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
          rightChildren={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._handleClickNext.bind(this)}
            >{
              // <Text header softBlue regular>Saut</Text>
            }
            </TouchableOpacity>
          }
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>Votre Sexe</Text>
        </View>
        <View style={CommonStyles.pickerBox}>
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={genders}
            selectedIndex={0}
            itemHeight={50}
            wrapperHeight={scrollHeight}
            highlightColor={'#000000'}
            renderItem={(data, index, isSelected) => {
              return (
                <Text
                  style={
                    isSelected ? [CommonStyles.itemText, CommonStyles.itemTextSelected] : CommonStyles.itemText
                  }
                >
                  {data}
                </Text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
               console.log('datat', data)
                this.setState({gender: data})
            }}
          />
        </View>
        <View style={styles.buttonBox}>
          <GradientButton
            onPressButton={this._handleClickNext.bind(this)}
            setting={shadowOpt}
            btnText="Finaliser"
          />
        </View>
      </View>
    );
  }

  _handleClickNext() {
    this.onRegister();
    return;
    const screen = StartWeightScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    // this.props.navigation.navigate('StartWeightScreen', {}, action);
  }
  onRegister = async() =>{
    console.log('this.props', this.props)
    let globalObj = {
      latitude: this.props.location.coords.latitude,
      longitude: this.props.location.coords.longitude,
      sexe: this.state.gender,
      ...this.props.infos, 
      ...this.props.nameOb,
      date: this.props.date,
    } 
    this.showMessage2();
    let dat = await onRegister(globalObj);
    console.log('globalObj', globalObj)
  }
}


const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
});


const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    setDateToState: async (infos) => {
      dispatch({type: "SET_DATE", date: infos});
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(StartGenderScreen);