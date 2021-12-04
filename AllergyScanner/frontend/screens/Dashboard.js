import React from 'react';
import {
    DashboardImage, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';

const Dashboard = ({navigation}) => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <DashboardContainer>
                    <PageTitle welcome={true}>Allergy Scanner</PageTitle>
                    <SubTitle welcome={true}>Welcome..</SubTitle>
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

