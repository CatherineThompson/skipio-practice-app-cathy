import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  contacts: () => ContactsScreen,
  rootNavigation: () => RootNavigation,
}));
