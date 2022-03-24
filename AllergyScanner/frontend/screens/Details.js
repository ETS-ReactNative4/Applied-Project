import React from 'react';
import {Text, StyleSheet} from 'react-native';
import DetailsHeader from '../components/Headers/DetailsHeader'
import {
    Container
} from '../components/Styles';

const Details = ({route}) => {
    const product = route.params.product;
    return (
        <>
          
         <DetailsHeader titleText='Details'/> 
         <Container>
       <Text style={styles.bottomCenter}>Product ID: {product.productId}</Text>
        <Text style={styles.bottomCenter}>Product Name: {product.productName}</Text>
        </Container>
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



