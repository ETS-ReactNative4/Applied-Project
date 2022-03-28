import React from 'react'
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
