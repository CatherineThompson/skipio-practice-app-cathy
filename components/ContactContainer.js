import React from 'react'
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

const ContactContainer = ({contact, onPress}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image
      style={styles.iconImage}
      source={{uri: contact.avatar_url}} />
    <Text>{contact.first_name + ' ' + contact.last_name}</Text>
  </TouchableOpacity>
)

export default ContactContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconImage: {
    width: 50,
    height: 50,
    margin: 12,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 25
  }
})
