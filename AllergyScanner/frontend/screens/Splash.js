import React from 'react';
import { 
    View, 
    Text,StyleSheet, StatusBar} from 'react-native';


const Splash = () => {
    

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
          <Text>Splash Screen</Text>
          </View>
          </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        
      },
      header: {
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
      },
  });

