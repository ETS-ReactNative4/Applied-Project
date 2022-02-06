import Header from '../components/Header'
import React, { useState } from 'react';
import { Container } from '../components/Styles';
import { Text } from 'react-native'
import ListAllAllergenItems from '../components/ListAllergenItems';
import InputModal from "../components/InputModal";

const PickAllergens = () => {

    // Modal visibility & input value
    const [modalVisible, setModalVisible] = useState(false);
    const [allergenInputValue, setAllergenInputValue] = useState();
    const [allergens, setAllergens] = useState(initialAllergens);
    // edit existing allergen item
    const [allergenToBeEdited, setAllergenToBeEdited] = useState(null);

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

    // editing allergen
    const handleTriggerEdit = (item) => {
        setAllergenToBeEdited(item);
        setModalVisible(true);
        setAllergenInputValue(item.title);
    };

    const handleEditAllergen = (editedAllergen) => {
        const newAllergens = [...allergens];
        const allergenIndex = allergens.findIndex((allergen) => allergen.key === editedAllergen.key);
        newAllergens.splice(allergenIndex, 1, editedAllergen);
        setAllergens(newAllergens);
        setAllergenToBeEdited(null);
        setModalVisible(false);
    };

    return (
        <Container>
            <Header handleClearAllergens={handleClearAllergens} />
            <ListAllAllergenItems
                allergens={allergens}
                setAllergens={setAllergens}
                handleTriggerEdit={handleTriggerEdit} />

            <InputModal allergenInputValue={allergenInputValue}
                setAllergenInputValue={setAllergenInputValue}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddAllergen={handleAddAllergen}
                allergens={allergens}
                allergenToBeEdited={allergenToBeEdited}
                setAllergenToBeEdited={setAllergenToBeEdited}
                handleEditAllergen={handleEditAllergen} />

        </Container>
    )
}

export default PickAllergens;