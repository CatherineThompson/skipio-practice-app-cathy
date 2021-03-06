import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fetchContacts } from '../api/contacts'
import ContactContainer from '../components/ContactContainer'
import LoadingScreen from '../components/LoadingScreen'

export default class ContactsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Contacts',
    },
  }

  state = {
    status: 'loading',
    contactsList: []
  }

  componentDidMount = async () => {
    try {
      const contactsList = await fetchContacts()
      this.setState({
        status: 'success',
        contactsList: contactsList.data
      })
    } catch (e) {
      this.setState({
        status: 'error'
      })
    }
  }

  render () {
    const { status, contactsList } = this.state
    if (status === 'loading') {
      return (
      <LoadingScreen />
      )
    } else if (status === 'error') {
      return (
        <View><Text>'error'</Text></View>
      )
    } else {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={this.props.route.getContentContainerStyle()}>
          {
            contactsList.map((contact, i) => {
              return <ContactContainer
                key={i}
                contact={contact}
                onPress={() => this._handleContactPress(contact)} />
            })
          }
        </ScrollView>
      )
    }
  }

  _handleContactPress = (contact) => {
    this.props.navigator.push('contactDetails', {contact: contact})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
