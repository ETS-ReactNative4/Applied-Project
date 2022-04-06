import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
// Icons
import { Entypo } from "@expo/vector-icons";
// styled components
import {   
    HeaderButton,
  } from "../Styles";
  
// Header for allergens page
// takes in a function to delete all allergens
const AllergenHeader = ({ titleText, handleClearAllergens }) =>{
    return (
        <Appbar.Header style={styles.headerContainer}>
            <View style={styles.container}>
            
                <Title style={styles.title}>{titleText}</Title>
               
            </View>
            
            <HeaderButton onPress={handleClearAllergens}>
            <Entypo name="trash" size={29}  style={styles.bin}/>
            </HeaderButton>
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
    bin: {
        right: 20,
        color: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: 30,
  fontWeight: 'bold',
  right: 80,
  
  letterSpacing: 2,
  fontStyle: 'italic'
    }
})

export default AllergenHeader;