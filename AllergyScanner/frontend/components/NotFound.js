import React from 'react';
import {View, Text} from 'react-native';
import {
    StyledContainer
} from '../components/Styles';
import {Icon} from 'react-native-elements';

const NotFound = () => {
    return(
        
        <View style={{flex: 1,backgroundColor: '#ffa31a'}}>
        <Icon name="question" type="antdesign"  size={200} color="#fff"/>
            <Text>Sorry this barcode does not exist</Text>
        </View>
        
    )
}

export default NotFound; 