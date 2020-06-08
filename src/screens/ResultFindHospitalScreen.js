import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import ListItem from '../components/ListItem'; 

export default class ResultFindHospitalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalsList: [
        {
          id: 0,
          image: {
            url: require('../../img/person/logoHospital_1.png'),
            width: 60,
            height: 60,
          },
          name: 'Health Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 1,
          image: {
            url: require('../../img/person/logoHospital_2.png'),
            width: 60,
            height: 59,
          },
          name: 'Medical Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 2,
          image: {
            url: require('../../img/person/logoHospital_3.png'),
            width: 60,
            height: 60.5,
          },
          name: 'Healer Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 3,
          image: {
            url: require('../../img/person/logoHospital_4.png'),
            width: 60.5,
            height: 60,
          },
          name: 'Medic Heart',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 4,
          image: {
            url: require('../../img/person/logoHospital_1.png'),
            width: 60,
            height: 60,
          },
          name: 'Healthy Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
      ]
    }
  }

  render() {
    console.log('this.props', this.props.navigation.state.params)
    const list = this.state.hospitalsList;
    const toCentres = this.props.navigation.state.params.toCentres;
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Centres'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.result}>
              <Text medium lightGrey regular>
                <Text black mediumBold>{toCentres.length} </Text>
                 hospitals 
                <Text> Trouvés </Text>
              </Text>
            </View>
            <View style={styles.resultList}>
              {
                toCentres.map((item, index) => (
                  <ListItem
                    key={index}
                    image={{
                      url: list[Math.floor(Math.random() * Math.floor(4))].image.url,
                      width: list[Math.floor(Math.random() * Math.floor(4))].image.width,
                      height: list[Math.floor(Math.random() * Math.floor(4))].image.height
                    }}
                    source={true}
                    header={item.nom}
                    subText={item.email}
                    bottomText={item.region.nom}
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  result: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  resultList: {
    flex: 1,
  }
});
