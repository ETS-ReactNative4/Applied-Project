import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {  TouchableOpacity } from 'react-native';

const Favourite = (props) => {
    const [Favourited, setFavourited] = useState(false)

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
            axios.
        post('http://192.168.0.30:5000/favourite/addFavourites', variable)
        .then(response=> {
            if(response.data.success) {
               console.log("Added to favorites")
                setFavourited(!Favourited)
            } else {
                alert(' Failed to add to Favorites')
            }
        })
    
    }
    

    return (
        <TouchableOpacity onPress={() => handleAddToFavourites()}>
        <Icon name="favorite" type="material" />
            </TouchableOpacity>
    )
}

export default Favourite