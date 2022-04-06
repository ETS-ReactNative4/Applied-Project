import React, { useContext, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import axios from 'axios'
import NotFound from '../components/NotFound'
// function to match allergens
import { MatchAllergens } from '../components/AllergenMatch'
import { Icon } from 'react-native-elements'
// user context
import { CredentialsContext } from '../components/Context/CredentialsContext'
// products context
import { useProducts } from '../components/Context/ProductContext'
import DetailsHeader from '../components/Headers/DetailsHeader'
// allergens context
import { useAllergens } from '../components/Context/AllergenContext'
// modal that shows result of scan
import ScanModal from '../components/ScanModal'
// results page
import ScanResults from './ScanResults'

const Results = ({ route }) => {
  // getting route.params from scan result
  const product = route.params.product
  // user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const { fetchProducts } = useProducts()
  const [items, setItems] = useState(false)
  // allergens
  const { allergens } = useAllergens()
  // modal visibilty
  const [visible, setVisible] = React.useState(true)

  // return not found page if barcode doesn't exist
  if (product === undefined) {
    return (
      <>
        <DetailsHeader titleText="Results" />
        <NotFound />
      </>
    )
  }
  // variables for product information
  const productId = product._id
  const productName = product.product_name
  const ingredients = product.ingredients_text
  const traces = route.params.product.traces
  const image = product.image_front_url
  const brands = product.brands

  // if there is no ingredients, display message
  if (product.ingredients_text === undefined) {
    return (
      <>
        <DetailsHeader titleText="Results" />
        <View style={{ flex: 1, backgroundColor: '#ffa31a' }}>
          <Icon name="question" type="antdesign" size={200} color="#fff" />
          <View style={styles.container}>
            <Text style={styles.text}>
              Sorry, no ingredients found for {productName}
            </Text>
          </View>
        </View>
      </>
    )
  }
  // if ingredients exist
  else {
    // match allergens allergens_from_ingredients
    let allergenMatches = MatchAllergens(
      global.allergenData,
      product.allergens_from_ingredients,
    )
    // match allergens with traces
    let traceMatches = MatchAllergens(global.allergenData, product.traces)

    // combine both allergen matches and trace matches into allMatches
    let allMatches = [...allergenMatches, ...traceMatches]

    // get rid of duplicates
    var newMatches = [...new Set(allMatches)]
    console.log(`All matches: ${newMatches}`)

    // if the matches is greater than 0
    if (newMatches.length > 0) {
      console.log(`Allergens found: ${allergenMatches}`)
      console.log(`Traces found: ${traceMatches}`)

      // post request to add a scanned product
      if (!items)
        axios
          .post('http://192.168.0.30:5000/products/addProducts', {
            userFrom: storedCredentials,
            allergens,
            ingredients,
            traces,
            brands,
            productId,
            productName,
            newMatches: newMatches,
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
          <View style={{ flex: 1, backgroundColor: '#ff3300' }}>
            <ScanModal visible={visible}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon
                      name="close"
                      type="material"
                      size={30}
                      color="#565656"
                      style={{ bottom: 5 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    height: 150,
                    width: 150,
                    marginVertical: 10,
                  }}
                >
                  <Icon name="warning" type="entypo" size={150} color="red" />
                </View>
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  {productName} contains the following allergens:
                </Text>

                <ScrollView>
                  {newMatches.map((value, index) => (
                    <View style={styles.products} key={index}>
                      <Icon
                        name="dangerous"
                        type="material"
                        size={35}
                        color="red"
                        style={{ right: 2 }}
                      />
                      <Text style={styles.item}>{value}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScanModal>

            <ScanResults
              userFrom={storedCredentials}
              productId={productId}
              productName={productName}
              brands={brands}
              image={image}
              traces={traces}
              ingredients={ingredients}
              newMatches={newMatches}
            />
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
            brands,
            productId,
            productName,
            newMatches: newMatches,
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
          <View style={{ flex: 1, backgroundColor: '#008000' }}>
            <ScanModal visible={visible}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon
                      name="close"
                      type="material"
                      size={30}
                      color="#565656"
                      style={{ bottom: 5 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    height: 150,
                    width: 150,
                    marginVertical: 10,
                  }}
                >
                  <Icon
                    name="check-circle"
                    type="material"
                    size={150}
                    color="green"
                  />
                </View>
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 30,
                    textAlign: 'center',
                  }}
                >
                  {product.product_name}
                </Text>
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  No allergens found
                </Text>
              </View>
            </ScanModal>

            <ScanResults
              userFrom={storedCredentials}
              productId={productId}
              productName={productName}
              brands={brands}
              image={image}
              traces={traces}
              ingredients={ingredients}
              newMatches={newMatches}
            />
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
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  item: {
    fontSize: 30,
    textAlign: 'center',
  },
  items: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  products: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 5,
    
  },
})

export default Results
