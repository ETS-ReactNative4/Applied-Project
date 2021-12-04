import React,{useState} from 'react';
import {
    StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea,
    StyledTextInput, StyledInputLabel, StyledButton, ButtonText, MessageBox,
    ExtraText, ExtraView, TextLinkContent, TextLink, PageLogo2
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { View, ActivityIndicator } from 'react-native'
import KeyboardWrapper from '../components/KeyboardWrapper';
import axios from "axios";

const Login = ({navigation}) => {
    // using a state variable to store the message 
    const[message, setMessage] = useState();
    // state to monitor type of message 
    const[messageType, setMessageType] = useState();

    // method to handle login
    const handleLogin = (credentials) => {
        const url = 'http://192.168.0.30:5000/users/signin';

        axios.post(url, credentials).then((response) => {
            const result = response.data;
            const { message, status, data} = result;

            if(status != 'SUCCESS'){
                handleMessage(message, status);
            } else {
                navigation.navigate('Dashboard', {...data[0]})
            }
            
        })
        .catch(error => {
            console.log(error.JSON());
            handleMessage("An error occurred. Check your network and try again.")
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type)
    };
    return (
        <KeyboardWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../../assets/allergens.jpg')} />
                <PageTitle>Allergy Scanner </PageTitle>
                <PageLogo2 resizeMode="cover" source={require('../../assets/scan.png')} />
                <SubTitle>{"\n"}Account Login</SubTitle>
                <Formik
                    // Provide email and password values
                    initialValues={{ email: '', password: '' }}
                    // on submit property that takes in values parameter
                    onSubmit={(values) => {
                       console.log(values);
                       navigation.navigate('Dashboard');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                        <MyTextInput
                            label="Email Address"
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />

                        <MyTextInput
                            label="Password"
                            placeholder="* * * * * * * *"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                        />
                        <MessageBox type={messageType}>{message}</MessageBox>
                     
                      <StyledButton onPress={handleSubmit}>
                          <ButtonText>Login</ButtonText>
                      </StyledButton>
                     
                        <ExtraView>
                            <ExtraText>
                                Don't Have an account?...
                          </ExtraText>
                            <TextLink onPress={() => navigation.navigate("SignUp")}>
                                <TextLinkContent>
                                    Sign Up
                              </TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardWrapper>
    );
}

const MyTextInput = ({ label, ...props }) => {
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />

        </View>
    )
}

export default Login;



