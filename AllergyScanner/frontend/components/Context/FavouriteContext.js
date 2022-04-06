import React, { createContext, useContext, useState, useEffect } from 'react'
import Axios from 'axios'
// user context
import { CredentialsContext } from './CredentialsContext'

// Favourite Context
const FavouriteContext = createContext()
const FavouriteProvider = ({ children }) => {
  const [FavouritedProducts, setFavouritedProducts] = useState([])
  //user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )

  // method to find all favourites
  const fetchFavouritedProducts = () => {
    Axios.post('http://192.168.0.30:5000/favourite/getFavouritedProduct', {
      userFrom: storedCredentials,
    })
      .then((response) => {
        if (response.data.success) {
          // save data fetched in favouritedProducts state
          setFavouritedProducts(response.data.favourites)
        } else {
          alert('Failed to get favourited items')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <FavouriteContext.Provider
      value={{
        FavouritedProducts,
        setFavouritedProducts,
        fetchFavouritedProducts,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  )
}

export const useFavourites = () => useContext(FavouriteContext)

export default FavouriteProvider
