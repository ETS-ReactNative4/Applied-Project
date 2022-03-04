import React, { createContext, useContext, useState } from 'react';
import Axios from 'axios';
import {CredentialsContext} from './CredentialsContext';

const FavouriteContext = createContext();
const FavouriteProvider = ({ children }) => {
    
    const [FavouritedProducts, setFavouritedProducts] = useState([])
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    
      const fetchFavouritedProducts = () => {
        Axios.post('http://192.168.0.30:5000/favourite/getFavouritedProduct', {userFrom: storedCredentials})
            .then(response => {
                if (response.data.success) {
                    setFavouritedProducts(response.data.favourites)
                } else {
                    alert('Failed to get favourited items')
                }
            }).catch(error=>{
                console.log(error);
            });
        }

  return (
    <FavouriteContext.Provider value={{ FavouritedProducts, setFavouritedProducts, fetchFavouritedProducts}}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);

export default FavouriteProvider;