import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
// user context
import { CredentialsContext } from './CredentialsContext'

// Allergen context
const AllergenContext = createContext()
const AllergenProvider = ({ children }) => {
  // initial allergens
  const initialAllergens = []

  //user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  // allergen state
  const [allergens, setAllergens] = useState(initialAllergens)

  // method to find all allergens
  const loadAllergens = async () => {
    axios
      .post('http://192.168.0.30:5000/allergens', {
        userFrom: storedCredentials,
      })
      .then((response) => {
        if (response.data.success) {
          // save data fetched in allergens state
          setAllergens(response.data.allergens)
          // set the result to global.allergenData so its accessible from anywhere
          global.allergenData = response.data.allergens
          console.log(`${JSON.stringify(response.data.allergens)}`)
        } else {
          alert('Failed to get favourited items')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AllergenContext.Provider
      value={{ allergens, setAllergens, loadAllergens }}
    >
      {children}
    </AllergenContext.Provider>
  )
}

export const useAllergens = () => useContext(AllergenContext)

export default AllergenProvider
