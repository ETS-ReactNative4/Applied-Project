import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import {
    Container
} from '../components/Styles';
import { useFavourites } from '../components/Context/FavouriteContext';
import ListFavouriteItems from '../components/ListFavouriteItems'

  import FavouriteHeader from '../components/Headers/FavouriteHeader'

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
        
        {FavouritedProducts.length == 0 && <Container><FavouriteHeader><Text>You have no Favourites</Text></FavouriteHeader></Container>}
        {FavouritedProducts.length != 0 && (
        <Container>
           <FavouriteHeader/>
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