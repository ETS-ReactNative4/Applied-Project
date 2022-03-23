import React from 'react';
import {Text} from 'react-native';

const Details = ({route}) => {
    const product = route.params.product;
    return (
        <>
       
       <Text style={{fontSize: 30}}>Product ID: {product.productId}</Text>
        <Text style={{fontSize: 30}}>Product Name: {product.productName}</Text>
        
        </>
    )
}

export default Details;