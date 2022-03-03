import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {  TouchableOpacity } from 'react-native';

const Favourite = () => {
    const [Favourited, setFavourited] = useState(false)


    return (
        <TouchableOpacity onPress={() => {}}>
                    <Icon name={Favourited ? "favorite" : "favorite-border"} type="material" />
                </TouchableOpacity>
    )
}

export default Favourite