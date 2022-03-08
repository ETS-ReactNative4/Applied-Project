import React,{useState,useEffect,useContext} from 'react';
import {View, Text,FlatList} from 'react-native';
import {
    Container
} from '../components/Styles';
import HistoryHeader from '../components/Headers/HistoryHeader'
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import ListFavouriteItems from '../components/ListFavouriteItems'
import { useProducts } from '../components/Context/ProductContext';

const History = () => {
    const { products, fetchProducts } = useProducts();

    useEffect(() => {
            fetchProducts();
    }, [])

    return (
        <>
         {products.length == 0 &&   <Container><HistoryHeader><Text>You have no Scanned Items</Text></HistoryHeader></Container>}
         {products.length != 0 && (
         <Container>
             <HistoryHeader/>
         <FlatList data={products}
         renderItem={({item, index}) => <ListFavouriteItems item={item} key={index}></ListFavouriteItems>}
         keyExtractor={(item,index) => index.toString()}
         
         ></FlatList>
         </Container>
         )}
            
             </>
     );
}

export default History;