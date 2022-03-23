import React,{useState,useEffect,useContext} from 'react';
import {View, Text,FlatList} from 'react-native';
import {
    Container
} from '../components/Styles';
import HistoryHeader from '../components/Headers/HistoryHeader'
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import ListHistory from '../components/ListHistory'
import { useProducts } from '../components/Context/ProductContext';

const History = () => {
    const { products, fetchProducts } = useProducts();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    useEffect(() => {
            fetchProducts();
    }, [])
    

    const onClickRemove = (productId) => {
        
        const variable = {
            productId: productId,
            userFrom:  storedCredentials
        }

        Axios.post('http://192.168.0.30:5000/products/removeProducts', variable)
        .then(response=> {
            if(response.data.success) {
               console.log("Removed product")
                
               fetchProducts()
            } else {
                alert(' Failed to remove from products')
            }
        })
    
    }

    return (
        <>
         
      
         {products.length == 0 &&   <Container><HistoryHeader/><Text>You have no Scanned Items</Text></Container>}
         {products.length != 0 && (
         <Container>
             <HistoryHeader/>
         <FlatList data={products}
         renderItem={({item, index}) => <ListHistory item={item} key={index} onClickRemove={onClickRemove}></ListHistory>}
         keyExtractor={(item,index) => index.toString()}
         
         ></FlatList>
         </Container>
         )}
            
             </>
     );
}

export default History;