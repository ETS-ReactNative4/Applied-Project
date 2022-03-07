import { Text, View,StyleSheet , TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';


const ListResultsItem = ({item, onClickRemove}) => {
  
  if(item.allergenMatches.length > 0)
  {
    return (
    
        <View style={styles.container}>
            
            <Text style={styles.text}>{item.productName}{'\n'}</Text>
            <Text style={styles.text}>{item.productId}{'\n'}</Text>
            <Text style={styles.text}>{item.allergenMatches}{'\n'}</Text>
            <TouchableOpacity onPress={() => onClickRemove(item.productId)}>
            <Icon name="delete" type="material" />
            <Icon name="warning" type="material"   color="#ff3333"/>
                </TouchableOpacity>
        </View>
        
    )
     } else  {
      return (
        <View style={styles.container}>
       
       <Text style={styles.text}>{item.productName}{'\n'}</Text>
       <Text style={styles.text}>{item.productId}{'\n'}</Text>
       <Text style={styles.text}>{item.allergenMatches}{'\n'}</Text>
       <TouchableOpacity onPress={() => onClickRemove(item.productId)}>
       <Icon name="delete" type="material" />
       <Icon name="check" type="entypo"  size={200} color="#33cc33"/>
           </TouchableOpacity>
   </View>
      )
    }
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