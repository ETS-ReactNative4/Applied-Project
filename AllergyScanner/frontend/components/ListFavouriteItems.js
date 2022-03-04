import { Text, View,StyleSheet } from 'react-native';
import React from 'react';


const ListResultsItem = ({item}) => {
    return (
        <View style={styles.container}>
            
            <Text style={styles.text}>{item.productName}{'\n'}</Text>
            <Text style={styles.text}>{item.productId}{'\n'}</Text>
           
        </View>
        
    )
}

const styles = StyleSheet.create({
    
  container: {
    width:"90%",
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


export default ListResultsItem;