import React, { Component } from "react";
import "./App.css";
import Appointments from "./components/appointments";
import BookAppointment from "./components/bookAppointment";
import UserSignIn from "./components/userSignin";
import Navigation from "./components/navigation";
import Profile from "./components/profile";
import HealthReports from "./components/healthReports";
//import GoogleSignIn from './components/googleSignIn';
//import SignInBranding from './components/signinBranding';

class App extends Component {
  state = {
    showUserLogin: true,
    showNavigation: false,
    showProfile: false,
    showAppointments: false,
    showBookAppointment: false,
    showHealthReports: false,
    user: {},
    data: { 
      labReports: [],
      appointments: []
    }
  };

  handleSignOut = () => {
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("User signed out.");
      this.setState({
        showUserLogin: true,
        showNavigation: false,
        showProfile: false,
        showAppointments: false,
        showBookAppointment: false,
        showHealthReports: false,
      });
    });
  };

  handleProfile = () => {
    this.setState({
      showProfile: true,
      showAppointments: false,
      showBookAppointment: false,
      showHealthReports: false,
    });
  };

  handleHealthBook = () => {
    this.getAppointments()
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showHealthReports: false,
    });
  };

  handleAddAppointment = () => {
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: true,
      showHealthReports: false,
    });
  };

  handleBookAppointment = () => {
    this.getAppointments()
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showHealthReports: false,
    });
  };

  handleOnHealthReports = () => {
    this.getLabReports()
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: false,
      showHealthReports: true,
    });
  };

  handleOnProfileUpdate = (data) => {
    console.log("profile data", data);
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
    });
  };

  handleSignInSuccess = (googleUser) => {
    console.log("Signed in successfully.");

    this.setState({
      showUserLogin: false,
      showNavigation: true,
      showAppointments: true,
      user: googleUser.getBasicProfile(),
    });
  };

  handleSignInFailure = (error) => {
    console.log(error);
  };

  getAppointments = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://healthbook-backend.et.r.appspot.com/user/53ecf50f-4923-5c88-97bd-1f21a744df5c/appointments", requestOptions)
    .then(response => response.json())
    .then(result => {
      this.setState({data:{appointments: result}})
      console.log(result)
    })
    .catch(error => console.log(error))
  };

  getLabReports =  () => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch("http://localhost:8080/user/53ecf50f-4923-5c88-97bd-1f21a744df5c/healthRecord?type=LAB_REPORT", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({data:{labReports: result}})
        console.log(result)
      })
      .catch(error => console.log(error))
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showUserLogin ? (
          <UserSignIn
            onSuccess={this.handleSignInSuccess}
            onFailure={this.handleSignInFailure}
          />
        ) : null}
        {this.state.showNavigation ? (
          <Navigation
            username={this.state.user.getName()}
            onSignOut={this.handleSignOut}
            onProfile={this.handleProfile}
            onHealthBook={this.handleHealthBook}
            onBookAppointment={this.handleAddAppointment}
            onMyAppointments={this.handleHealthBook}
            onHealthReports={this.handleOnHealthReports}
          />
        ) : null}
        {this.state.showProfile ? (
          <Profile
            user={this.state.user}
            onProfileUpdate={this.handleOnProfileUpdate}
          />
        ) : null}
        {this.state.showAppointments ? (
          <Appointments
            appointments={this.state.data.appointments || []}
            onAddAppointment={this.handleAddAppointment}
          />
        ) : null}
        {this.state.showBookAppointment ? (
          <BookAppointment onBookAppointment={this.handleBookAppointment} />
        ) : null}
        {this.state.showHealthReports ? (
          <HealthReports reports={this.state.data.labReports||[]} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default App;
