import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Details = ({route}) => {
    const product = route.params.product;
    return (
        <>
       
       <Text style={styles.bottomCenter}>Product ID: {product.productId}</Text>
        <Text style={styles.bottomCenter}>Product Name: {product.productName}</Text>
        
        </>
    )
}

export default Details;

const styles = StyleSheet.create({
    bottomCenter: {
        
        
        marginTop: 40,
        fontSize: 30
    },
    

})



