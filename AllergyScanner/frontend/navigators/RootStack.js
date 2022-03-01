import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {CredentialsContext} from '../components/Context/CredentialsContext';


//screens
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import BottomTab from './TabNavigator'


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

export default RootStack;



