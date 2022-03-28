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
    const {FavouritedProducts, fetchFavouritedProducts, setFavouritedProducts} = useFavourites();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    useEffect(() => {

        fetchFavouritedProducts();

    }, [])

    const removeAll = () => {

        Axios.post('http://192.168.0.30:5000/favourite/deleteAll', {userFrom: storedCredentials})
            .then(response => {
                if (response.data.success) {
                  setFavouritedProducts([])
                  console.log("Removed all items from favourites")
                } else {
                    alert('Failed to remove favourited items')
                }
            }).catch(error=>{
                console.log(error);
                fetchFavouritedProducts();
            });
        
        }

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
        <FavouriteHeader titleText='Favourites' removeAll={removeAll}/> 
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