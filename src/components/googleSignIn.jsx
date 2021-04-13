import React, { Component } from 'react'

class GoogleSignIn extends Component {
    componentDidMount() {
        window.gapi.signin2.render('signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.props.onSuccess,
            'onfailure': this.props.onFailure
        });
    }

    render() { 
        return (
            <div className="gsignin-btn d-flex justify-content-center">
                <div id="signin2"></div>
            </div>
        );
    }
}
 
export default GoogleSignIn;