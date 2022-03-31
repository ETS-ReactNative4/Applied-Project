/*import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'


const Details = ({ route }) => {
  const product = route.params.product
  const productId = product.productId
  const yourAllergensSelected = product.allergens
  const tracesOfAllergens = product.traces
  const allergenMatches = product.allergenMatches
  const ingredients = product.ingredients
  const productName = product.productName
  const traceMatches = product.traceMatches
  

  const selectedAllergens = (
    <Text>
      {yourAllergensSelected.map((value, index) => (
        <Text key={value.key}>{(index ? ', ' : '') + value.title}</Text>
      ))}
    </Text>
  )

  const allergenTraces = (
    <Text>
      {tracesOfAllergens.map((value, index) => (
        <Text key={value}>
          {(index ? ', ' : '') +
            value.replace('(en)', '').replaceAll('en:', '')}
        </Text>
      ))}
    </Text>
  )

  const array = allergenMatches.filter((element, index) => {
    return allergenMatches.indexOf(element) === index
  })

  return (
    <>
      <View style={styles.container}>
     
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.itemTitle}>{productName}</Text>
            <View style={styles.view}>
              <Text style={styles.id}>{productId}</Text>
            </View>
          </View>
        </View>
       
        <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} 
           style={{marginBottom: 30}}
          >
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 25 }}>
              Allergens selected
            </Text>
            <Text style={{ marginTop: 20, lineHeight: 22, fontSize: 17 }}>
              {yourAllergensSelected.length == 0 &&
                'You selected no allergens.'}
              {selectedAllergens}
            </Text>
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 25 }}>
              Ingredients
            </Text>
            <Text style={{ marginTop: 20, lineHeight: 22, fontSize: 17 }}>
              {ingredients || 'No ingredients for this product.'}
            </Text>
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 25 }}>
              May contain traces
            </Text>
            <Text style={{ marginTop: 20, lineHeight: 22, fontSize: 17 }}>
              {tracesOfAllergens.length == 0 &&
                'No traces found for this product.'}
              {allergenTraces}
            </Text>
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 25 }}>
              Allergen Matches
            </Text>
            <Text style={{ marginTop: 20, lineHeight: 22, fontSize: 17 }}>
              {array.join(',') || 'No allergen matches.'}
            </Text>
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 25 }}>
              Trace Matches
            </Text>
            <Text style={{ marginTop: 20, lineHeight: 22, fontSize: 17 }}>
              {traceMatches.join(',') || 'No traces matched.'}
            </Text>
            </ScrollView>
        </View>
        
      </View>
      
    </>
  )
}

export default Details

const styles = StyleSheet.create({
  bottomCenter: {
    marginTop: 40,
    fontSize: 30,
  },

  text: {
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#344955',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#C9DFEC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    top: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  backButton: {
    bottom: 50,
  },
  title: {
    marginBottom: 40,
    top: 60,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#fff',
  },
  id: {
    fontSize: 16,
    color: '#fff',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
})


*/

import React, { useContext, View } from 'react'
import {
  Text,
  StatusBar,
  Image,
  SafeAreaView, ScrollView, TouchableOpacity
} from 'react-native'
import { useAllergens } from '../components/Context/AllergenContext'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import Favourite from '../components/Favourite'
import { useNavigation } from '@react-navigation/native'

const ScanResults = ({route}) => {
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )

  const product = route.params.product
  const productId = product.productId
  const yourAllergensSelected = product.allergens
  const tracesOfAllergens = product.traces
  const allergenMatches = product.allergenMatches
  const ingredients = product.ingredients
  const productName = product.productName
  const traceMatches = product.traceMatches
  const image = product.image_front_url;
  const brands = product.brands
  const selectedAllergens = (
    <Text>
      {yourAllergensSelected.map((value, index) => (
        <Text key={value.key}>{(index ? ', ' : '') + value.title}</Text>
      ))}
    </Text>
  )

  const allergenTraces = (
    <Text>
      {tracesOfAllergens.map((value, index) => (
        <Text key={value}>
          {(index ? ', ' : '') +
            value.replace('(en)', '').replaceAll('en:', '')}
        </Text>
      ))}
    </Text>
  )

  const array = allergenMatches.filter((element, index) => {
    return allergenMatches.indexOf(element) === index
  })
  return (
    <>
      <Container>
        <StatusBar barStyle="light-content" />
        <Picture source={image ? { uri: image } : null}>
          <DarkenImg>
            <SafeAreaView>
              <MenuBar>
                <Back>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="#FFF" />
                  </TouchableOpacity>
                 
                </Back>

                <Favourite
                  userFrom={storedCredentials}
                  productId={productId}
                  productName={productName}
                  allergenMatches={allergenMatches}
                  traceMatches={traceMatches}
                />
              </MenuBar>
              <MainInfo>
                <Words title heavy>
                  {productName}
                </Words>
                <Divider />
                <Words bold>{productId}</Words>
                <Words>{brands}</Words>
              </MainInfo>
            </SafeAreaView>
          </DarkenImg>
        </Picture>
        
        <Info>
       
        <ScrollView showsVerticalScrollIndicator={false} 
          style={{marginBottom: -30, marginVertical: -10  ,height: -20}}
         
          >
          <Words dark heavy large>
            Ingredients
          </Words>
          <Words dark small>
            {ingredients || 'No ingredients for this product.'} {'\n'}
          </Words>
          <Words dark heavy large>
            May contain traces of
          </Words>
          <Words dark small>
          {tracesOfAllergens.length == 0 &&
                'No traces found for this product.'}
              {allergenTraces}{'\n'}
          </Words>
          <Words dark heavy large>
            Allergen Matches
          </Words>
          <Words dark small>
            {array.join(',') || 'No allergen matches.'} {'\n'}
          </Words>
          <Words dark heavy large>
            Trace Matches
          </Words>
          <Words dark small>
          {traceMatches.join(',') || 'No traces matched.'}  {'\n'}
          </Words>
          <Words dark heavy large>
            Allergens Selected
          </Words>
          <Words dark small>
          {yourAllergensSelected.length == 0 &&
                'You selected no allergens.'}
              {selectedAllergens}
          </Words>
          </ScrollView>
         
        </Info>
      
      </Container>
    </>
  )
}

export default ScanResults;

const Container = styled.View`
flex: 1
background-color: #fff
`

const Words = styled.Text`
color: ${(props) => (props.dark ? '#000' : '#FFF')}
font-family: "AvenirNext-Regular";

${({ title, large, small }) => {
  switch (true) {
    case title:
      return `font-size: 32px`

    case large:
      return `font-size: 20px`

    case small:
      return `font-size: 13px`
  }
}}

${({ bold, heavy }) => {
  switch (true) {
    case bold:
      return `font-weight: 600`

    case heavy:
      return `font-weight: 700`
  }
}}


`

const Picture = styled.ImageBackground`
  width: 100%;
`

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`

const MainInfo = styled.View`
  padding: 0 32px;
  margin: 200px 0 32px 0;
`

const Divider = styled.View`
  border-bottom-color: #fff;
  border-bottom-width: 2px;
  width: 150px;
  margin: 8px 0;
`
const DarkenImg = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
`
const Info = styled.View`
  padding: 32px;
  margin-top: -24px;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
 
  
`
const Details = styled.View`
  margin-top: 16px;
`

