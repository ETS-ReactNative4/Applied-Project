import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container } from '../components/Styles'
import { Icon } from 'react-native-elements'

// method to display message when barcode doesn't exist
const NotFound = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffa31a' }}>
      <Icon name="question" type="antdesign" size={200} color="#fff" />
      <View style={styles.textContainer}>
        <Text style={styles.resultsText}>
          Sorry this barcode does not exist
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  resultsText: {
    marginVertical: 10,
    fontSize: 25,
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,

    padding: '5%',
  },
})

export default NotFound
