import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {  TouchableOpacity } from 'react-native';
import  {useFavourites} from './Context/FavouriteContext';

const Favourite = (props) => {
    const [Favourited, setFavourited] = useState(false)
    const { fetchFavouritedProducts } = useFavourites();

    const variable = {
        userFrom: props.userFrom,
        productId: props.productId,
        productName: props.productName
        
    }


    useEffect(() => {
        axios.post('http://192.168.0.30:5000/favourite/favourited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavourited(response.data.favourited)
                } else {
                    alert('Failed to get Favorite Info')
                }
            })

    }, [])


    const handleAddToFavourites = () => {
        if(Favourited) {
            axios.
            post('http://192.168.0.30:5000/favourite/removeFavourites', variable)
            .then(response=> {
                if(response.data.success) {
                    console.log("Removed from favourites")
                    setFavourited(!Favourited)
                    fetchFavouritedProducts();
                } else {
                    alert(' Failed to remove from favourite')
            }})
            
            }
            else {
                axios.
            post('http://192.168.0.30:5000/favourite/addFavourites', variable)
            .then(response=> {
                if(response.data.success) {
                   console.log("Added to favourites")
                    setFavourited(!Favourited)
                    fetchFavouritedProducts();
                } else {
                    alert(' Failed to add to Favourites')
                }
            })
        
        }
    
    }
    

    return (
        <TouchableOpacity onPress={() => handleAddToFavourites()}>
            <Icon name={Favourited ? "favorite" : "favorite-border"} type="material" />
                </TouchableOpacity>
    )
}

export default Favourite