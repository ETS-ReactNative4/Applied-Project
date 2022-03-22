import React,{useState, useContext} from 'react';
import {
  StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea,
  StyledTextInput, StyledInputLabel, StyledButton, ButtonText, MessageBox,
  ExtraText, ExtraView, TextLinkContent, TextLink, PageLogo2, LeftIcon, RightIcon
} from '../components/Styles';
import { Formik } from 'formik'
import Constants from 'expo-constants'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import KeyboardWrapper from '../components/KeyboardWrapper';
import axios from 'axios';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import {CredentialsContext} from '../components/Context/CredentialsContext';
import {Octicons, Ionicons} from '@expo/vector-icons'
const StatusBarHeight = Constants.statusBarHeight;

const SignUp = ({navigation}) => {

   // using a state variable to store the message 
   const[message, setMessage] = useState();
   // state to monitor type of message 
   const[messageType, setMessageType] = useState();
    // context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [hidePassword, setHidePassword] = useState(true);

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
    
    <View style={styles.container}>
        
        <View style={styles.header}>
       
        <Text style={styles.text_header}>Register now!</Text>
       
        </View>

        <View 
            style={[styles.footer, {
               
            }]}
            
        >
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
              icon="person"
            />

            <MyTextInput
              label="Email Address"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              icon="mail"
            />

            <MyTextInput
              label="Password"
              placeholder="* * * * * * * *"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={hidePassword}
              icon="lock"
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />

            <MyTextInput
              label="Confirm Password"
              placeholder="* * * * * * * *"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={hidePassword}
              icon="lock"
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
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
     </View>
    </View>
    </KeyboardWrapper>
  );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30}  />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      
          <StyledTextInput {...props} />
       

      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30}  />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#344955',
    paddingTop: StatusBarHeight + 110
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  
});







