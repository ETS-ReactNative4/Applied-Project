import React, { useContext, useState, useEffect } from 'react';
import {
    DashboardImage, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line, AllergyButtons, StyledContainer
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
    const allergens = [
        { allergen: 'Nuts' },
        { allergen: 'Milk' },
        { allergen: 'Eggs' },
        { allergen: 'Fish' },
        { allergen: 'Shellfish' },
        { allergen: 'Wheat' },
        { allergen: 'Soybeans' },
        { allergen: 'Treenuts' },
        { allergen: 'Celery' },
    ]
    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email } = storedCredentials;
    const [data, setData] = useState(allergens);

    useEffect(() => {

        allergens.map((data, index) => {
            data.isSelected = false;
            return { ...data };

        })
        setData(data);
        console.log('array data ==> ', data);
    }
    )

    const clearLogin = () => {
        AsyncStorage.removeItem('credentials')
            .then(() => {
                // sets  the credentials to empty string
                setStoredCredentials("");
            }).catch(error => console.log(error))
    }

    const selectionHandler = (ind) => {
        const array = data.map((data, index) => {
            if (ind == index) {
                data.isSelected = !data.isSelected;
            }
            return { ...data }
        })
        setData(array);
        console.log("selection handler ==> ", array);
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
                        <View style={styles.hello}><Text style={styles.hello} >Please Select your Allergens...</Text></View>

                    </StyledFormArea>

                    <View style={styles.container} >

                        {

                            data.map((data, index) => {
                                return (

                                    <View style={styles.radioView} key={index}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                selectionHandler(index)
                                            }}
                                        >
                                            <View style={[styles.radioButton, {
                                                backgroundColor: data.isSelected ? '#aee0a8' : 'white',
                                                borderColor: data.isSelected ? '#15b502' : 'grey'
                                            }]} >
                                                <Text style={{ color: 'black' }}>{data.allergen}</Text>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )

                            })

                        }
                        <Text>{"\n"}{"\n"}{"\n"}</Text>
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

