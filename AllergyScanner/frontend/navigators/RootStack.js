import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {CredentialsContext} from '../components/CredentialsContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View} from 'react-native'
import { Icon } from 'react-native-elements';

//screens
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Dashboard from '../screens/Dashboard'
import PickAllergens from '../screens/PickAllergens'
import Scan from '../screens/Scan'
import Favourite from '../screens/Favourite'
import History from '../screens/History'
import Results from '../screens/Results'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerStyle:
      {
          backgroundColor: 'transparent',
          
      },
      headerTintColor: '#1F2937',
      headerTransparent: true,
      headerTitle: '',
      headerLeftContainerStyle: {
          paddingLeft: 20
      }
      }}
      initialRouteName="Login">
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
}

const RootStack = () => {
    return(
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                <Stack.Navigator
                screenOptions={{headerStyle:
                    {
                        backgroundColor: 'transparent',
                        
                    },
                    headerTintColor: '#1F2937',
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                    }}
                    initialRouteName="Login">
               {storedCredentials ? (
                  <>
                  <Stack.Screen name="App" component={BottomTab}/>
                  <Stack.Screen name="Results" component={Results}/>
                </>
                     ) : ( 
                         <>
                           
                 <Stack.Screen name="Login" component={Login}/>
                 <Stack.Screen name="SignUp" component={SignUp}/>
                 
                </>
                     )}
                </Stack.Navigator>
            </NavigationContainer>
            )}
            
        
        </CredentialsContext.Consumer>
    )

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
              tabBarLabel: 'Scanner',
              tabBarIcon: () => <Icon name="barcode-scan" type="material-community" />
            }} component={MainStackNavigator}/>
            <Tab.Screen  name="History"
            options={{
              tabBarLabel: 'History',
              tabBarIcon: () => <Icon name="history" type="material" />
            }} component={History}/>
             <Tab.Screen name="Dashboard" 
            options={{
                
              tabBarLabel: 'Dashboard',
              tabBarIcon: () => <Icon name="account-circle" type="material" />
            }}  component={Dashboard} />
             
        </Tab.Navigator>
        </View>
    )
}

export default RootStack;



