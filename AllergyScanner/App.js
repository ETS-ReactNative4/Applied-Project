import React, { useState } from 'react'
// navigation
import RootStack from './frontend/navigators/RootStack'
// app loading
import AppLoading from 'expo-app-loading'
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'
// credentials context
import { CredentialsContext } from './frontend/components/Context/CredentialsContext'
import AllergenProvider from './frontend/components/Context/AllergenContext'
import FavouriteProvider from './frontend/components/Context/FavouriteContext'
import ProductProvider from './frontend/components/Context/ProductContext'


export default function App() {
  // State
  const [appReady, setAppReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState('')

  // function used to check async storage credentials that exist
  const checkLoginCredentials = () => {
    // pass a key to store the credentials in async storage
    AsyncStorage.getItem('credentials')
      .then((result) => {
        // if result is not null , set the credentials to the result
        if (result !== null) {
          // JSON.parse to change it to an object
          setStoredCredentials(JSON.parse(result))
        } else {
          setStoredCredentials(null)
        }
      })
      .catch((error) => console.log(error))
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <AllergenProvider>
        <FavouriteProvider>
          <ProductProvider>
            <RootStack />
          </ProductProvider>
        </FavouriteProvider>
      </AllergenProvider>
    </CredentialsContext.Provider>
  )
}
