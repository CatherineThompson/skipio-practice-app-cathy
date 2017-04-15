import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated
} from 'react-native'
import { sendMessage } from '../api/contacts.js'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class ContactDetailsScreen extends Component {
  static route = {
    navigationBar: {
      title: (params) => params.contact.first_name + ' ' + params.contact.last_name,
    }
  }

  state = {
    message: '',
    keyboardHeight: 0,
    anim: new Animated.Value(16)
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow = (e) => {
    Animated.timing(this.state.anim, {toValue: e.endCoordinates.height, duration: 250}).start()
  }

  _keyboardDidHide = (e) => {
    Animated.timing(this.state.anim, {toValue: 16, duration: 250}).start()
  }

  render () {
    const { contact } = this.props
    return (
      <View style={styles.container}>

        <View>
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

        <Animated.View style={[styles.messageContainer, {bottom: this.state.anim}]}>
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
        </Animated.View>

      </View>
    )
  }

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
    justifyContent: 'space-between'
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
    position: 'absolute',
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
