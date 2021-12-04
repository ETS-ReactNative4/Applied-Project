import React from 'react';
import {
    DashboardImage, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';

const Dashboard = ({navigation, route}) => {
    const {name,email} = route.params;
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
                        <StyledButton onPress={() => navigation.navigate("Login")}>
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

