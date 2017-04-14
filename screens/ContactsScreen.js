import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default class ContactsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Contacts',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
