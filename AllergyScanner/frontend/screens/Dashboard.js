import React, {useContext} from 'react';
import {
    DashboardImage, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import {CredentialsContext} from '../components/CredentialsContext';

const Dashboard = () => {
     // context
     const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
     const {name,email} = storedCredentials;

     const clearLogin = () => {
        AsyncStorage.removeItem('credentials')
        .then(() => {
            // sets  the credentials to empty string
         setStoredCredentials("");
        }).catch(error => console.log(error))
    }
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <DashboardContainer>
                    <PageTitle welcome={true}>Allergy Scanner</PageTitle>
                    <SubTitle welcome={true}>{name || 'John Murphy'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'JohnMurphy@gmail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('../../assets/allergens.jpg')} />
                        <Line />
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>
                                Logout
                         </ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </DashboardContainer>
            </InnerContainer>
        </>
    );
}



export default Dashboard;

