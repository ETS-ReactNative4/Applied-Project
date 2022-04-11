import React from 'react'
import { View, StyleSheet, Dimensions} from 'react-native'
import { Appbar, Title } from 'react-native-paper'

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
// profile header
const Header = ({ titleText }) => {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#344955',
    height: height * 0.06,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    lineHeight: width * 0.08,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  backButton: {
    right: 360,
    bottom: 2,
  },
})

export default Header
