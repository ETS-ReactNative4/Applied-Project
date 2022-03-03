import React, {useEffect, useContext, useState} from 'react';
import FavouriteHeader from '../components/Headers/FavouriteHeader'
import {View, Text} from 'react-native';
import Axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import {
    Container
} from '../components/Styles';

const Favourite = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [FavouritedProducts, setFavouritedProducts] = useState([])

    useEffect(() => {

        Axios.post('http://192.168.0.30:5000/favourite/getFavouritedProduct', {userFrom: storedCredentials})
        .then(response => {
            if (response.data.success) {
                setFavouritedProducts(response.data.favourites)
            } else {
                alert('Failed to get favourited items')
            }
        })

    }, [])


    return(
        
        <Container>
            <FavouriteHeader/>
        <View>
            <Text>This is the favourite screen</Text>
        </View>
        </Container>
    )
}

export default Favourite;