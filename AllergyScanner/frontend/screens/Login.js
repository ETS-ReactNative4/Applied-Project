import React from 'react';
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea,
    StyledTextInput, StyledInputLabel} from '../components/Styles';
import {StatusBar} from 'expo-status-bar';
import {Formik} from 'formik'
import {View} from 'react-native'

const Login = () => {
    return (
    <StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('../../assets/allergens.jpg')}/>
            <PageTitle>Allergy Scanner</PageTitle>
            <SubTitle>Account Login</SubTitle>
            <Formik
            // Provide email and password values
            initialValues={{email: '', password: ''}}
            // on submit property that takes in values parameter
            onSubmit={(values) => {
                console.log(values);
            }}
            >
            {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                <MyTextInput
                      label="Email Address"
                      placeholder="email"
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
                      
                      />

            </StyledFormArea>)}
            </Formik>
        </InnerContainer>
    </StyledContainer>

    );
}

// create input field component
const MyTextInput = ({label,...props}) => {
    return(
        <View>
<StyledInputLabel>{label}</StyledInputLabel>
<StyledTextInput {...props}/>

        </View>
    )
}


export default Login;

