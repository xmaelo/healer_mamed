import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform, 
} from 'react-native'; 
import {
  GiftedChat,
  Actions,
  MessageText, 
  Bubble, 
  Time,
  Avatar
} from 'react-native-gifted-chat';
import { getOneMessages, baseUri, onSendMessage, getMessageNonLue } from "./statefull/appStatefull";
import { connect } from 'react-redux'
import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CustomView from '../lib/CustomView';
import CustomActions from '../lib/CustomActions';
import CustomInputToolbar from '../lib/CustomInputToolbar';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth
} from '../styles/variables';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      onConvert: [],
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderMessageText = this.renderMessageText.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  // async UNSAFE_componentWillMount() {
  //   this._isMounted = true;
  //   this.setState(() => {
  //     return { 
  //       //messages: require('../data/messages.js'),
  //     };
  //   });
  // } 

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount (){ 
    console.log('component', this.props.data.personne.id);
    //let ob  = require(baseUri+"/bundles/mamedcovid/assets/images/pictures/2.jpeg");
      let messages;
      let formatMessages;
      if(this.props.converations[this.props.navigation.state.params.idMed]){
        formatMessages = this.props.converations[this.props.navigation.state.params.idMed];
      }
      else {
        let onConvert = await getOneMessages(this.props.data.personne.id, this.props.navigation.state.params.idMed)
        console.log('on conver', onConvert)
        if(onConvert){
          messages = onConvert.data;
          formatMessages = [];
          messages.reverse().map((mess, ind) => {
            let prototype = {
                _id:  Math.round(Math.random() * 1000000000),
                text: mess.message,
                createdAt: new Date(mess.date),
                user: {
                  _id: mess.sender_id,
                  name: mess.sender_nom,
                },
                sent: true,
                received: true,
              }
            formatMessages.push(prototype);
          })
        }
      }
      this.setState({messages: formatMessages});
      this.props.addConvert({idMed: this.props.navigation.state.params.idMed, converation: formatMessages})
      setInterval(() => {
      this.setIntervals(); 
      }, 1000);
  } 

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require('../data/old_messages.js')
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  async onSend(messages = []) {
    console.log('toSend', messages);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    let res = await onSendMessage(
        {   
          message: {
                  msg: messages[0].text,  
                  emetteur: this.props.data.personne.id, 
                  recpteur: this.props.navigation.state.params.idMed,
                }
        }
      );
      let oldState = this.state.messages.slice();
      oldState.splice(0, 1);
      let newMess = { ...this.state.messages[0], sent: true };
      console.log('oldState', oldState);
      console.log('nexMess', newMess)
    if(res.success){

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(oldState, newMess),
        };
      });
      this.props.addConvert({idMed: this.props.navigation.state.params.idMed, converation: GiftedChat.append(oldState, newMess)})
    }
    console.log('response sedn mess', res);
    // for demo purpose
    //this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Doctor is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require('../../img/person/pixta21931547M.png'),
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <CustomActions
        {...props}
        options={options}
      />
    );
  }
  
  // Customize Bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            marginVertical: 5,
            borderRadius: 8,
            backgroundColor: '#fff',
            ...Platform.select({
              ios: {
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowOffset: {
                  width: 0,
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
          right: {
            marginVertical: 5,
            borderRadius: 8,
            backgroundColor: 'rgb(136,159,249)',
          }
        }}
      />
    );
  }

  // Customize Message Text 
  renderMessageText(messageTextProps) {
    return (
      <MessageText
        {...messageTextProps}
        textStyle={{
          left: {
            color: 'rgb(105,105,105)',
            fontSize: 16,
            fontFamily: 'Poppins-Regular', 
            lineHeight: 23,
            marginVertical: 7,
            marginHorizontal: 10,
          },
          right: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular', 
            lineHeight: 23,
            marginVertical: 7,
            marginHorizontal: 10,
          } 
        }}
      />
    );
  }

  // Customize Time Text 
  renderTime(timeProps) {
    return (
      <Time
        {...timeProps}
        textStyle={{
          left: {
            color: 'rgb(105,105,105)',
            fontFamily: 'Poppins-Regular', 
          },
          right: {
            fontFamily: 'Poppins-Regular', 
          } 
        }}
      />
    );
  }

  // Customize Avatar 
  renderAvatar(avatarProps) {
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: {
            width: 30,
            height: 30,
          },
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  // Customize Footer 
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footer}>
          <Text grey regular style={{fontSize: 14}}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  // Customize Input Toolbar 
  renderCustomInputToolbar(props) {
    return (
      <CustomInputToolbar
        {...props}
      />
    ); 
  } 
  setIntervals = async() => {
    let nonLue =  await getMessageNonLue(this.props.data.personne.id);
    let toDispatch;
    if(nonLue.data && nonLue.data.length > 0){
      const idMed = this.props.navigation.state.params.idMed;
      nonLue.data.map((one, ind)=>{
        if(one.sender_id == idMed){
          let ob = {
            text: one.message,
            sent: true,
            received: true,
            createdAt: new Date(one.date),
            user: {
              _id: idMed,
              name: one.sender_nom
            },
            _id: Math.round(Math.random() * 1000000000)
          }
          this.setState((previousState) => {
            return {
              messages: GiftedChat.append(previousState.messages,ob)
            };
          });
          this.props.addConvert({idMed: this.props.navigation.state.params.idMed, 
            converation: this.state.messages})
        }
      })
    }
  }
  render() {
    const idMed = this.props.navigation.state.params.idMed;

    // const months = ['Jan', 'March', 'April', 'June'];
    // let m = months.splice(0, 1);
    // console.log('b',months.splice(0, 1));
    // console.log('this.state.messages', this.state.messages)
    // console.log('component run', this.props.navigation.state.params.name, this.props.navigation.state.params.idMed)
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar 
          navigation={this.props.navigation}
          back
          titleText={this.props.navigation.state.params.name}
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/clipboard1.png'),
                buttonAction: this._handleClickClipboardButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 22,
              },
            ]
          }
        />
        <View style={CommonStyles.chatView}>
          <GiftedChat
            messages={this.state.messages}
            placeholder='Votre message ...'
            onSend={this.onSend}
            // loadEarlier={this.state.loadEarlier}
            // onLoadEarlier={this.onLoadEarlier}
            // isLoadingEarlier={this.state.isLoadingEarlier}
            renderAvatarOnTop={true}

            user={{
              _id: this.props.data.personne.id, // sent messages should have same user._id
            }}

            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderMessageText={this.renderMessageText}
            renderTime={this.renderTime}
            renderAvatar={this.renderAvatar}
            renderCustomView={this.renderCustomView}
            renderInputToolbar={this.renderCustomInputToolbar}
            renderFooter={this.renderFooter}
          />
        </View>
      </View>
    );
  }

  _handleClickClipboardButton() {
    // TODO: Click clipboard button
  }
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => { 
  return {
    addConvert: async (data) => {
      dispatch({type: "ADD_CONVERT", data: data});
    },
    actuConvert: async (data) => {
      dispatch({type: "ACTU_CONVERT", data: data});
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);