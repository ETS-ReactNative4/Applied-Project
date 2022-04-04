import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import {CredentialsContext} from './CredentialsContext';

const AllergenContext = createContext();
const AllergenProvider = ({ children }) => {
    const initialAllergens = []
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [allergens, setAllergens] = useState(initialAllergens);
    
  /* const getAllergens = async (key) =>{
      try {
          const value = await AsyncStorage.getItem(key)
          
          return value != null ? JSON.parse(value) : null
        } catch(e) {
          console.log(`Error: ${e}`);
        }
  }*/
  
  
  const loadAllergens = async () => {

    axios.post('http://192.168.0.30:5000/allergens', {userFrom: storedCredentials})
            .then(response => {
                if (response.data.success) {
                    setAllergens(response.data.allergens)
                    global.allergenData = response.data.allergens
                    console.log(`${JSON.stringify( response.data.allergens)}`);
                    //console.log(response.data.allergens)
                } else {
                    alert('Failed to get favourited items')
                }
            }).catch(error=>{
                console.log(error);
            });
    /*getAllergens('storedAllergens').then((data) => {
          if(data === null){
            getAllergens('storedAllergens').then((data) => {
                    setAllergens(data);
                    global.allergenData = data;
                    console.log(`${JSON.stringify(data)}`);
                    }).then()
          } else{
            setAllergens(data);
            global.allergenData = data;
            console.log(`${JSON.stringify(data)}`);
          }
          
        })*/
  }
  

 /* useEffect(() => {
   loadAllergens();
  }, []);*/

  return (
    <AllergenContext.Provider value={{ allergens, setAllergens, loadAllergens}}>
      {children}
    </AllergenContext.Provider>
  );
};

export const useAllergens = () => useContext(AllergenContext);

export default AllergenProvider;