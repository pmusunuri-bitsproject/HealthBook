import React, { Component } from 'react'
import GoogleSignIn from './googleSignIn'
import SignInBranding from './signinBranding'

class UserSignIn extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <SignInBranding />
                <GoogleSignIn
                    onSuccess={this.props.onSuccess}
                    onFailure={this.props.onFailure}
                />
            </React.Fragment>
        );
    }
}
 
export default UserSignIn;