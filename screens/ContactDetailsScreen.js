import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native'
import { sendMessage, messagesList } from '../api/contacts'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import LoadingScreen from '../components/LoadingScreen'
import { InboundMessage, OutboundMessage } from '../components/MessageBubble'
import Layout from '../constants/Layout'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default class ContactDetailsScreen extends Component {
  static route = {
    navigationBar: {
      title: (params) => params.contact.first_name + ' ' + params.contact.last_name,
    }
  }

  state = {
    status: 'loading',
    message: '',
    messages: [],
    anim: new Animated.Value(16)
  }

  async componentDidMount () {
    try {
      const messages = await messagesList(this.props.contact)
      this.setState({
        status: 'success',
        messages: messages.data
      })
    } catch (e) {
      this.setState({
        status: 'error'
      })
    }
  }

  render () {
    const { contact } = this.props
    return (
      <View style={styles.container}>

        <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center', paddingTop: 16}}>
          <Image
            style={styles.avatarImage}
            source={{uri: contact.avatar_url}} />
          <Text>{contact.first_name + ' ' + contact.last_name}</Text>
          <Text>Mobile Number:  {contact.phone_mobile}</Text>
          {
            contact.email ? <Text>Email:  {contact.email}</Text> : null
          }
          {
            contact.street_address ? (
              <View>
                <Text>Address: </Text>
                <Text>{contact.street_address}</Text>
                <Text>{contact.city}, {contact.state} {contact.zip_code}</Text>
              </View>
            ) : null
          }
        </View>

        <View style={styles.messageContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder='send message'
              onChangeText={this._handleTextChange}
              style={styles.textInput} />
          </View>
          <TouchableOpacity
            style={styles.sendButtonContainer}
            onPress={this._handleSendMessage}>
            <FontAwesome
              name='send'
              size={24}
              style={{color: Colors.tintColor}}/>
          </TouchableOpacity>
        </View>
        </View>

        <KeyboardSpacer topSpacing={-Layout.tabBar.height}/>

      </View>
    )
  }

  // <ScrollView stlye={{flex: 1}}>
  //   {
  //     this._showMessages()
  //   }
  // </ScrollView>

  // _showMessages = () => {
  //   const { status } = this.state
  //   if (status === 'loading') {
  //     return (
  //     <LoadingScreen />
  //     )
  //   } else if (status === 'error') {
  //     return (
  //       <View><Text>'error'</Text></View>
  //     )
  //   } else {
  //     return (
  //       <View style={{flex: 1}}>
  //         {
  //           this.state.messages.map((message, i) => {
  //             if (message.direction === 'inbound') {
  //               return <InboundMessage key={i} message={message} />
  //             } else if (message.direction === 'outbound') {
  //               return <OutboundMessage key={i} message={message} />
  //             }
  //           })
  //         }
  //       </View>
  //     )
  //   }
  // }

  _handleTextChange = (message) => {
    this.setState({ message: message })
  }

  _handleSendMessage = async () => {
    try {
      const messageSent = await sendMessage(this.props.contact, this.state.message)
      if (messageSent.success) {
        this.props.navigator.showLocalAlert('sent', {
          text: { color: '#000' },
          container: { backgroundColor: Colors.tintColor },
        })
      }
    } catch (e) {
      this.props.navigator.showLocalAlert(e.message, {
        text: { color: '#000' },
        container: { backgroundColor: 'red' },
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarImage: {
    width: 70,
    height: 70,
    margin: 12,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 35,
    borderColor: Colors.backgroudGray
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: 'white'
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    flex: 1
  },
  textInput: {
    fontWeight: '300',
    backgroundColor: 'transparent',
    fontSize: 18,
    height: 30,
  },
  sendButtonContainer: {
    paddingLeft: 16
  }
})
