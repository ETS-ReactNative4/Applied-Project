import React, {useState,useContext,useEffect} from 'react';
import { Container, } from '../components/Styles';
import ListAllergenItems from '../components/ListAllergenItems'
import InputModal from "../components/InputModal";
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useAllergens} from '../components/Context/AllergenContext';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import AllergenHeader from '../components/Headers/AllergenHeader'
import {StatusBar} from 'react-native'
import axios from 'axios'

const PickAllergens = () => {
     // Modal visibility & input value
  const [modalVisible, setModalVisible] = useState(false);
  const [allergenInputValue, setAllergenInputValue] = useState();
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const { allergens, setAllergens, loadAllergens } = useAllergens();
  
// edit existing allergen item
const [allergenToBeEdited, setAllergenToBeEdited] = useState(null);

useEffect(() => {
  loadAllergens();
  
}, [])

// clear all allergens
const handleClearAllergens = () => {

  axios.post('http://192.168.0.30:5000/allergens/removeAll', {
  userFrom: storedCredentials,
})
  .then(response => {
      if (response.data.success) {
        setAllergens([])
        loadAllergens();
        console.log("Removed all allergens from list")
      } else {
          alert('Failed to get allergens')
      }
  }).catch(error=>{
      console.log(error);
     
  });
  };

  // function to add new allergen
  const handleAddAllergen = (allergen) => {
    const newAllergens = [...allergens, allergen];

    const variable = {
      userFrom: storedCredentials,
      title: allergen.title,
      key: allergen.key
       
   }
     
     axios.post('http://192.168.0.30:5000/allergens/addAllergens', variable )
     .then((res) => {
         setAllergens(newAllergens);
         setModalVisible(false)
         loadAllergens();
         console.log(res.data)
     })
     .catch(err => {
         console.log(err)
     })
  };

  const handleTriggerEdit = (item) => {
    setAllergenToBeEdited(item);
    setModalVisible(true);
    setAllergenInputValue(item.title);
  }

  const handleEditAllergen = (editedAllergen) => {
    const newAllergens = [...allergens];
    const allergenIndex = allergens.findIndex((allergen) => allergen._id === editedAllergen._id);
    newAllergens.splice(allergenIndex, 1, editedAllergen);


    const variable = {
      userFrom: storedCredentials,
      title: editedAllergen.title,
      key: editedAllergen.key
       
   }

    axios.put(`http://192.168.0.30:5000/allergens/editAllergens/${editedAllergen._id}` , variable)
    .then((res) => {
        setAllergens(newAllergens);
         setAllergenToBeEdited(null);
        setModalVisible(false);
     loadAllergens();
      console.log(res.data)})
    .catch(err => {
      console.log(err);
    })
  };

    return (   
      
     
        
           
        <>
        <AllergenHeader titleText='Allergens' handleClearAllergens={handleClearAllergens}/>
        <Container>
        {/*<Header handleClearAllergens={handleClearAllergens}/>*/}
        <ListAllergenItems allergens={allergens}
         setAllergens={setAllergens}
         loadAllergens={loadAllergens}
         handleTriggerEdit={handleTriggerEdit}
         />

        <InputModal allergenInputValue={allergenInputValue}
        setAllergenInputValue={setAllergenInputValue}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddAllergen={handleAddAllergen}
        allergens={allergens}
        allergenToBeEdited={allergenToBeEdited}
        setAllergenToBeEdited={setAllergenToBeEdited}
        handleEditAllergen={handleEditAllergen}
        />
        <StatusBar hidden />
        </Container>
      </>
               
       
            
      
  
        
    )
}
export default PickAllergens;