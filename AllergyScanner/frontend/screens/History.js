import React, { useEffect, useContext } from 'react'
import { Text, FlatList } from 'react-native'
import { Container } from '../components/Styles'
import Axios from 'axios'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import ListHistory from '../components/ListHistory'
import { useProducts } from '../components/Context/ProductContext'
import HistoryHeader from '../components/Headers/HistoryHeader'

const History = () => {
  const { products, fetchProducts, setProducts } = useProducts()
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  const removeAll = () => {
    Axios.post('http://192.168.0.30:5000/products/delete', {
      userFrom: storedCredentials,
    })
      .then((response) => {
        if (response.data.success) {
          setProducts([])
          console.log('Removed all scanned items')
        } else {
          alert('Failed to get items')
        }
      })
      .catch((error) => {
        console.log(error)
        fetchProducts()
      })
  }

  const onClickRemove = (productId) => {
    const variable = {
      productId: productId,
      userFrom: storedCredentials,
    }

    Axios.post(
      'http://192.168.0.30:5000/products/removeProducts',
      variable,
    ).then((response) => {
      if (response.data.success) {
        console.log('Removed product')

        fetchProducts()
      } else {
        alert(' Failed to remove from products')
      }
    })
  }

  return (
    <>
      <HistoryHeader titleText="Scanned Items" removeAll={removeAll} />
      {products.length == 0 && (
        <Container>
          <Text style={{ left: 30, fontSize: 16, letterSpacing: 1 }}>
            You have no Scanned Items
          </Text>
        </Container>
      )}
      {products.length != 0 && (
        <Container>
          <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <ListHistory
                item={item}
                key={index}
                onClickRemove={onClickRemove}
              ></ListHistory>
            )}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
        </Container>
      )}
    </>
  )
}

export default History
