import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fetchContacts } from '../api/contacts'

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
      console.log(e.message)
    }
  }

  render () {
    const { status, contactsList } = this.state
    if (status === 'loading') {
      return (
        <View><Text>'loading'</Text></View>
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
              return <Text key={i}>{contact.first_name}</Text>
            })
          }
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  }
})
