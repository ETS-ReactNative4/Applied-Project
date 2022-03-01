import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import {
     StyledContainer
} from '../components/Styles';
import NotFound from '../components/NotFound'
import {MatchAllergens} from '../components/AllergenMatch'
import ListResultsItems from '../components/ListResultsItems'

const Results = ({ route }) => {
    if (route.params.product === undefined) {
        return (
            <NotFound />
          )
       } else { 
          
        let allergenMatches = MatchAllergens(global.allergenData, route.params.product.ingredients_text);   
        
        if(!route.params.product.ingredients_n){
            return(
                <View >
                                    <Text>No ingredients found for {route.params.product.product_name} </Text>
                                    
                                </View>
            )
        }

        else if(allergenMatches.length > 0){
        console.log(`Allergens found: ${allergenMatches}`)
        return(
            <View>
                <Text>{route.params.product.product_name} contains the following allergens:</Text>
                <FlatList data={allergenMatches}
                renderItem={({item, index}) => <ListResultsItems item={item} key={index}></ListResultsItems>}
                keyExtractor={(item,index) => index.toString()}
                ></FlatList>
            </View>
        )

        }  else {
            console.log(`No allergens found`)
            return(
            <View>
                                <Text>No allergens found for {route.params.product.product_name}</Text>
                            </View>
            )}
}
      
   
};

const styles = StyleSheet.create({
    container: {
      
        
            flex: 1,
            flexDirection: 'column',
            padding: 10,
    
    },
    body: {
        flex: 1,
        alignItems: 'center',
       
        justifyContent: 'center',
    },
  });

export default Results; 



