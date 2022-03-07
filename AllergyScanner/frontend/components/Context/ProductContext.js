import React, { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import {CredentialsContext} from './CredentialsContext';

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
    
    const [products, setProducts] = useState([])
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    
    
      const fetchProducts = () => {

        Axios.post('http://192.168.0.30:5000/products/getScannedProducts', {userFrom: storedCredentials})
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                    //console.log(response.data.products)
                } else {
                    alert('Failed to get favourited items')
                }
            }).catch(error=>{
                console.log(error);
            });
        
        }

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export default ProductProvider;