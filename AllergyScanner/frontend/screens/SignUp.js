import React,{useState, useContext} from 'react';
import {
  StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea,
  StyledTextInput, StyledInputLabel, StyledButton, ButtonText, MessageBox,
  ExtraText, ExtraView, TextLinkContent, TextLink, PageLogo2
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { View, ActivityIndicator } from 'react-native'
import KeyboardWrapper from '../components/KeyboardWrapper';
import axios from 'axios';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import {CredentialsContext} from '../components/CredentialsContext';

const SignUp = ({navigation}) => {

   // using a state variable to store the message 
   const[message, setMessage] = useState();
   // state to monitor type of message 
   const[messageType, setMessageType] = useState();
    // context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

   // method to handle login
   const handleSignup = (credentials, setSubmitting) => {
       handleMessage(null);
       const url = 'http://192.168.0.30:5000/users/signup';

       axios.post(url, credentials).then((response) => {
           const result = response.data;
           const { message, status, data} = result;

           if(status != 'SUCCESS'){
               handleMessage(message, status);
           } else {
            persistLogin({...data}, message, status);
           }
           setSubmitting(false);
       })
       .catch(error => {
           console.log(error.JSON());
           setSubmitting(false);
           handleMessage("An error occurred. Check your network and try again.")
       })
   }

   const handleMessage = (message, type = 'FAILED') => {
       setMessage(message);
       setMessageType(type)
   };

   const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('credentials', JSON.stringify(credentials))
    .then(() => {
      handleMessage(message,status);
      setStoredCredentials(credentials);
    })
    .catch((error) => {
        console.log(error);
        handleMessage('Persisting login failed');
    })
}

  return (
    <KeyboardWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
     
        <PageTitle>Allergy Scanner</PageTitle>
        <PageLogo2 resizeMode="cover" source={require('../../assets/scan.png')} />
        <SubTitle>{"\n"}Account Signup</SubTitle>
        <Formik
          // Provide email and password values
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          // on submit property that takes in values parameter
          onSubmit={(values, {setSubmitting}) => {
            if(values.name == '' || values.email == '' || values.password == '' || values.confirmPassword == ''){
              handleMessage('Please fill all the fields');
              setSubmitting(false);

          }  else if (values.password !== values.confirmPassword) {
            handleMessage('Passwords do not match!');
            setSubmitting(false);
        } else {
              handleSignup(values, setSubmitting);
          }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
            <MyTextInput
              label="Name"
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}

            />

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

            <MyTextInput
              label="Confirm Password"
              placeholder="* * * * * * * *"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={true}
            />
             <MessageBox type={messageType}>{message}</MessageBox>
             {!isSubmitting && 
                      <StyledButton onPress={handleSubmit}>
                          <ButtonText>Sign Up</ButtonText>
                      </StyledButton>}
                      {isSubmitting && 
                      <StyledButton disabled={true}>
                          <ActivityIndicator size="large" color='#ffffff'/>
                      </StyledButton>}
            <ExtraView>
              <ExtraText>
                Already Have an account?...
                          </ExtraText>
              <TextLink onPress={() =>  navigation.navigate("Login")}>
                <TextLinkContent>
                  Sign In
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

export default SignUp;


