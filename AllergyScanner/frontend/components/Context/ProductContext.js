import React, { createContext, useContext, useEffect, useState } from 'react'
// Axios
import Axios from 'axios'
// user context
import { CredentialsContext } from './CredentialsContext'

//Product Context
const ProductContext = createContext()
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  //user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )

  // Method to find all scanned products
  const fetchProducts = () => {
    Axios.post('http://192.168.0.30:5000/products/getScannedProducts', {
      userFrom: storedCredentials,
    })
      .then((response) => {
        if (response.data.success) {
          // set fetched scanned products to products state
          setProducts(response.data.products)
        } else {
          alert('Failed to get favourited items')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)

export default ProductProvider
