import { Text, View,StyleSheet , TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const ListHistory = ({item, onClickRemove}) => {
  const navigation = useNavigation(); 
  if(item.allergenMatches.length > 0)
  {
    return (
    
        
            <View style={styles.listItem}>
              <View style={styles.listItemView}>
              <Text style={styles.iconWarning}>
            <Icon name="warning" type="material" color="#ff3300"  size={33}/>
            </Text>
            
            <TouchableOpacity onPress={() => 
              navigation.navigate('Details', {product: item})}>
            <Text style={styles.listItemText}>{item.productName}</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => onClickRemove(item.productId)}>
       <Icon name="delete" type="material" />
           </TouchableOpacity>
            
           
              
        </View>
        </View>
    )
     } else  {
      return (
       
       <View style={styles.listItem}>
         <View style={styles.listItemView}>
         <Text style={styles.iconCheck}>
       <Icon name="check" type="entypo" color="#008000" size={33}/>
       </Text>

       <TouchableOpacity onPress={() => 
           navigation.navigate('Details', {product: item})}>
       <Text style={styles.listItemText}>{item.productName}{'\n'}</Text>
       </TouchableOpacity>

       <TouchableOpacity styles={styles.iconDelete}onPress={() => onClickRemove(item.productId)}>
       <Icon name="delete" type="material" />
           </TouchableOpacity>
       
      
       
     
          
           </View>
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
  listItem: {
    right: "1%",
    padding: "7%",
    borderBottomWidth: 1,
    borderColor: '#eee'
},
listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
listItemText: {
    fontSize: 18,
    width: "80%"
},

iconWarning: {
    right: "30%",
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
   
},
iconCheck: {
    right: "30%",
    color: 'green',
    fontSize: 20,
    textAlign: 'center'
},
iconDelete: {
  left: "30%",
  
}


  });

  


export default ListHistory;