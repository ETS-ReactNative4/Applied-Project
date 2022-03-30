import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AllergenContext = createContext();
const AllergenProvider = ({ children }) => {
    const initialAllergens = []

    const [allergens, setAllergens] = useState(initialAllergens);
    
   const getAllergens = async (key) =>{
      try {
          const value = await AsyncStorage.getItem(key)
          
          return value != null ? JSON.parse(value) : null
        } catch(e) {
          console.log(`Error: ${e}`);
        }
  }
  
  
  const loadAllergens = async () => {
    getAllergens('storedAllergens').then((data) => {
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
          
        })
  }
  
  useEffect(() => {
   loadAllergens();
  }, []);

  return (
    <AllergenContext.Provider value={{ allergens, setAllergens, loadAllergens}}>
      {children}
    </AllergenContext.Provider>
  );
};

export const useAllergens = () => useContext(AllergenContext);

export default AllergenProvider;