import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { colors, fontSize, fontFamily } from '../styles/variables';
import { connect } from 'react-redux'
import { listSuivie, aceptSuivie } from "./statefull/appStatefull";

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    }
  }
  async componentDidMount() {
    this.init();
  }
  init = async () => {
    let list = await listSuivie(this.props.data.personne.id)
    console.log('list list list', list);
    this.setState({list: list})
  }

  confirmNotif = async(id) => {
    await aceptSuivie(id);
    console.log('confirmNotif')
    this.init();
  }

  render() {
    const smallShadowOpt = {
      btnWidth: 125,
      btnHeight: 35,
      shadowHeight: 65,
      fontSize: 15,
    }

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Notification'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
            <View style={CommonStyles.wrapperBox}>
            {this.state.list && this.state.list.map((list, index) => {
              // true && [1].map((list, index) => {
              return(
                <View style={[CommonStyles.itemWhiteBox,styles.card]} key={index}>
                  <View style={styles.left}>
                    <Image
                      source={require('../../img/person/pixta21931547M.png')}
                      style={{width: 30, height: 30}}
                    />
                  </View>
                  <View style={styles.right}>
                    <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                      Dr.Alexander 
                    </Text>
                    <GradientButton
                      onPressButton={()=> this.confirmNotif(1)}
                      setting={smallShadowOpt}
                      btnText="Acepter"
                    />
                  </View>
                </View>
             )})}
            {this.state.list && this.state.list.length == 0 &&
              <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27, textAlign: "center"}}>
                Aucune nouvelle notifications
              </Text> 
            }
            </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickReply() {
     this.props.navigation.navigate('ChatScreen');
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(NotificationScreen)

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: 'row',
    width: 44,
  },
  right: {
    flex: 1,
  },
});
