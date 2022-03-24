import React,{useContext,useState} from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity , ScrollView} from 'react-native';
import axios from 'axios'
import NotFound from '../components/NotFound'
import {MatchAllergens} from '../components/AllergenMatch'
import ListResultsItems from '../components/ListResultsItems'
import {Icon} from 'react-native-elements';
import Favourite from '../components/Favourite';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import { useProducts } from '../components/Context/ProductContext';


const Results = ({ route }) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const productId = route.params.product._id
    const productName = route.params.product.product_name
    const { fetchProducts } = useProducts();
    const [items, setItems] = useState(false)
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
        let allergenMatches = MatchAllergens(global.allergenData, route.params.product.allergens_from_ingredients);   
        
         if(allergenMatches.length > 0){
        console.log(`Allergens found: ${allergenMatches}`)
        if(!items)
        axios.
            post('http://192.168.0.30:5000/products/addProducts', {userFrom: storedCredentials, productId, productName, allergenMatches:allergenMatches} )
            .then(response=> {
                if(response.data.success) {
                   console.log("Product saved to database")
                   setItems(!items)
                   fetchProducts();
                } else {
                    alert(' Failed to save product')
                }
            }).catch(error=>{
                console.log(error);
            });
        return(
            <View style={{flex: 1,backgroundColor: '#ff3300'}}>
                <View style={styles.icon}>
                            <Icon name="warning" type="entypo"  size={220} color="#fff"/>
                        </View>
                        
            <View style={styles.container}>
               
            <Text style={styles.text}> Product Name: {route.params.product.product_name} </Text>
                
                {/*<Text style={styles.text}> Ingredients: {route.params.product.ingredients_text} {'\n'} </Text>*/}
                
                <FlatList data={allergenMatches}
                renderItem={({item, index}) => <ListResultsItems item={item} key={index}></ListResultsItems>}
                keyExtractor={(item,index) => index.toString()}
                ></FlatList>
                
              
                <Favourite userFrom={storedCredentials} productId={productId} productName={productName} allergenMatches={allergenMatches}/>
            </View>
            
            </View>
        )

        }  else {
            if(!items)
            axios.
            post('http://192.168.0.30:5000/products/addProducts', {userFrom: storedCredentials, productId, productName, allergenMatches:allergenMatches} )
            .then(response=> {
                if(response.data.success) {
                    setItems(!items)
                   console.log("Product saved to database")
                   fetchProducts();
                } else {
                    console.log(response.data)
                    alert(' Failed to save product')
                }
            }).catch(error=>{
                console.log(error);
            });
            console.log(`No allergens found`)
            return(
                <View style={{flex: 1,backgroundColor: '#008000'}}>
                    <View >
                            <Icon name="check" type="entypo"  size={200} color="#fff"/>
                        </View>
            <View style={styles.container}>
            <Text style={styles.text}> Product Name: {route.params.product.product_name} {'\n'} </Text>
            
            {/*<Text style={styles.text}> Ingredients: {route.params.product.ingredients_text} {'\n'} </Text>*/}
            
                                <Text style={styles.text}>No allergens found {'\n'}</Text>
                                <Favourite userFrom={storedCredentials} productId={productId} productName={productName} allergenMatches={allergenMatches}/>
                                
                            </View>
                            </View>
            )}
}
      
   
};

const styles = StyleSheet.create({
    
    container: {
        width:"90%",
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft:'5%',
        marginTop: '20%'
,        padding: "10%",
      },
      text: {
        marginVertical: 10,
        fontSize: 25,
        textAlign: 'center',
      },
      icon:{
        marginTop: '10%'
      }
  });

export default Results; 



