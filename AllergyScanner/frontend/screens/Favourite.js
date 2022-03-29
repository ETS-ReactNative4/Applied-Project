import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native'
import Axios from 'axios'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
  SwipedAllergenText,
  AllergenText,
  HiddenButton,
  ListViewHidden2,
  HeaderButton,
} from '../components/Styles'
import { useFavourites } from '../components/Context/FavouriteContext'
import FavouriteHeader from '../components/Headers/FavouriteHeader'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

const Favourite = () => {
  const {
    FavouritedProducts,
    fetchFavouritedProducts,
    setFavouritedProducts,
  } = useFavourites()
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const navigation = useNavigation()
  const SPACING = 20
  const [swipedRow, setSwipedRow] = useState(null)

  useEffect(() => {
    fetchFavouritedProducts()
  }, [])

  const removeAll = () => {
    Axios.post('http://192.168.0.30:5000/favourite/deleteAll', {
      userFrom: storedCredentials,
    })
      .then((response) => {
        if (response.data.success) {
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
    const variable = {
      productId: productId,
      userFrom: storedCredentials,
    }

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

  return (
    <>
      <FavouriteHeader titleText="Favourites" removeAll={removeAll} />

      <View style={{ backgroundColor: '#C9DFEC', flex: 1 }}>
        {FavouritedProducts.length == 0 && (
          <AllergenText>
            You have no products added to your favourites.
          </AllergenText>
        )}
        {FavouritedProducts.length != 0 && (
          <SwipeListView
            data={FavouritedProducts}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: SPACING,
              paddingTop: StatusBar.currentHeight || 42,
            }}
            renderItem={({ item, index }) => {
              if (item.allergenMatches.length > 0) {
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
                      <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        {item.productName}
                      </Text>
                      <Text style={{ fontSize: 13, opacity: 0.7 }}>
                        {item.productId}
                      </Text>
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
                      <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        {item.productName}
                      </Text>
                      <Text style={{ fontSize: 13, opacity: 0.7 }}>
                        {item.productId}
                      </Text>
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
