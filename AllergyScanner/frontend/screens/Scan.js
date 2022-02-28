import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import _ from 'lodash'
import loadAllergens from './PickAllergens'

export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  _debouncedHandleBarCodeRead = _.debounce((data) =>{ handleBarCodeScanned(data) }, 3000, 
  {leading: true, trailing: false});

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
      
        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.navigate('Results', { product: responseJson.product });
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

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : _debouncedHandleBarCodeRead}
        style={StyleSheet.absoluteFillObject}
      />
      {/*{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});