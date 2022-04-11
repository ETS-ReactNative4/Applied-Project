import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
// axios
import Axios from 'axios'
// user context
import { CredentialsContext } from '../components/Context/CredentialsContext'
import { SwipeListView } from 'react-native-swipe-list-view'
// styled components
import {
  AllergenText,
  HiddenButton,
  ListViewHidden2,
  Container,
} from '../components/Styles'
// favourites context
import { useFavourites } from '../components/Context/FavouriteContext'
import FavouriteHeader from '../components/Headers/FavouriteHeader'
import { Icon } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Favourite = () => {
  const {
    FavouritedProducts,
    fetchFavouritedProducts,
    setFavouritedProducts,
  } = useFavourites()
  // user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const navigation = useNavigation()
  const SPACING = 20
  const [swipedRow, setSwipedRow] = useState(null)

  // loads the products on the page
  useEffect(() => {
    fetchFavouritedProducts()
  }, [])

  // method to remove all favourites
  const removeAll = () => {
    // post request to remove all favourites
    Axios.post('http://192.168.0.30:5000/favourite/deleteAll', {
      userFrom: storedCredentials,
    })
      .then((response) => {
        if (response.data.success) {
          // set favouritedProducts state to empty array
          setFavouritedProducts([])
          console.log('Removed all items from favourites')
        } else {
          alert('Failed to remove favourited items')
        }
      })
      .catch((error) => {
        console.log(error)
        fetchFavouritedProducts()
      })
  }

  const onClickRemove = (productId) => {
    // store the productId and current user
    const variable = {
      productId: productId,
      userFrom: storedCredentials,
    }
    // delete a favourited product by id and user credentials
    Axios.post(
      'http://192.168.0.30:5000/favourite/removeFavourites',
      variable,
    ).then((response) => {
      if (response.data.success) {
        console.log('Removed from favourites')

        fetchFavouritedProducts()
      } else {
        alert(' Failed to remove from favourite')
      }
    })
  }

  // if the favouritedProducts exist render them in a list
  return (
    <>
      <FavouriteHeader titleText="Favourites" removeAll={removeAll} />

      <View style={{ backgroundColor: '#C9DFEC', flex: 1 }}>
        {FavouritedProducts.length == 0 && (
          <Container>
            <AllergenText>
              You have no products added to your favourites.
            </AllergenText>
          </Container>
        )}
        {FavouritedProducts.length != 0 && (
          <SwipeListView
            data={FavouritedProducts}
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
                          navigation.navigate('Details1', {product: item} )
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
                          navigation.navigate('Details1', {product: item} )
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
            renderHiddenItem={(data) => {
              return (
                <ListViewHidden2>
                  <HiddenButton
                    onPress={() => onClickRemove(data.item.productId)}
                  >
                    <Entypo name="trash" size={25} color="white" />
                  </HiddenButton>
                </ListViewHidden2>
              )
            }}
            leftOpenValue={80}
            showsVerticalScrollIndicator={false}
            previewRowKey={'0'}
            disableLeftSwipe={true}
            previewOpenValue={80}
            // Handling swiped allergen row
            onRowOpen={(rowKey) => {
              setSwipedRow(rowKey)
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

export default Favourite

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
