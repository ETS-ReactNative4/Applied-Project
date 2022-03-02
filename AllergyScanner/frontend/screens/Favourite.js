import React from 'react';
import FavouriteHeader from '../components/Headers/FavouriteHeader'
import {View, Text} from 'react-native';
import {
    Container
} from '../components/Styles';

export default function Favourite(){
    return(
        
        <Container>
            <FavouriteHeader/>
        <View>
            <Text>This is the favourite screen</Text>
        </View>
        </Container>
    )
}