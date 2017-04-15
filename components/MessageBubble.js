import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export const InboundMessage = ({message}) => (
  <View style={styles.container}>
    <Text style={{textAlign: 'left'}}>{message.body}</Text>
  </View>
)

export const OutboundMessage = ({message}) => (
  <View style={styles.container}>
    <Text style={{textAlign: 'right'}}>{message.body}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 14,
    borderWidth: 1
  }
})
