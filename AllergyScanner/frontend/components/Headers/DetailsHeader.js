import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


// Details page header
const Header = ({ titleText }) => {
  const navigation = useNavigation()
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="left"
          size={34}
          color="white"
          style={styles.backButton}
        />
      </TouchableOpacity>
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

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',

    letterSpacing: 2,
    fontStyle: 'italic',
  },
  backButton: {
    right: 360,
    bottom: 2,
  },
})

export default Header
