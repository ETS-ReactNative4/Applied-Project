import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
// Icons
import { Entypo } from "@expo/vector-icons";
// styled components
import {   
    HeaderButton,
   
  } from "../Styles";
  
  const {height} = Dimensions.get("screen");
  const {width} = Dimensions.get("screen");
  
// Header for allergens page
// takes in a function to delete all allergens
const AllergenHeader = ({ titleText, handleClearAllergens, setModalVisible, }) =>{
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
        backgroundColor: '#344955',
        height: height * 0.06,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
        
    },
    bin: {
        right: 20,
        color: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: width * 0.08,
        fontWeight: 'bold',
        lineHeight: width * 0.08,
        right: height * 0.09,
     
  
  letterSpacing: 2,
  fontStyle: 'italic'
    }
})

export default AllergenHeader;