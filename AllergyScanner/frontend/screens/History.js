import React from 'react';
import {View, Text} from 'react-native';
import {
    Container
} from '../components/Styles';
import HistoryHeader from '../components/Headers/HistoryHeader'

export default function History(){
    return(
        <Container>
            <HistoryHeader/>
        <View>
            <Text>This is the history screen</Text>
        </View>
        </Container>
    )
}