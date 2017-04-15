import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const FieldContainer = ({field, data}) => {
  if (field === 'Address') {
    return (
      <View style={styles.container}>
        <Text>{field}:</Text>
        <View>
          <Text>{data.street_address}</Text>
          <Text>{data.city}, {data.state} {data.zip_code}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>{field}:</Text>
        <Text>{data}</Text>
      </View>
    )
  }
}

export default FieldContainer

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    marginHorizontal: Layout.padding,
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.backgroudGray,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
