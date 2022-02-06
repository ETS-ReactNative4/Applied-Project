/*import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
const PickAllergens = () => {
    allergens = [
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'lightgrey',
        flex: 1,
        flexWrap: "wrap",
        paddingTop: 264
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
        borderWidth: 1.5
    }
})
export default PickAllergens;
*/

import Header from '../components/Header'
import React, {useState} from 'react';
import {
    Container, DashboardContainer, InnerContainer, PageTitle, SubTitle, StyledFormArea,
    StyledButton, ButtonText, Avatar, Line, AllergyButtons, StyledContainer
} from '../components/Styles';

import {Text} from 'react-native'
import ListAllAllergenItems from '../components/ListAllergenItems'
import InputModal from "../components/InputModal";

const allergens = () => {
     // Modal visibility & input value
  const [modalVisible, setModalVisible] = useState(false);
  const [allergenInputValue, setAllergenInputValue] = useState();

    const initialAllergens = [{
        title: "Eggs",
        key: "1"
    },
    {
        title: "Nuts",
        key: "2"
    },
    {
        title: "Fish",
        key: "3"
    }
]

const [allergens, setAllergens] = useState(initialAllergens);

// clear all allergens
const handleClearAllergens = () => {
        setAllergens([]);
  };

  // function to add new allergen
  const handleAddAllergen = (allergen) => {
    const newAllergens = [...allergens, allergen];
        setAllergens(newAllergens);
        setModalVisible(false);
  };

    return (
        <Container>
        <Header handleClearAllergens={handleClearAllergens}/>
        <ListAllAllergenItems allergens={allergens} setAllergens={setAllergens}/>
        <InputModal allergenInputValue={allergenInputValue}
        setAllergenInputValue={setAllergenInputValue}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddAllergen={handleAddAllergen}
        allergens={allergens}/>
        </Container>
    )
}

export default allergens;