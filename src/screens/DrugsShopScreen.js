import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableHighlight, Linking } from 'react-native';
import { Tabs } from 'native-base';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, NAV_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';

export default class DrugsShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugsShopList: [
        {
          id: 0,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '29.00',
        },
        {
          id: 1,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '38.00',
        },
        {
          id: 2,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '47.00',
        },
        {
          id: 3,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '56.00',
        },
        {
          id: 4,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '29.00',
        },
        {
          id: 5,
          drugImage: require('../../img/person/mockUp.png'),
          drugName: 'Healer Drugs',
          price: '38.00',
        },
      ]
    }
  }

  render() {
    const words = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'L'];
    const tabContent = words.map((word, index) =>
        <ScrollView key={index} heading={word}></ScrollView>
    );
    const toFichiers = this.props.navigation.state.params.toFichiers;
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Rapports & Résutats'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/search.png'),
                buttonAction: this._handleClickSearchButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              },
              {
                key: 2,
                buttonIcon: require('../../img/healer/shoppingBag.png'),
                buttonAction: this._handleClickShoppingBagButton.bind(this),
                buttonWidth: 17,
                buttonHeight: 22,
              },
            ]
          }
        />
        <Tabs
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{
            backgroundColor: 'rgb(75,102,234)'
          }}
          tabBarBackgroundColor={'#fff'}
          tabBarActiveTextColor={'rgb(75,102,234)'}
          tabBarInactiveTextColor={'rgb(105,105,105)'}
          tabBarTextStyle={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15 
          }}
        >
          <ScrollView heading='Liste de Rapports'>
            <View style={CommonStyles.wrapperBox}>
              <View style={styles.container}>
                {
                  toFichiers.map((item, index) => (
                    <Item
                      key={index}
                      drugImage={
                              ["png", "jpg", "jpeg", "jpeg"].includes(item.fichier.split('.')[1]) ? 
                              { uri: "https://covid.mamed.care/web/uploads/images/rapports/"+item.fichier}
                              : ["pdf"].includes(item.fichier.split('.')[1]) ?
                              { uri: "https://covid.mamed.care/web/uploads/images/rapports/default-pdf.jpeg"}
                              : ["odt"].includes(item.fichier.split('.')[1]) ?
                              { uri: "https://covid.mamed.care/web/uploads/images/rapports/default-word.png"}
                              : null
                            }
                      drugName={"hdhd"}
                      price={"hhd"}
                      onPressItem={async()=>{
                          console.log("before open Image");
                          let base = "https://covid.mamed.care/web/uploads/images/rapports/";
                          const supported = await Linking.canOpenURL(base+item.fichier);
                          await Linking.openURL(base+item.fichier);
                        }
                      }
                    />
                  ))
                }
              </View>
            </View>
          </ScrollView>
        </Tabs>
      </View>
    );
  }

  _handleClickShoppingBagButton() {
    // TODO: Click shoppingBag button
    this.props.navigation.navigate('CartScreen');
  }

  _handleClickSearchButton() {
    // TODO: Click search button
  }

  _handleClickListDrugsShopItem() {
    this.props.navigation.navigate('DrugsShopDetailScreen');
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      drugImage,
      drugName,
      price,
      onPressItem,
    } = this.props;

    return (
      <View style={styles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={onPressItem}>
          <View style={styles.list}>
            <Image
              source={drugImage}
              style={{width: 115, height: 115, marginBottom: 5}}
            />
            <Text header darkSkyBlue regular>Ouvrir</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 7.5,
  },
  itemWhiteBox: {
    width: (deviceWidth - 45) / 2,
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    borderRadius: 8,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 4,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1 
      },
      android: {
        elevation: 6,
      },
    }),
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
}) 
