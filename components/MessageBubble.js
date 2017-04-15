import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export const InboundMessage = ({message}) => (
  <View style={styles.container}>
    <View style={[styles.bubble, {alignSelf: 'flex-start', borderColor: 'blue'}]}>
      <Text style={{textAlign: 'left'}}>{message.body}</Text>
    </View>
  </View>
)

export const OutboundMessage = ({message}) => (
  <View style={styles.container}>
    <View style={[styles.bubble, {alignSelf: 'flex-end', borderColor: 'green'}]}>
      <Text style={{textAlign: 'right'}}>{message.body}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    margin: 2
  },
  bubble: {
    padding: 8,
    borderRadius: 14,
    borderWidth: 1
  }
})
