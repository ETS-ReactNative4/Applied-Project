import React, { useContext, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native'
import axios from 'axios'
import NotFound from '../components/NotFound'
import { MatchAllergens } from '../components/AllergenMatch'
import ListResultsItems from '../components/ListResultsItems'
import { Icon } from 'react-native-elements'
import Favourite from '../components/Favourite'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import { useProducts } from '../components/Context/ProductContext'
import DetailsHeader from '../components/Headers/DetailsHeader'
import { useAllergens } from '../components/Context/AllergenContext'
import ScanModal from '../components/ScanModal'


const Results = ({ route }) => {
  const product = route.params.product
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
 
  const { fetchProducts } = useProducts()
  const [items, setItems] = useState(false)
  const { allergens } = useAllergens()
  const [visible, setVisible] = React.useState(false);


  if (product === undefined) {
    return (
      <>
        <DetailsHeader titleText="Results" />
        <NotFound />
      </>
    )
  }
  const productId = product._id
  const productName = product.product_name
  const ingredients = product.ingredients_text
  const traces = product.traces_from_user
  //console.log(route.params.product.traces_from_user)
  if (product.ingredients_text === undefined) {
    return (
      <>
        <DetailsHeader titleText="Results" />
        <View style={{ flex: 1, backgroundColor: '#ffa31a' }}>
          <Icon name="question" type="antdesign" size={200} color="#fff" />
          <View style={styles.container}>
            <Text style={styles.text}>
              Sorry, no ingredients found for {product.product_name}{' '}
            </Text>
          </View>
        </View>
      </>
    )
  } else {
    let allergenMatches = MatchAllergens(
      global.allergenData,
      product.allergens_from_ingredients,
    )
    let traceMatches = MatchAllergens(
      global.allergenData,
      product.traces_from_user,
    )

    if (allergenMatches.length || traceMatches.length > 0) {
      console.log(`Allergens found: ${allergenMatches}`)
      console.log(`Traces found: ${traceMatches}`)
      if (!items)
        axios
          .post('http://192.168.0.30:5000/products/addProducts', {
            userFrom: storedCredentials,
            allergens,
            ingredients,
            traces,
            productId,
            productName,
            traceMatches: traceMatches,
            allergenMatches: allergenMatches,
          })
          .then((response) => {
            if (response.data.success) {
              console.log('Product saved to database')
              setItems(!items)
              fetchProducts()
            } else {
              alert(' Failed to save product')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      return (
        <>
          <DetailsHeader titleText="Results" />
          <View style={{ flex: 1, backgroundColor: '#ff3300' }}>
            <View style={styles.icon}>
              <Icon name="warning" type="entypo" size={220} color="#fff" />
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>
                {' '}
                Product Name: {product.product_name}{' '}
              </Text>

              

              <FlatList
                data={allergenMatches}
                renderItem={({ item, index }) => (
                  <ListResultsItems item={item} key={index}></ListResultsItems>
                )}
                keyExtractor={(item, index) => index.toString()}
              ></FlatList>
              <FlatList
                data={traceMatches}
                renderItem={({ item, index }) => (
                  <ListResultsItems item={item} key={index}></ListResultsItems>
                )}
                keyExtractor={(item, index) => index.toString()}

              >
                               
             
              </FlatList>

              <Favourite
                userFrom={storedCredentials}
                productId={productId}
                productName={productName}
                allergenMatches={allergenMatches}
              />
            </View>
                </View>
                
        </>
      )
    } else {
      if (!items)
        axios
          .post('http://192.168.0.30:5000/products/addProducts', {
            userFrom: storedCredentials,
            allergens,
            ingredients,
            traces,
            productId,
            productName,
            traceMatches: traceMatches,
            allergenMatches: allergenMatches,
          })
          .then((response) => {
            if (response.data.success) {
              setItems(!items)
              console.log('Product saved to database')
              fetchProducts()
            } else {
              console.log(response.data)
              alert(' Failed to save product')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      console.log(`No allergens found`)
      return (
        <>
          <DetailsHeader titleText="Results" />
          <View style={{ flex: 1, backgroundColor: '#008000' }}>
            <ScanModal visible={visible}></ScanModal>
            <View>
              <Icon name="check" type="entypo" size={200} color="#fff" />
            </View>
            <View style={styles.container}>
              <Text style={styles.text}>
                {' '}
                Product Name: {product.product_name} {'\n'}{' '}
              </Text>

              {/*<Text style={styles.text}> Ingredients: {route.params.product.ingredients_text} {'\n'} </Text>*/}

              <Text style={styles.text}>No allergens found {'\n'}</Text>
              <Favourite
                userFrom={storedCredentials}
                productId={productId}
                productName={productName}
                allergenMatches={allergenMatches}
              />
             
          
            </View>
          </View>
        </>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginLeft: '5%',
    marginTop: '20%',
    padding: '10%',
  },
  text: {
    marginVertical: 10,
    fontSize: 25,
    textAlign: 'center',
  },
  icon: {
    marginTop: '10%',
  },
  
})

export default Results
