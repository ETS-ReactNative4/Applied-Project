import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View} from 'react-native'
import { Icon } from 'react-native-elements';

//screens
import Dashboard from '../screens/Dashboard'
import PickAllergens from '../screens/PickAllergens'
import Scan from '../screens/Scan'
import Favourite from '../screens/Favourite'
import History from '../screens/History'
import Results from '../screens/Results'
import Details from '../screens/Details'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    
    <Stack.Navigator
    screenOptions={{headerStyle:
      {
          backgroundColor: 'transparent',
          
      },
      headerTintColor: '#1F2937',
      headerTransparent: true,
      headerTitle: '',
      headerLeftContainerStyle: {
          paddingLeft: 20,
          
      }
      }}
      initialRouteName="Scan">
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Results" component={Results}  options={{headerBackVisible:false }}/>
    </Stack.Navigator>
   
  );
}

const StackNavigator = () => {
  return (
    
    <Stack.Navigator
    screenOptions={{headerStyle:
      {
          backgroundColor: 'transparent',
          
      },
      headerTintColor: '#1F2937',
      headerTransparent: true,
      headerTitle: '',
      headerLeftContainerStyle: {
          paddingLeft: 20,
          
      }
      }}
      initialRouteName="History">
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Details" component={Details}  options={{headerBackVisible:false }}/>
    </Stack.Navigator>
   
  );
}

const BottomTab = () => {
    
    return (
        <View style={{ flex:1, backgroundColor: 'blue' }}>
        <Tab.Navigator screenOptions={{headerStyle:
            {
               
                 backgroundColor: '#C9DFEC' 
            },
            tabBarStyle:{backgroundColor: 'lightblue'}
            }}
           
           >
            <Tab.Screen name="Home" 
            options={{
                
              tabBarLabel: 'Home',
             
              tabBarIcon: () => <Icon name="home" type="material" />
            }}  component={PickAllergens}/>
            <Tab.Screen name="Favourite"
            options={{
              tabBarLabel: 'Favourite',
              tabBarIcon: () => <Icon name="favorite" type="material" />
            }}  component={Favourite}/>
            <Tab.Screen  name="Scanner"
            options={{
              tabBarLabel: 'Scan',
              unmountOnBlur: true,
              tabBarIcon: () => <Icon name="barcode-scan" type="material-community" />
            }} component={MainStackNavigator}  
            
              />
            <Tab.Screen  name="History1"
            options={{
              tabBarLabel: 'History',
              tabBarIcon: () => <Icon name="history" type="material" />
            }} component={StackNavigator}/>
             <Tab.Screen name="Dashboard" 
            options={{
                
              tabBarLabel: 'Dashboard',
              tabBarIcon: () => <Icon name="account-circle" type="material" />
            }}  component={Dashboard} />
            
             
        </Tab.Navigator>
        </View>
    )
}

export default BottomTab;



