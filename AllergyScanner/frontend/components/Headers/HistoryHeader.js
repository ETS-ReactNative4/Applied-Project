import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { HeaderButton } from '../Styles'

// Header for scanned items page
// takes in a function to delete all scanned items
const HistoryHeader = ({ titleText, removeAll }) => {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
      <HeaderButton onPress={removeAll}>
        <Entypo name="trash" size={29} style={styles.bin} />
      </HeaderButton>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#344955',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bin: {
    right: 20,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    right: 50,

    letterSpacing: 2,
    fontStyle: 'italic',
  },
})

export default HistoryHeader
