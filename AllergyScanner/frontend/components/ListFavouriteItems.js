import { Text, View,StyleSheet , TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';


const ListResultsItem = ({item, onClickRemove}) => {
    return (
        <View style={styles.container}>
            
            <Text style={styles.text}>{item.productName}{'\n'}</Text>
            <Text style={styles.text}>{item.productId}{'\n'}</Text>
            <TouchableOpacity onPress={() => onClickRemove(item.productId)}>
            <Icon name="delete" type="material" />
                </TouchableOpacity>
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