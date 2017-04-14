import React from 'react'
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation'
import { FontAwesome } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export default class RootNavigation extends React.Component {
  render () {
    return (
      <TabNavigation tabBarHeight={56} initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="contacts"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute="contacts" />
        </TabNavigationItem>
      </TabNavigation>
    )
  }

  _renderIcon (name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }
}
