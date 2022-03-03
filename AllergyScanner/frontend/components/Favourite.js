import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {  TouchableOpacity } from 'react-native';

const Favourite = (props) => {
    const [Favourited, setFavourited] = useState(false)

    useEffect(() => {

        const variable = {
            userFrom: props.userFrom,
            productId: props.productId,
            productName: props.productName
            
        }

        axios.post('http://192.168.0.30:5000/favourite/favourited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavourited(response.data.favourited)
                } else {
                    alert('Failed to get Favorite Info')
                }
            })

    }, [])

    return (
        <TouchableOpacity onPress={() => {}}>
                    <Icon name={Favourited ? "favorite" : "favorite-border"} type="material" />
                </TouchableOpacity>
    )
}

export default Favourite