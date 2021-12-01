import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants'
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight + 10}px;
background-color: #C9DFEC
`

export const InnerContainer = styled.View`
flex: 1;
width: 100%;
align-items: center;
`

export const PageLogo = styled.Image`
width: 410px;
height: 250px;
`

export const PageLogo2 = styled.Image`
width: 64px;
height: 64px;
`

export const PageTitle = styled.Text`
font-size: 40px;
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
background-color: #E5E7EB;
padding-left: 30px;
border-radius: 10px;
font-size: 16px;
height: 60px;
margin-vertical: 3px;
margin-bottom: 10px;
`

export const StyledInputLabel = styled.Text`
font-size: 13px;
text-align: left;
`

export const StyledButton = styled.TouchableOpacity`
backgroundColor: #0782F9;
width: 100%;
padding: 15px;
borderRadius: 10px;
alignItems: center;
`

export const ButtonText= styled.Text`
color: #ffffff;
font-size: 16px;
`

export const MessageBox= styled.Text`
text-align: center;
font-size: 13px;
`

export const Line = styled.View`
background-color: #9CA3AF;
height: 1px;
width: 100%;
margin-vertical: 10px;
`

export const ExtraView = styled.View`
justify-content: center;
flex-direction: row;
align-items: center;
padding: 10px;
`

export const ExtraText = styled.Text`
justify-content: center;
align-content: center;
font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
justify-content: center;
align-items: center;
`

export const TextLinkContent = styled.Text`
font-size: 15px;
color: #2B65EC;
`