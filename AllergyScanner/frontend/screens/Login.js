import React from 'react';
import { StyledContainer, InnerContainer, PageLogo, PageTitle} from '../components/Styles';

const Login = () => {
    return (
    <StyledContainer>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('../../assets/allergens.jpg')}/>
            <PageTitle>Allergy Scanner</PageTitle>
        </InnerContainer>
    </StyledContainer>

    );
}

export default Login;

