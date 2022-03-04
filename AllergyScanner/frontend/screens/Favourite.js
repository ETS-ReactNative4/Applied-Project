import React, {useEffect, useContext, useState} from 'react';
import FavouriteHeader from '../components/Headers/FavouriteHeader'
import {View, Text, FlatList} from 'react-native';
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import {
    Container
} from '../components/Styles';
import { useFavourites } from '../components/Context/FavouriteContext';
import ListFavouriteItems from '../components/ListFavouriteItems'

const Favourite = () => {
    const {FavouritedProducts, setFavouritedProducts, fetchFavouritedProducts} = useFavourites();

    useEffect(() => {

        fetchFavouritedProducts();

    }, [])


    return(
        <>
        {FavouritedProducts.length == 0 && <Text>You have no Favourites</Text>}
        {FavouritedProducts.length != 0 && (
        
        <FlatList data={FavouritedProducts}
        renderItem={({item, index}) => <ListFavouriteItems item={item} key={index}></ListFavouriteItems>}
        keyExtractor={(item,index) => index.toString()}
        
        ></FlatList>
        
        )}
           
            </>
       
    )
}

export default Favourite;