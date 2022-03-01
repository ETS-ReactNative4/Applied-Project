import React, { useContext, useState, useEffect } from 'react';
import {
    DashboardImage, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line, AllergyButtons, StyledContainer
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import { CredentialsContext } from '../components/Context/CredentialsContext';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
    
    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email } = storedCredentials;

    const clearLogin = () => {
        AsyncStorage.removeItem('credentials')
            .then(() => {
                // sets  the credentials to empty string
                setStoredCredentials("");
            }).catch(error => console.log(error))

           
    }


    return (
        <StyledContainer>
            <InnerContainer>
                <DashboardContainer>
                    <PageTitle welcome={true}>Allergy Scanner</PageTitle>
                    <SubTitle welcome={true}>{name || 'John Murphy'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'JohnMurphy@gmail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('../../assets/allergens.jpg')} /><Text>{"\n"}</Text>
                        

                    </StyledFormArea>

                    <View style={styles.container} >

                       
                        <Line />

                        <StyledButton onPress={clearLogin}>
                            <ButtonText>
                                Logout
                         </ButtonText>
                        </StyledButton>

                    </View >
                </DashboardContainer>
            </InnerContainer>
        </StyledContainer>

    )
}



export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",

    },
    radioView: {
        marginTop: 16,
        marginLeft: 16,

    },
    radioButton: {
        flexDirection: 'row',
        alignSelf: "baseline",
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1.5,

    },
    hello: {
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }

})



