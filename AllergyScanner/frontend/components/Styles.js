import {View, Text, Image, TextInput} from 'react-native';
import Constants from 'expo-constants'
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight + 30}px;
background-color: #C9DFEC
`

export const InnerContainer = styled.View`
flex: 1;
width: 100%;
align-items: center;
`

export const PageLogo = styled.Image`
width: 300px;
height: 200px;
`

export const PageTitle = styled.Text`
font-size: 30px;
text-align: center;
font-weight: bold;
padding: 10px;
`

export const SubTitle = styled.Text`
font-size: 18px;
margin-bottom: 20px;
font-weight: bold;
letter-spacing: 1px;
`

export const StyledFormArea = styled.View`
width: 90%;
`

export const StyledTextInput = styled.TextInput`


border-radius: 5px;
font-size: 16px;
height: 60px;
margin-vertical: 3px;
margin-bottom: 10px;
`

export const StyledInputLabel = styled.Text`
font-size: 13px;
text-align: left;
`