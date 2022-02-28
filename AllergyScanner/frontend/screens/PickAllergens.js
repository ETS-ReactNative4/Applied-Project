import Header from '../components/Header'
import React, {useState,useContext,useEffect} from 'react';
import { Container, } from '../components/Styles';
import {Text} from 'react-native'
import ListAllergenItems from '../components/ListAllergenItems'
import InputModal from "../components/InputModal";
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
//import {CredentialsContext} from '../components/CredentialsContext';
import  {useAllergens} from '../components/AllergenContext';

const PickAllergens = () => {
     // Modal visibility & input value
  const [modalVisible, setModalVisible] = useState(false);
  const [allergenInputValue, setAllergenInputValue] = useState();
  const [ready, setReady] = useState(false);
  
  const { allergens, setAllergens, loadAllergens } = useAllergens();
  
  //const initialAllergens = []

  //const [allergens, setAllergens] = useState(initialAllergens);


// edit existing todo item
const [allergenToBeEdited, setAllergenToBeEdited] = useState(null);

// clear all allergens
const handleClearAllergens = () => {
    // Saving to async storage
    AsyncStorage.setItem("storedAllergens", JSON.stringify([]))
      .then(() => {
        setAllergens([]);
        
      })
      .catch((error) => console.log(error));
  };

 

  // function to add new allergen
  const handleAddAllergen = (allergen) => {
    const newAllergens = [...allergens, allergen];

    // Saving to async storage
    AsyncStorage.setItem("storedAllergens", JSON.stringify(newAllergens))
      .then(() => {
        setAllergens(newAllergens);
        
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const handleTriggerEdit = (item) => {
    setAllergenToBeEdited(item);
    setModalVisible(true);
    setAllergenInputValue(item.title);
  }

  const handleEditAllergen = (editedAllergen) => {
    const newAllergens = [...allergens];
    const allergenIndex = allergens.findIndex((allergen) => allergen.key === editedAllergen.key);
    newAllergens.splice(allergenIndex, 1, editedAllergen);

    // Saving to async storage
    AsyncStorage.setItem("storedAllergens", JSON.stringify(newAllergens))
      .then(() => {
        setAllergens(newAllergens);
        setAllergenToBeEdited(null);
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };


  /*const loadAllergens = () => {
   
    AsyncStorage.getItem("storedAllergens")
      .then((data) => {
        if (data !== null) {
          setAllergens(JSON.parse(data));
          
          
        }
      }) 
      .catch((error) => console.log(error));
  };*/

  



  /*if (!ready) {
    return (
      <AppLoading
        startAsync={loadAllergens}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }*/

    return (
     
           
        <Container>
        <Header handleClearAllergens={handleClearAllergens}/>
        <ListAllergenItems allergens={allergens}
         setAllergens={setAllergens}
         handleTriggerEdit={handleTriggerEdit}/>

        <InputModal allergenInputValue={allergenInputValue}
        setAllergenInputValue={setAllergenInputValue}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddAllergen={handleAddAllergen}
        allergens={allergens}
        allergenToBeEdited={allergenToBeEdited}
        setAllergenToBeEdited={setAllergenToBeEdited}
        handleEditAllergen={handleEditAllergen}/>
        </Container>
           
            
      
  
        
    )
}
export default PickAllergens;