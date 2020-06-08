import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';
import PrimePanel from '../../elements/PrimePanel';

export default class InsurranceCard1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPressEditBtn } = this.props;
    return (
      <PrimePanel
        isCircleBtn={false}
        header={this.renderHeader()}
        body={this.renderBody()}
        circleContainerStyle={{
          top: 20, 
          right: 15,
        }} 
        circleBtn={{
          imageUrl: require('../../../img/healer/pencil1.png'),
          width: 50,
          height: 55 
        }}
      />
    );
  }

  renderHeader() {
    return (
      <View style={styles.panelHeader}>
        {
          // <Image
          //   source={this.props.image}
          //   style={{
          //     width: this.props.imageWidth,
          //     height: this.props.imageHeight,
          //     marginRight: 10
          //   }}
          // />
        }
        <Text style={[
          CommonStyles.itemHeaderText,
          CommonStyles.greyColor,
          CommonStyles.mediumBold,
        ]}>
          {"Informations personnelles"}
        </Text>
      </View>
    );
  }

  renderBody() {
    let item = this.props.item.personne
    return (
      <View style={styles.panelBody}>
        <View >
          <Text style={styles.label}>
            Tel:
          </Text>
          <Text style={styles.value}>
            {item.telephone} / {item.telephone2}
          </Text>
        </View>
        <View >
          <Text style={styles.label}>
            Naissance:
          </Text>
          <Text style={styles.value}>
            {item.datenaiss}
          </Text>
        </View>
        <View >
          <Text style={styles.label}>
            Adresse
          </Text>
          <Text style={styles.value}>
            {item.adresse}
          </Text>
        </View>
        <View style={[styles.leftItem, {marginBottom: 0}]}>
          <Text style={styles.label}>
            Genre:
          </Text>
          <Text style={styles.value}>
            {item.sexe}
          </Text>
        </View>
        <View >
          <Text style={styles.label}>
            Lieu de Naissance
          </Text>
          <Text style={styles.value}>
            {item.lieunaiss}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
          {"      "}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
            Contact d'urgence
          </Text>
          <Text style={styles.value}>
            {this.props.item.nom_contact_urgence}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
          {"            "}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
            Tel d'urgence
          </Text>
          <Text style={styles.value}>
            {this.props.item.telephone_contact_urgence}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(243,246,254)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  panelBody: {
    width: deviceWidth - 30, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftItem: {
    width: (deviceWidth + deviceWidth) /2,
    marginBottom: 10,
  },
  rightItem: {
    width: (deviceWidth - 180) /2,
    marginBottom: 10,
  },
  label: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  value: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fontFamily.regular,
    ...Platform.select({
      android: {
        lineHeight: 23
      },
    }),
  },
});
