import React from 'react';
import {View, Text} from 'react-native';
import {
    StyledContainer
} from '../components/Styles';

const NotFound = () => {
    return(
        <StyledContainer>
        <View>
            <Text>Sorry this barcode does not exist</Text>
        </View>
        </StyledContainer>
    )
}

export default NotFound; 