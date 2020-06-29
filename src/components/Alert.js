import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import Swipeout from 'react-native-swipeout';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontFamily,
  fontSize,
} from '../styles/variables';
import AlertDialog from '../elements/AlertDialog';
import SwipeoutButton from './SwipeoutButton';
import AlertDeleteDlMessage from './list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from './list-item/AlertDeleteDlTitle';
import MoreModal from './list-item/MoreModal';

export default class Alert extends Component {
  

  render() {
    return (
      <View>
        <AlertDialog
          modalVisible={this.props.lisible}
          onRequestClose={this.props.show(false)}
          dlTitle={{
            component: <AlertDeleteDlTitle
              text='Sauvgarde'
            />
          }}
          dlMessage={{
            component: <AlertDeleteDlMessage
              frontText="Faut-il vraiment ajouter "//this.props.text1
              highlightText='cet activité dans '//this.props.text2
              behindText='votre liste?'
            />
          }}
          dismissBtn={{
            text: 'Non',
            onPress: () => { this.props.show(false)},
          }}
          acceptBtn={{
            text: 'Oui',
            onPress: () => {this.props.show(false, true)},
          }}
        />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
  },
  right: {
    width: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  leftAva: {
    position: 'relative',
    width: 70,
    height: 70
  },
  leftInfo: {
    paddingLeft: 15,
  },
  header: {
    marginTop: -5,
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
  },
  subText: {
    color: colors.lightgrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    lineHeight: 23,
  },
  leftBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 23
  },
  leftBottomTxt: {
    paddingLeft: 6,
    color: colors.grey,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  ranking: {
    marginTop: -5,
    marginLeft: 5,
    fontSize: fontSize.header,
    color: colors.darkSkyBlue,
    fontFamily: fontFamily.regular,
  },
  specialCir: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 200,
  },
  moreBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

Alert.propTypes = {
  imageUrl: PropTypes.number,
  itemTitle: PropTypes.string,
  careerText: PropTypes.string,
  distanceText: PropTypes.number,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  onPressButton: PropTypes.func,
  isSpecial: PropTypes.bool,
};
 