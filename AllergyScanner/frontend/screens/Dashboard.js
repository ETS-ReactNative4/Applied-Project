import React, { useContext, useState, useEffect } from 'react';
 // async-storage
 import AsyncStorage from '@react-native-async-storage/async-storage';
 // credentials context
 import { CredentialsContext } from '../components/Context/CredentialsContext';
 import { useAllergens } from '../components/Context/AllergenContext';
 import { useFavourites } from '../components/Context/FavouriteContext';
 import { View, Image,TouchableOpacity, Text, StyleSheet, TextInput, Alert,ScrollView,
      } from 'react-native';
 import { useProducts } from '../components/Context/ProductContext';
 import ProfileHeader from '../components/Headers/ProfileHeader'
 import axios from "axios";
 import { SafeAreaView } from 'react-native-safe-area-context';
 
 const Dashboard = ({navigation}) => {
     
     // context
     const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
     const { allergens } = useAllergens();
     const { FavouritedProducts } = useFavourites();
     const { products } = useProducts();
     const { name, email, password, _id} = storedCredentials;
 
     const clearLogin = () => {
         AsyncStorage.removeItem('credentials')
             .then(() => {
                 // sets  the credentials to empty string
                 setStoredCredentials("");
             }).catch(error => console.log(error))
   }
 
    
     return (
        <>
          <ProfileHeader titleText='Profile'/> 
        
              <ScrollView
         style={styles.container}
         contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
         showsVerticalScrollIndicator={false}>
             <Image style={styles.userImg} source={require('../../assets/Food.jpg')} /><Text>{"\n"}</Text>
             <Text style={styles.userName}>{name}</Text>
             <Text style={styles.aboutUser}>{email}</Text>
             <View style={styles.userBtnWrapper}>
              <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Edit')}>
                  <Text style={styles.userBtnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={clearLogin}>
                  <Text style={styles.userBtnText}>Logout</Text>
              </TouchableOpacity>
             </View>
 
             <View style={styles.userInfoWrapper}>
           <View style={styles.userInfoItem}>
             <Text style={styles.userInfoTitle}>{allergens.length}</Text>
             <Text style={styles.userInfoSubTitle}>Allergens</Text>
           </View>
           <View style={styles.userInfoItem}>
           <Text style={styles.userInfoTitle}>{FavouritedProducts.length}</Text>
             <Text style={styles.userInfoSubTitle}>Favourites</Text>
           </View>
           <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>{products.length}</Text>
             <Text style={styles.userInfoSubTitle}>Scanned Items</Text>
           </View>
         </View>
         </ScrollView>
         
             </>
     )
 }
 
 
 
 export default Dashboard;
 
 const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#C9DFEC',
       padding: 20,
     },
     color: {
          
     },
     userImg: {
       height: 150,
       width: 150,
       borderRadius: 75,
       
     },
     userName: {
       fontSize: 18,
       fontWeight: 'bold',
      // marginTop: 10,
      bottom: 20,
       marginBottom: 10,
     },
     aboutUser: {
       fontSize: 12,
       fontWeight: '600',
       color: '#666',
       textAlign: 'center',
       bottom: 20,
       marginBottom: 10,
     },
     userBtnWrapper: {
       flexDirection: 'row',
       justifyContent: 'center',
       width: '100%',
       marginBottom: 10,
     },
     userBtn: {
       borderColor: '#2e64e5',
       borderWidth: 2,
       borderRadius: 3,
       paddingVertical: 8,
       paddingHorizontal: 12,
       marginHorizontal: 5,
     },
     userBtnTxt: {
       color: '#2e64e5',
     },
     userInfoWrapper: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       width: '100%',
       marginVertical: 20,
     },
     userInfoItem: {
       justifyContent: 'center',
     },
     userInfoTitle: {
       fontSize: 20,
       fontWeight: 'bold',
       marginBottom: 5,
       textAlign: 'center',
     },
     userInfoSubTitle: {
       fontSize: 12,
       color: '#666',
       textAlign: 'center',
     },
   });