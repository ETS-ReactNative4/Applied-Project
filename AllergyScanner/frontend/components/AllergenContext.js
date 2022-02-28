import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AllergenContext = createContext();
const AllergenProvider = ({ children }) => {
    const initialAllergens = []

    const [allergens, setAllergens] = useState(initialAllergens);

    const loadAllergens = () => {
   
        AsyncStorage.getItem("storedAllergens")
          .then((data) => {
            if (data !== null) {
              setAllergens(JSON.parse(data));
            
            }
          }) 
          .catch((error) => console.log(error));
      };

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