import React, { useState, useContext, useEffect } from 'react'
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MessageBox,
  ExtraText,
  ExtraView,
  TextLinkContent,
  TextLink,
  PageLogo2,
  LeftIcon,
  RightIcon,
} from '../components/Styles'
import { Formik } from 'formik'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import { Octicons, Ionicons } from '@expo/vector-icons'
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'
// credentials context
import { CredentialsContext } from '../components/Context/CredentialsContext'
import * as Animatable from 'react-native-animatable'

const Login = ({ navigation }) => {
  // using a state variable to store the message
  const [message, setMessage] = useState()
  // state to monitor type of message
  const [messageType, setMessageType] = useState()
  // context
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const [hidePassword, setHidePassword] = useState(true)

  // method to handle login
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null)
    const url = 'http://192.168.0.30:5000/users/signin'

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data
        const { message, status, data } = result

        if (status != 'SUCCESS') {
          handleMessage(message, status)
        } else {
          persistLogin({ ...data[0] }, message, status)
        }
        setSubmitting(false)
      })
      .catch((error) => {
        console.log(error.JSON())
        setSubmitting(false)
        handleMessage('An error occurred. Check your network and try again.')
      })
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  const persistLogin = (credentials, message, status) => {
    // save credentials to asyncstorage
    AsyncStorage.setItem('credentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status)
        setStoredCredentials(credentials)
      })
      .catch((error) => {
        console.log(error)
        handleMessage('Persisting login failed')
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign into your account now!</Text>
      </View>
      <Animatable.View style={[styles.footer, {}]} animation="fadeInUpBig">
        <Formik
          // Provide email and password values
          initialValues={{ email: '', password: '' }}
          // on submit property that takes in values parameter
          onSubmit={(values, { setSubmitting }) => {
            if (values.email == '' || values.password == '') {
              handleMessage('Please fill all the fields')
              setSubmitting(false)
            } else {
              handleLogin(values, setSubmitting)
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <StyledFormArea>
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
                icon="lock"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                isPassword={true}
              />
              <MessageBox type={messageType}>{message}</MessageBox>
              {!isSubmitting && (
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
              )}
              {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </StyledButton>
              )}

              <ExtraView>
                <ExtraText>Don't Have an account?...</ExtraText>
                <TextLink onPress={() => navigation.navigate('SignUp')}>
                  <TextLinkContent>Sign Up</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </Animatable.View>
    </View>
  )
}

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword)
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} />
        </RightIcon>
      )}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344955',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
})
