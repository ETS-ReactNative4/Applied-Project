import React, { useContext, View } from 'react'
import {
  Text,
  StatusBar,
  Image,
  SafeAreaView, ScrollView
} from 'react-native'
import { useAllergens } from '../components/Context/AllergenContext'
import { CredentialsContext } from '../components/Context/CredentialsContext'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import Favourite from '../components/Favourite'

const ScanResults = (props) => {
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const { allergens } = useAllergens()

  const productId = props.productId
  const productName = props.productName
  const newAllergen = props.newAllergens
  const brands = props.brands
  const newTraces = props.newTraces
  const ingredients = props.ingredients
  const image = props.image
  const traces = props.traces

  const mappingAllergens = (
    <Text>
      {allergens.map((value, index) => (
        <Text key={value.key}>{(index ? ', ' : '') + value.title}</Text>
      ))}
    </Text>
  )

  const mappingTraces = (
    <Text>{traces.replaceAll('(en)', '').replaceAll('en:', '')}</Text>
  )
  return (
    <>
      <Container>
        <StatusBar barStyle="light-content" />
        <Picture source={image ? { uri: image } : null}>
          <DarkenImg>
            <SafeAreaView>
              <MenuBar>
                <Back>
                  <AntDesign name="arrowleft" size={24} color="#FFF" />

                  <Words style={{ marginLeft: 10 }}>Ingredients</Words>
                </Back>

                <Favourite
                  userFrom={storedCredentials}
                  productId={productId}
                  productName={productName}
                  allergenMatches={newAllergen}
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
            {mappingTraces} {'\n'}
          </Words>
          <Words dark heavy large>
            Allergen Matches
          </Words>
          <Words dark small>
            {newAllergen || 'No allergen matches.'} {'\n'}
          </Words>
          <Words dark heavy large>
            Trace Matches
          </Words>
          <Words dark small>
            {newTraces.join(',') || 'No trace matches.'} {'\n'}
          </Words>
          <Words dark heavy large>
            Allergens Selected
          </Words>
          <Words dark small>
            {allergens.length == 0 && 'You selected no allergens.'}
            {mappingAllergens} {'\n'}
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
