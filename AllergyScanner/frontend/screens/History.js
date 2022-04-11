import React, { useEffect, useContext, useState, } from 'react'
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
  AllergenText,
  HiddenButton,
  ListViewHidden2,
  Container
} from '../components/Styles'
import Axios from 'axios'
import { Entypo } from '@expo/vector-icons'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import { useProducts } from '../components/Context/ProductContext'
import HistoryHeader from '../components/Headers/HistoryHeader'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const History = () => {
  const { products, fetchProducts, setProducts } = useProducts()
  const navigation = useNavigation()
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const SPACING = 20
  const [swipedRow, setSwipedRow] = useState(null)

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
      <View style={{ backgroundColor: '#C9DFEC', flex: 1 }}>
        {products.length == 0 && (
          <Container><AllergenText>You have not scanned any items.</AllergenText></Container>
        )}
        {products.length != 0 && (
          <SwipeListView
            data={products}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({ item, index }) => {
              if (item.newMatches.length > 0) {
                
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: SPACING,
                      marginBottom: SPACING,
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      shadowColor: '#000',
                      shadowRadius: 20,
                    }}
                  >
                    <Icon
                      name="warning"
                      type="material"
                      color="#ff3300"
                      size={33}
                      style={styles.iconWarning}
                    />
                    <View style={styles.container}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Details', { product: item })
                        }
                      >
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>
                          {item.productName}
                        </Text>
                        <Text style={{ fontSize: 13, opacity: 0.7 }}>
                          {item.productId}
                        </Text>
                        
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: SPACING,
                      marginBottom: SPACING,
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      shadowColor: '#000',
                      shadowRadius: 20,
                    }}
                  >
                    <Icon
                      name="check"
                      type="entypo"
                      color="#008000"
                      size={33}
                      style={styles.iconCheck}
                    />
                    <View style={styles.container}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Details', { product: item })
                        }
                      >
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>
                          {item.productName}
                        </Text>
                        <Text style={{ fontSize: 13, opacity: 0.7 }}>
                          {item.productId}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            }}
            renderHiddenItem={(data, rowMap) => {
              return (
                <ListViewHidden2>
                  <HiddenButton
                    onPress={() => onClickRemove(data.item.productId, rowMap)}
                  >
                    <Entypo name="trash" size={25} color="white" />
                  </HiddenButton>
                </ListViewHidden2>
              )
            }}
            leftOpenValue={80}
            showsVerticalScrollIndicator={false}
            previewRowKey={'0'}
            previewOpenValue={80}
            disableLeftSwipe={true}
            onRowOpen={(productId) => {
              setSwipedRow(productId)
            }}
            onRowClose={() => {
              setSwipedRow(null)
            }}
          />
        )}

        <StatusBar hidden />
      </View>
    </>
  )
}

export default History

const styles = StyleSheet.create({
  iconCheck: {
    right: '10%',
    top: 15,
    color: 'green',
    fontSize: 20,
    textAlign: 'center',
  },
  iconWarning: {
    //right: "10%",
    top: 5,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    left: 5,
    height: 50,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
})





