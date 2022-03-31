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
import { Icon } from 'react-native-elements'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import { useProducts } from '../components/Context/ProductContext'
import DetailsHeader from '../components/Headers/DetailsHeader'
import { useAllergens } from '../components/Context/AllergenContext'
import ScanModal from '../components/ScanModal'
import ScanResults from './ScanResults'


const Results = ({ route }) => {
 
  const product = route.params.product
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const { fetchProducts } = useProducts()
  const [items, setItems] = useState(false)
  const { allergens } = useAllergens()
  const [visible, setVisible] = React.useState(true);

  


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
  const traces = route.params.product.traces;
 const image = product.image_front_url;
  const brands = product.brands;
  
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
  } else {
    let allergenMatches = MatchAllergens(
      global.allergenData,
      product.allergens_from_ingredients,
    )
    let traceMatches = MatchAllergens(
      global.allergenData,
      product.traces,
    )

    let allMatches = [...allergenMatches, ...traceMatches]
    console.log(`All matches : ${allMatches}`)
    

    var newMatches = [...new Set(allMatches)];
    console.log(`All matches (no duplicates): ${newMatches}`)
  
    if (newMatches.length > 0) {

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
            newMatches:newMatches
           
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
            <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
            <Icon name="close" type="material"   size={30} color="#565656" style={{bottom: 5}}/>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center',height: 150, width: 150, marginVertical: 10}}>
        <Icon name="warning" type="entypo"   size={150} color="red"/>
        
        </View>
        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
        {productName}  contains the following allergens:
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
            

            
              <ScanResults userFrom={storedCredentials}
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
            productId,
            productName,
            newMatches:newMatches
          
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
            <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
            <Icon name="close" type="material"   size={30} color="#565656" style={{bottom: 5}}/>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center',height: 150, width: 150, marginVertical: 10}}>
        <Icon name="check-circle" type="material"   size={150}color="green"/>
        
        </View>
        <Text style={{marginVertical: 30, fontSize: 30, textAlign: 'center'}}>
        {product.product_name}
        </Text>
        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>No allergens found</Text>
            </View>
            </ScanModal>
        
              <ScanResults userFrom={storedCredentials}
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
    //left: 90,
  },
})

export default Results
