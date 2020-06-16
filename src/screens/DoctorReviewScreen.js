import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import Icon from 'react-native-vector-icons/Entypo';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, shadowOpt, colors, fontSize, fontFamily } from '../styles/variables';
import { getAllMessages, baseUri } from "./statefull/appStatefull";
import { showMessage, hideMessage } from "react-native-flash-message";

class DoctorReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      reviewsList: [
        {
          id: 0,
          avatar: require('../../img/person/oval_1.png'),
          name: 'Jesse Ryan',
          birthDate: '08-31-2016',
          comment: 'I know how terrible it can be '
        },
        {
          id: 1,
          avatar: require('../../img/person/oval_5.png'),
          name: 'Issac Jones',
          birthDate: '02-25-2016',
          comment: 'I know how terrible it '
        },
        {
          id: 2,
          avatar: require('../../img/person/oval_6.png'),
          name: 'James Hicks',
          birthDate: '06-27-2016',
          comment: 'I know how terrible it c'
        },
      ]
    }
  } 

  async componentDidMount (){ 
    console.log('component Did Mount messages run', this.props.navigation.state.params.id);
    //let ob  = require(baseUri+"/bundles/mamedcovid/assets/images/pictures/2.jpeg");
    let allMessages;
    if(this.props.contact){
      allMessages = this.props.contact;
    }
    else{
      this.flash();
      allMessages = await getAllMessages(this.props.navigation.state.params.id);
      hideMessage();
    }
    this.setState({messages: allMessages.data})
    this.props.setContact(allMessages)
    console.log('response from api', allMessages) 
  }

  flash = (position = "bottom",  extra = {}) => {
    let message = {
       message: 'Chargement des conversations ...',
      type: "default",
      position,
      autoHide: false,
      // animationDuration: 1000, 
      icon: { icon: "auto", position: "left" },
      duration: 20000,
      ...extra,
    };
    message = { ...message, floating: true };
    showMessage(message)
  }

  render() {
    const uri = baseUri+"/bundles/mamedcovid/assets/images/pictures/";
    this.state.messages !== null ?  console.log('èèèèèèèèè ',uri+this.state.messages[0].medecin.personne.image):null
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Messages'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/whiteHeart.png'),
                buttonAction: this._handleClickHeartButton.bind(this),
                buttonWidth: 26,
                buttonHeight: 23,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.messages!== null &&
              this.state.messages.map((item, index) => (
                <Item
                  _onGoToChat={()=>this.props.navigation.navigate('ChatScreen', {
                                                          idMed: item.medecin.personne.id,
                                                          name: item.medecin.personne.prenom+' '+item.medecin.personne.nom
                                                        })}
                  key={index} 
                  avatar={item.medecin.personne.image ? uri+item.medecin.personne.image : require('../../img/person/profil2.jpg')}
                  picture={item.medecin.personne.image ? true : false }
                  name={item.medecin.personne.prenom+' '+item.medecin.personne.nom}
                  birthDate={""}
                  comment={'ok demain je serai...'}

                />
              ))
            }
            { 
            // <View style={[CommonStyles.buttonBox, {marginTop: 80, marginBottom: 10}]}>
            //   <GradientButton
            //     onPressButton={this._handleClickWriteReview.bind(this)}
            //     setting={shadowOpt}
            //     btnText="WRITE REVIEW"
            //   />
            // </View>
          }
          </View>
        </ScrollView>
      </View>
    );
  }

  // Go to WriteReviewScreen
  _handleClickWriteReview() {
    // TODO:
  }

  _handleClickHeartButton() {
    // TODO: Click heart button
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      avatar,
      name,
      birthDate,
      comment
    } = this.props;

    let starImgs = [];
    for(let i = 1; i <= 4; i++) {
      // starImgs.push(
      //   // <Icon
      //   //   key={i}
      //   //   style={{paddingLeft: 2}}
      //   //   name="star-o"
      //   //   size={19}
      //   //   color="rgb(75,102,234)"
      //   // />
      // )        
    }

    return (
      <TouchableOpacity onPress={this.props._onGoToChat}>
        <View style={[CommonStyles.itemWhiteBox, {padding: 16}]}>
            <View style={styles.info}>
              <View style={styles.left}>
                {  
                  <Image
                      source={ require('../../img/person/profil2.jpg')}
                      style={{width: 60, height: 60, borderRadius: 20}}
                    />  
                }
                <View style={styles.name}>
                  <Text itemHeader black mediumBold style={{marginTop: -6}}>
                    {name}
                  </Text>
                  <Text normal lightGrey regular>{comment}</Text>
                </View>
              </View>
              <View style={styles.right}>
                  <Icon
                    size={19}
                    style={{paddingLeft: 2}}
                    name="chevron-thin-right"
                    color="rgb(105,105,105)"
                  />
              </View>
            </View>
        </View>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  info: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10 
  },
  left: {
    flexDirection: 'row',
  },
  birthDate: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    lineHeight: 23,
  },
  name: {
    marginLeft: 10,
  },
  right: {
    width: 20,
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    setContact: async (data) => {
      dispatch({type: "SET_CONTACT", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorReviewScreen);
