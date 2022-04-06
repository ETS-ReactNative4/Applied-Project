import React, { useState, useContext } from 'react'
import {
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MessageBox,
  LeftIcon,
  RightIcon,
} from '../components/Styles'
import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import Constants from 'expo-constants'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import KeyboardWrapper from '../components/KeyboardWrapper'
import axios from 'axios'
// credentials context
import { CredentialsContext } from '../components/Context/CredentialsContext'
// icons
import { Octicons, Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
const StatusBarHeight = Constants.statusBarHeight

const Edit = ({ navigation }) => {
  // using a state variable to store the message
  const [message, setMessage] = useState()
  // state to monitor type of message
  const [messageType, setMessageType] = useState()
  // user context
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const [hidePassword, setHidePassword] = useState(true)
  const { _id } = storedCredentials

  // method to handle update
  const handleEdit = (credentials, setSubmitting) => {
    handleMessage(null)
    const url = `http://192.168.0.30:5000/users/update/${_id}`

    axios
      .put(url, credentials)
      .then((response) => {
        const result = response.data
        //
        const { message, status, data } = result

        // if not equal to success then handle the message
        if (status != 'SUCCESS') {
          handleMessage(message, status)
        } else {
          // navigate to previous page while updating the details
          navigation.goBack({ ...data })
        }
        setSubmitting(false)
        // set the credentials to the updated credentials
        setStoredCredentials(credentials)
      })
      .catch((error) => {
        console.log(error)
        setSubmitting(false)
        handleMessage('An error occurred. Check your network and try again.')
      })
  }

  // function to handle messages
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  return (
    <KeyboardWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#FFF"
              style={{ bottom: 30 }}
            />
          </TouchableOpacity>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={styles.userImg}
              source={require('../../assets/Food.jpg')}
            />

            <View style={styles.active}></View>
            <View style={styles.add}>
              <Ionicons
                name="ios-add"
                size={48}
                color="#344955"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            </View>
          </View>
        </View>
        <Animatable.View style={[styles.footer, {}]} animation="fadeInUpBig">
          <Formik
            // Provide email and password values
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            // on submit property that takes in values parameter
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.name == '' ||
                values.email == '' ||
                values.password == '' ||
                values.confirmPassword == ''
              ) {
                handleMessage('Please fill all the fields')
                setSubmitting(false)
              } else if (values.password !== values.confirmPassword) {
                handleMessage('Passwords do not match!')
                setSubmitting(false)
              } else {
                handleEdit(values, setSubmitting)
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
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Edit Details</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </StyledButton>
                )}
              </StyledFormArea>
            )}
          </Formik>
        </Animatable.View>
      </View>
    </KeyboardWrapper>
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

export default Edit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344955',
    paddingTop: StatusBarHeight + 50,
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
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  userImg: {
    height: 200,
    width: 200,
    borderRadius: 75,
    alignSelf: 'center',
  },
  add: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
