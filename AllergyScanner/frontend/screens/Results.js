import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Results = ({ route }) => {
    return (
        <View style={styles.container}>
            <View style={styles.body} >
                
                <Text >{route.params.product.product_name}</Text>
                <Text>{route.params.product.quantity})</Text>
                <Text>{route.params.product.ingredients_text})</Text>
            </View>
            <View/>
        </View>
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