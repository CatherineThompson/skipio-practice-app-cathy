import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Colors from '../constants/Colors'

export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/skipio_full_logo.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>
              Scaled sms messaging - with that personal touch
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 80
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  subHeaderContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  subHeaderText: {
    fontSize: 17,
    color: Colors.backgroudGray,
    lineHeight: 23,
    textAlign: 'center'
  }
})
