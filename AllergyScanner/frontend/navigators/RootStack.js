import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {CredentialsContext} from '../components/Context/CredentialsContext';

//screens
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Splash from '../screens/Splash'
import TabNavigator from './TabNavigator'


const Stack = createNativeStackNavigator();

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
                    headerShown: false,
                    headerTintColor: '#1F2937',
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                    }}
                    initialRouteName="Splash">
               {storedCredentials ? (
                  <>
                  <Stack.Screen name="App" component={TabNavigator}/>
                 
                </>
                     ) : ( 
                         <>
                 <Stack.Screen name="Splash" component={Splash}/>
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

export default RootStack;



