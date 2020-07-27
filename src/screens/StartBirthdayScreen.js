import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, PickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';
import ScrollPicker from '../elements/ScrollPicker';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import { connect } from 'react-redux';
import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, shadowOpt, blueGradient } from '../styles/variables';
import StartGenderScreen from './StartGenderScreen';

class StartBirthdayScreen extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      monthIndex: 'JANUARY',
      dayIndex: 1,
      yearIndex: 1970,
      day: "",
      year: "",
      month: ""
    };
  }

  onMonthSelected(index) {
    console.log('mount mount', index)
  }

  onDaySelected(index) {
    console.log('day day', index)
  }

  onYearSelected(index) {
    console.log('year year', index)
  }

  render() {
    let days = [];
    for(let i = 1; i <= 31; i++) {
      days.push(i.toString());
    }

    let years = [];
    for(let i = 1900; i <= 2017; i++) {
      years.push(i.toString());
    }

    let months = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER'
    ];

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
              //<Text header softBlue regular>Saut</Text>
            }
            </TouchableOpacity>
          }
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>Votre date de naissance</Text>
        </View>
        <View style={CommonStyles.pickerBox}>
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={months}
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
              console.log('chang month',data, selectedIndex)
              this.setState({month: data})
            }}
          />
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={days}
            selectedIndex={0}
            itemHeight={50}
            wrapperHeight={scrollHeight}
            highlightColor={'#000000'}
            renderitem={(data, index, isselected) => {
              return (
                <text
                  style={
                    isselected ? [commonstyles.itemtext, commonstyles.itemtextselected] : commonstyles.itemtext
                  }
                >
                  {data}
                </text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
                console.log('chang day',data, selectedIndex)
                this.setState({day: data})
            }}
          />
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={years}
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
                console.log('chang year',data, selectedIndex)
                this.setState({year: data})
            }}
          />
        </View>
        <View style={styles.buttonBox}>
          <GradientButton
            onPressButton={this._handleClickNext.bind(this)}
            setting={shadowOpt}
            btnText="Continuer"
          />
        </View>
      </View>
    );
  }
 
  _handleClickNext() {
    let strToDate = this.state.month+' '+this.state.day+', '+this.state.year;
    const toDate = new Date(strToDate);
    console.log('date', toDate, strToDate)
    // return;
    this.props.setDateToState(toDate);
    const screen = StartGenderScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('StartGenderScreen', {}, action);
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
export default connect(mapStateToProps, mapDispatchToProps)(StartBirthdayScreen);