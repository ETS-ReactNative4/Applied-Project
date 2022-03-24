import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import _ from 'lodash'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {CredentialsContext} from '../components/Context/CredentialsContext';
import { useProducts } from '../components/Context/ProductContext';
import Header from '../components/Headers/Header'

export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {fetchProducts } = useProducts();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const _debouncedHandleBarCodeRead = _.debounce((data) =>{ handleBarCodeScanned(data) }, 3000, 
  {leading: true, trailing: false});

  /*const saveProducts = (userFrom, productName, productId) => {
      axios.
      post('http://192.168.0.30:5000/products/addProducts', userFrom, productName, productId )
      .then(response=> {
          if(response.data.success) {
             console.log("Product saved to database")
             fetchProducts();
          } else {
              alert(' Failed to save product')
          }
      }).catch(error=>{
          console.log(error);
      });
    }*/

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
      
        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.navigate('Results', { product: responseJson.product });
                //saveProducts({ userFrom: storedCredentials, productId : responseJson.product._id, productName: responseJson.product.product_name})
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false)
                setScanned(false);
            });
};

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isFocused) {
  return (
    <>
     <Header titleText='Scan'/> 
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : _debouncedHandleBarCodeRead}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.focus}/>
        </BarCodeScanner>
      {/*{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}*/}
    </View>
    </>
  );
} else {
  return <View/>
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  focus: {
    width: 300,
    height: 200,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    position: 'absolute',
    top: '35%',
    left: '15%',
},
});