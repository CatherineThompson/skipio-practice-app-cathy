import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput
} from 'react-native'
import { sendMessage } from '../api/contacts.js'

export default class ContactDetailsScreen extends Component {
  static route = {
    navigationBar: {
      title: (params) => params.contact.first_name + ' ' + params.contact.last_name,
    }
  }

  render () {
    const { contact } = this.props
    sendMessage(contact, 'from my app')
    return (
      <View style={styles.container}>
        <Image
          style={styles.iconImage}
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
        <TextInput />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  iconImage: {
    width: 70,
    height: 70,
    margin: 12,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 35
  }
})
