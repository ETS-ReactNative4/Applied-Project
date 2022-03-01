import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
     StyledContainer
} from '../components/Styles';
import NotFound from '../components/NotFound'

const Results = ({ route }) => {
    if (route.params.product === undefined) {
        return (
            <NotFound />
          )
       } else { 
        let allergenMatches = route.params.product.ingredients_text;
        let result = allergenMatches.match(/e/g);
        console.log("Output : " + result);    
}
      
    return (
       
        <StyledContainer>
        
        
        <View style={styles.container}>
            <View style={styles.body} >
                
                <Text >{route.params.product.product_name}</Text>
                <Text>{route.params.product.quantity})</Text>
                <Text>{route.params.product.ingredients_text})</Text>
            </View>
            <View/>
        </View>
            
        </StyledContainer>
    )
};

const styles = StyleSheet.create({
    container: {
      
        
            flex: 1,
            flexDirection: 'column',
            padding: 10,
    
    },
    body: {
        flex: 1,
        alignItems: 'center',
       
        justifyContent: 'center',
    },
  });

export default Results; 



