import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import {
    Container
} from '../components/Styles';
import { useFavourites } from '../components/Context/FavouriteContext';
import ListFavouriteItems from '../components/ListFavouriteItems'
  import Header from '../components/Headers/Header'
  

const Favourite = () => {
    const {FavouritedProducts, fetchFavouritedProducts} = useFavourites();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    useEffect(() => {

        fetchFavouritedProducts();

    }, [])

    const onClickRemove = (productId) => {
        
        const variable = {
            productId: productId,
            userFrom:  storedCredentials
        }

        Axios.post('http://192.168.0.30:5000/favourite/removeFavourites', variable)
        .then(response=> {
            if(response.data.success) {
               console.log("Removed from favourites")
                
               fetchFavouritedProducts();
            } else {
                alert(' Failed to remove from favourite')
            }
        })
    
    }

    

    return(
        <>
        <Header titleText='Favourites'/> 
        {FavouritedProducts.length == 0 && <Container><Text style={{left: 30, fontSize: 16, letterSpacing: 1}}>You have no Favourites</Text></Container>}
        {FavouritedProducts.length != 0 && (
           
        <Container>
           
        <FlatList data={FavouritedProducts}
        renderItem={({item, index}) => <ListFavouriteItems  item={item}  key={index} onClickRemove={onClickRemove}></ListFavouriteItems>}
        keyExtractor={(item,index) => index.toString()}
        ></FlatList>
       
        </Container>
        )}
           
            </>
       
    )
}

export default Favourite;