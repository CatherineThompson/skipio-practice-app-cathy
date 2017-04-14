import { createRouter } from '@expo/ex-navigation'

import HomeScreen from '../screens/HomeScreen'
import ContactsScreen from '../screens/ContactsScreen'
import RootNavigation from './RootNavigation'
import ContactDetailsScreen from '../screens/ContactDetailsScreen'

export default createRouter(() => ({
  home: () => HomeScreen,
  contacts: () => ContactsScreen,
  rootNavigation: () => RootNavigation,
  contactDetails: () => ContactDetailsScreen
}))
