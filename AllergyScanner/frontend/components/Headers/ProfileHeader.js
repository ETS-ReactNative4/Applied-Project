import React from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';

const Header = ({ titleText}) =>{
    
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
        backgroundColor: '#344955'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
   
    title: {
        color: '#fff',
        fontSize: 30,
  fontWeight: 'bold',
  
  
  letterSpacing: 2,
  fontStyle: 'italic'
    }, 
    backButton: {
       // right: 150,
       right:360,
        bottom:2
    }
})

export default Header;