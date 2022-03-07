import React,{useContext} from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity , ScrollView} from 'react-native';

import NotFound from '../components/NotFound'
import {MatchAllergens} from '../components/AllergenMatch'
import ListResultsItems from '../components/ListResultsItems'
import {Icon} from 'react-native-elements';
import Favourite from '../components/Favourite';
import {CredentialsContext} from '../components/Context/CredentialsContext';


const Results = ({ route }) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const productId = route.params.product._id
    const productName = route.params.product.product_name
    if (route.params.product === undefined) {
        return (
           
            <NotFound />
          )
       } 
        if (route.params.product.ingredients_text === undefined) {
            return(
                
            <View style={{flex: 1,backgroundColor: '#ffa31a'}}>
                <Icon name="question" type="antdesign"  size={200} color="#fff"/>
                <View style={styles.container}>
                <Text style={styles.text}>Sorry, no ingredients found for {route.params.product.product_name} </Text>
                </View>         
                                </View>)}
        else {
        let allergenMatches = MatchAllergens(global.allergenData, route.params.product.ingredients_text);   
        
         if(allergenMatches.length > 0){
        console.log(`Allergens found: ${allergenMatches}`)
        return(
            <View style={{flex: 1,backgroundColor: '#ff3300'}}>
                <View>
                            <Icon name="warning" type="entypo"  size={200} color="#fff"/>
                        </View>
                        
            <View style={styles.container}>
               
            <Text style={styles.text}> Product Name: {route.params.product.product_name} {'\n'} </Text>
                
                <Text style={styles.text}> Ingredients: {route.params.product.ingredients_text} {'\n'} </Text>
                
                <FlatList data={allergenMatches}
                renderItem={({item, index}) => <ListResultsItems item={item} key={index}></ListResultsItems>}
                keyExtractor={(item,index) => index.toString()}
                ></FlatList>
                
               
                <Favourite userFrom={storedCredentials} productId={productId} productName={productName} allergenMatches={allergenMatches}/>
            </View>
            
            </View>
        )

        }  else {
            
            console.log(`No allergens found`)
            return(
                <View style={{flex: 1,backgroundColor: '#008000'}}>
                    <View >
                            <Icon name="check" type="entypo"  size={200} color="#fff"/>
                        </View>
            <View style={styles.container}>
            <Text style={styles.text}> Product Name: {route.params.product.product_name} {'\n'} </Text>
            
            <Text style={styles.text}> Ingredients: {route.params.product.ingredients_text} {'\n'} </Text>
            
                                <Text style={styles.text}>No allergens found</Text>
                                <Favourite userFrom={storedCredentials} productId={productId} productName={productName} allergenMatches={allergenMatches}/>
                            </View>
                            </View>
            )}
}
      
   
};

const styles = StyleSheet.create({
    
    container: {
        width:"90%",
        height: "60%",
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft:'5%',
        marginTop: '5%'
,        padding: "10%",
      },
      text: {
        marginVertical: 10,
        fontSize: 25,
        textAlign: 'center',
      },
  });

export default Results; 



