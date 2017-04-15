import React from 'React'
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import Colors from '../constants/Colors'

const LoadingScreen = () => (
  <View style={styles.loadingContainer} >
    <ActivityIndicator size={'large'} color={Colors.tintColor}/>
  </View>
)

export default LoadingScreen

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
