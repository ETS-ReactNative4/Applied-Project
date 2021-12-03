import React from 'react';
import {
    StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea,
    StyledTextInput, StyledInputLabel, StyledButton, ButtonText, MessageBox,
    ExtraText, ExtraView, TextLinkContent, TextLink, PageLogo2
} from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { View } from 'react-native'
import KeyboardWrapper from '../components/KeyboardWrapper';

const Login = () => {
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
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
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
                        <MessageBox>...</MessageBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                         </ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>
                                Don't Have an account?...
                          </ExtraText>
                            <TextLink>
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



