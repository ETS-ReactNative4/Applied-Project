import React from 'react';
import {View, Text} from 'react-native';
import {
    Container
} from '../components/Styles';
import HistoryHeader from '../components/Headers/HistoryHeader'

const History = () => {
    return(
        <Container>
            <HistoryHeader/>
        <View>
            <Text>This is the history screen</Text>
        </View>
        </Container>
    )
}

export default History;