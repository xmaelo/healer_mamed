import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import InsurranceCard from '../components/user-profile/InsurranceCard';
import { connect } from 'react-redux'

class InsurranceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurranceList: [
        {
          id: 0,
          insurranceTitle: 'Personal Insurrance',
          image: require('../../img/person/logoHospital_2.png'),
          imageWidth: 30.5,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'VMH9231458760',
          group: '24-789',
          date: '09/2019',
          plan: 'Pro',
        },
        {
          id: 1,
          insurranceTitle: 'Life Insurrance',
          image: require('../../img/person/logoHospital_1.png'),
          imageWidth: 30,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'HL1231416845',
          group: '25-146',
          date: '11/2072',
          plan: 'Pro',
        },
        {
          id: 2,
          insurranceTitle: 'Family Insurrance',
          image: require('../../img/person/logoHospital_4.png'),
          imageWidth: 30,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'VMH9231458760',
          group: '24-789',
          date: '09/2019',
          plan: 'Pro',
        },
      ]
    }
  }

  render() {
    console.log('this.props insuren', this.props.navigation.state.params)
    let toActivites = this.props.navigation.state.params.toActivites
    toActivites = this.props.data.diagnostiques;
    const list = this.state.insurranceList;
    let date = Date();
    let tDate = new Date(date).toLocaleDateString('fr-CA') +' '+ new Date(date).getHours()+':' +new Date(date).getMinutes();
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Activités' 
          rightButtons={
            [ 
              {
                key: 1,
                buttonIcon: require('../../img/healer/add.png'),
                buttonAction: this._handleClickAddButton.bind(this),
                buttonWidth: 20,
                buttonHeight: 20,
              },
            ] 
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}> 
            {
              toActivites.reverse().map((item, index) => (
                <InsurranceCard
                  key={index}
                  header={item.datesave ? item.datesave : tDate}
                  image={list[Math.floor(Math.random() * Math.floor(3))].image}
                  imageWidth={list[Math.floor(Math.random() * Math.floor(3))].imageWidth}
                  imageHeight={list[Math.floor(Math.random() * Math.floor(3))].imageHeight}
                  item={item}
                  // name={item.name}
                  // code={item.code}
                  // group={item.group}
                  // date={item.date}
                  // plan={item.plan}
                />
              ))
            }
          </View>
        </ScrollView>
        <TouchableHighlight
          underlayColor={'transparent'}
          style={styles.addBtn}
          onPress={this._handleClickAddButton.bind(this)}
          >
          <Image
            source={require('../../img/healer/icAdd.png')}
            style={{width: 70, height: 75}}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _handleClickAddButton() {
    this.props.navigation.navigate("AddActiviteesScreen");
  }
}

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 3,
    right: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 12,
      },
    }),
  },
});



const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(InsurranceScreen);
