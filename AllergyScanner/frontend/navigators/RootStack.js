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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
                  //<Stack.Screen name="Dashboard" component={Dashboard}/>
                  <Stack.Screen name="App" component={BottomTab}/>
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
            <Tab.Screen name="Dashboard" 
            options={{
                
              tabBarLabel: 'Home',
             
              tabBarIcon: () => <Icon name="home" type="material" />
            }}  component={PickAllergens}/>
            <Tab.Screen name="Favourite"
            options={{
              tabBarLabel: 'Favourite',
              tabBarIcon: () => <Icon name="favorite" type="material" />
            }}  component={Favourite}/>
            <Tab.Screen  name="Scan"
            options={{
              tabBarLabel: 'Scanner',
              tabBarIcon: () => <Icon name="barcode-scan" type="material-community" />
            }} component={Scan}/>
            <Tab.Screen name="Logout" 
            options={{
                
              tabBarLabel: 'Logout',
              tabBarIcon: () => <Icon name="logout" type="material" />
            }}  component={Dashboard} />
        </Tab.Navigator>
        </View>
    )
}

export default RootStack;



