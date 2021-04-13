import React from 'react'
import { Container } from 'react-bootstrap';
import logo from './logo.svg';

const SignInBranding = () => {
    return (
        <Container className="text-center vertical-center">
            <img src={logo} className="App-logo  app-logo-lg" alt="logo" />
            <h3 className="signin-app-title app-title-lg">HealthBook</h3>
        </Container>
    );
}
 
export default SignInBranding;