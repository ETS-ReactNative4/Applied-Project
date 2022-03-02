import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

// Colors
export const colors = {
    primary: "#332424",
    secondary: "#4D3636",
    tertiary: "#E6E6E6",
    alternative: "#999999",
   
  };
  

export const StyledContainer = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight + 30}px;
background-color: #C9DFEC
`

export const Container = styled.View`
flex: 1;
padding: 25px;

background-color: #C9DFEC
`
export const Avatar = styled.Image`
height: 100px;
width: 100px;
margin: auto;
border-radius: 50px;
border-width: 2px;
border-color: #E5E7EB;
margin-bottom: 10px;
margin-top: 10px;
`

export const DashboardImage = styled.Image`
height: 50%
min-width: 100%;
`

export const InnerContainer = styled.View`
flex: 1;
width: 100%;
align-items: center;
`

export const DashboardContainer = styled(InnerContainer)`
padding: 25px;
padding-top: 10px;
justify-content: center;
background-color: #C9DFEC;
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

${(props) =>
        props.welcome && `
    font-size: 35px;
`}
`

export const SubTitle = styled.Text`
font-size: 18px;
margin-bottom: 20px;
font-weight: bold;
letter-spacing: 1px;

${(props) =>
        props.welcome && `
    margin-bottom: 5px;
    font-weight: normal
`}
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

export const ButtonText = styled.Text`
color: #ffffff;
font-size: 16px;
`

export const MessageBox = styled.Text`
text-align: center;
font-size: 13px;
color: ${props => props.type == 'SUCCESS' ? '#10B981' : '#EF4444'};
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


export const HeaderView = styled.View`
  padding-vertical: 10px;
  padding-horizontal: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

export const HeaderTitle = styled.Text`
  font-size: 35px;
  font-weight: bold;
  
  letter-spacing: 2px;
  font-style: italic;
`;
export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary};
`;

export const ListView = styled.TouchableHighlight`
  background-color: ${colors.alternative};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: space-around;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const ListViewHidden = styled.View`
  background-color: ${colors.tertiary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  border-radius: 11px;
`;

export const HiddenButton = styled.TouchableOpacity`
  width: 55px;
  align-items: center;
`;

export const AllergenText = styled.Text`
  font-size: 16px;
  padding-horizontal: 10px;
  letter-spacing: 1px;
  color: ${colors.primary};
  text-align: center;
`;


// Text for swiped todo row
export const SwipedAllergenText = styled(AllergenText)`
  color: ${colors.tertiary};
  font-style: italic;
 
`;

export const ModalButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
  right: 85px;
  top: 40px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${colors.primary};
`;

export const StyledInput = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ModalAction = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ModalView = styled.View`
  background-color: ${colors.secondary};
  border-radius: 20px;
  padding: 35px;
  bottom: 60px;
`;