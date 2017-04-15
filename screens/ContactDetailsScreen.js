import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ListView
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import InvertibleScrollView from 'react-native-invertible-scroll-view'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { sendMessage, messagesList } from '../api/contacts'
import { InboundMessage, OutboundMessage } from '../components/MessageBubble'
import FieldContainer from '../components/FieldContainer'

export default class ContactDetailsScreen extends Component {
  static route = {
    navigationBar: {
      title: (params) => params.contact.first_name + ' ' + params.contact.last_name,
    }
  }

  state = {
    status: 'loading',
    message: '',
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
    anim: new Animated.Value(16)
  }

  async componentDidMount () {
    await this._getMessageList()
  }

  _getMessageList = async () => {
    try {
      const messagesResponse = await messagesList(this.props.contact)
      const messages = messagesResponse.data
      const messagesIds = messages.map((row, index) => index)
      this.setState({
        status: 'success',
        dataSource: this.state.dataSource.cloneWithRows(messages, messagesIds)
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
          <View>
            <Image
              style={styles.avatarImage}
              source={{uri: contact.avatar_url}} />
            <FieldContainer field='Mobile Number' data={contact.phone_mobile} />
            {
              contact.email ? <FieldContainer field='Email' data={contact.email} /> : null
            }
            {
              contact.street_address ? <FieldContainer field='Address' data={contact} /> : null
            }
          </View>

          <View style={{flex: 1, marginVertical: Layout.padding}}>
            <ListView
              renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              style={{flex: 1}}
            />
          </View>

          <View style={styles.messageContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={component => this._textInput = component}
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

  _renderRow = (message) => {
    if (message.direction === 'inbound') {
      return <InboundMessage key={message} message={message} />
    } else if (message.direction === 'outbound') {
      return <OutboundMessage key={message} message={message} />
    }
  }

  _handleTextChange = (message) => {
    this.setState({ message: message })
  }

  _handleSendMessage = async () => {
    this._textInput.setNativeProps({text: ''})
    try {
      const messageSent = await sendMessage(this.props.contact, this.state.message)
      if (messageSent.success) {
        await this._getMessageList()
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
    borderColor: Colors.backgroudGray,
    alignSelf: 'center'
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 16
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
