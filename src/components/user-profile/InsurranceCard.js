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
import Icon from 'react-native-vector-icons/Entypo';

export default class InsurranceCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPressEditBtn } = this.props;
    return (
      <PrimePanel
        isCircleBtn={true}
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
        <Image
          source={this.props.image}
          style={{
            width: this.props.imageWidth,
            height: this.props.imageHeight,
            marginRight: 10
          }}
        />
        <Text style={[
          CommonStyles.itemHeaderText,
          CommonStyles.greyColor,
          CommonStyles.mediumBold,
        ]}>
          {this.props.header}
        </Text>
      </View>
    );
  }
  renderIcon = (arg) =>{
    if(arg){
        return(
          <Icon
            style={{fontSize: 20, textAlign: 'left'}}
            name="check"
            color="#008A00"
          />
        )
      }
      else{
        return(
          <Icon
            style={{fontSize: 20, textAlign: 'left'}}
            name="circle-with-cross"
            color="#C75050"
          />
        )
      }
  }
  renderBody() {
    return (
      <View style={styles.panelBody}>
        <View style={styles.leftItem}>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.toux)}
             {"      "}
            Toux 
              
          </Text>

          <Text style={styles.label}>
            {this.renderIcon(this.props.item.rhume)}
             {"      "}
            Rhume
          </Text>
          <Text style={styles.label}>
          {this.renderIcon(this.props.item.diarrhee)}
            {"      "} Diarrhée
          </Text>
          <Text style={styles.label}>
          {this.renderIcon(this.props.item.podorat)}
            {"      "} Odorat
          </Text>
          <Text style={styles.label}>
          {this.renderIcon(this.props.item.mautete)}
            {"      "} Tete
          </Text>
          <Text style={styles.label}>
          {this.renderIcon(this.props.item.fievresup)}
            {"      "} Fievre
          </Text>
          <Text style={styles.label}>
          {this.renderIcon(this.props.item.maugorge)}
            {"      "} Gorge
          </Text>
        </View>

        <View style={styles.rightItem}>
           <Text style={styles.label}>
            {this.renderIcon(this.props.item.generespiratiore)}
            {"  "} Gene
          </Text>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.fatigue)}
            {"  "} Fatigue
          </Text>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.coubaturemusc)}
            {"  "} Courbature
          </Text>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.etatetrange)}
            {"  "} Etranger
          </Text>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.voyage)}
            {"  "} Voyager
          </Text>
          <Text style={styles.label}>
            {this.renderIcon(this.props.item.contact)}
            {"  "} Contact
          </Text>
          <Text style={styles.label}>
            Température:
          </Text>
          <Text style={styles.value}>
            {this.props.item.fievre} 
          </Text>
        </View>
      {/*
        <View style={styles.leftItem}>
          <Text style={styles.label}>
            Enrollee ID
          </Text>
          <Text style={styles.value}>
            {this.props.code}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.label}>
            Group #
          </Text>
          <Text style={styles.value}>
            {this.props.group}
          </Text>
        </View>
        <View style={[styles.leftItem, {marginBottom: 0}]}>
          <Text style={styles.label}>
            Date Effective
          </Text>
          <Text style={styles.value}>
            {this.props.date}
          </Text>
        </View>
        <View style={[styles.rightItem, {marginBottom: 0}]}>
          <Text style={styles.label}>
            Plan
          </Text>
          <Text style={styles.value}>
            {this.props.plan}
          </Text>
        </View>
        <View style={[styles.leftItem, {marginBottom: 0}]}>
          <Icon
                style={{fontSize: 20, textAlign: 'left'}}
                name="circle-with-cross"
                color="#C75050"
              />
              <Icon
                style={{fontSize: 20, textAlign: 'left'}}
                name="check"
                color="#008A00"
              />
        </View>
      */}
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
    width: (deviceWidth -40) /2,
    marginBottom: 10,
  },
  rightItem: {
    width: (deviceWidth - 100) /2,
    marginBottom: 10,
  },
  label: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  value: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fontFamily.regular,
    ...Platform.select({
      android: {
        lineHeight: 23
      },
    }),
  },
});
