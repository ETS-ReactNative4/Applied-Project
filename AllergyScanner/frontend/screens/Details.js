import React, { useContext, View } from 'react'
import {
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
// user context
import { CredentialsContext } from '../components/Context/CredentialsContext'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
// favourite component
import Favourite from '../components/Favourite'
// naviagtion
import { useNavigation } from '@react-navigation/native'

const Details = ({ route }) => {
  // user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  // navigation
  const navigation = useNavigation()
  // product details
  const product = route.params.product
  const productId = product.productId
  const yourAllergensSelected = product.allergens
  const traces = product.traces
  const ingredients = product.ingredients
  const productName = product.productName
  const image = product.image
  const brands = product.brands
  const newMatches = product.newMatches
  
  // function to map the allergens
  const selectedAllergens = (
    <Text>
      {yourAllergensSelected.map((value, index) => (
        <Text key={value.key}>{(index ? ', ' : '') + value.title}</Text>
      ))}
    </Text>
  )
  // function to map the traces of allergens
  const tracesOfAllergens = (
    <Text>
      {traces.map((value, index) => (
        <Text key={value}>
          {(index ? ', ' : '') + value.replaceAll('en:', '')}
        </Text>
      ))}
    </Text>
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
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                  </TouchableOpacity>
                </Back>

                <Favourite
                  userFrom={storedCredentials}
                  productId={productId}
                  productName={productName}
                  newMatches={newMatches}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: -30, marginVertical: -10, height: -20 }}
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
              {traces.length == 0 ||
                (traces == '' && 'No traces found for this product.')}
              {tracesOfAllergens}
              {'\n'}
            </Words>
            <Words dark heavy large>
              Allergen Matches
            </Words>
            <Words dark small>
              {newMatches.join(',') || 'No allergen matches.'} {'\n'}
            </Words>

            <Words dark heavy large>
              Allergens Selected
            </Words>
            <Words dark small>
            {yourAllergensSelected.length == 0 && 'You selected no allergens.'}
            {selectedAllergens} {'\n'}
            </Words>
          </ScrollView>
        </Info>
      </Container>
    </>
  )
}

export default Details

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
const texts = styled.View`
  margin-top: 16px;
`
