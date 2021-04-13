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
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showHealthReports: false,
    });
  };

  handleOnHealthReports = () => {
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
    return [
      {
        id: "0",
        datetime: "Mar 24, 2021 at 8:00pm",
        doctorName: "Dr. Ram",
        hospitalName: "Dharamshila Narayana Superspeciality Hospital",
        hospitalAddress:
          "Metro Station, Dharamshila marg, Vasundhara Enclave Near Ashok Nagar, Dallupura, New Delhi, Delhi 110096",
        hospitalPhone: "080675 06880",
      },
      {
        id: "1",
        datetime: "Mar 25, 2021 at 10:00am",
        doctorName: "Dr. Krishna",
        hospitalName: "Indraprastha Apollo Hospitals",
        hospitalAddress:
          "Indraprastha Apollo Hospital, Mathura Rd, New Delhi, Delhi 110076",
        hospitalPhone: "011 7179 1090",
      },
    ];
  };

  getHealthReports = () => {
    return [
      {
        id: "0",
        datetime: "Mar 24, 2021",
        type: "GLYCOSYLATED HAEMOGLOBIN",
        labName: "Dr Lalchandani Labs",
        labAddress:
          "M-20, Greater Kailash-1, M Block, Greater Kailash I, Greater Kailash, New Delhi, Delhi 110048",
        labPhone: "011 4905 7059",
        refByDoctor: "Dr. Krishna",
      },

      {
        id: "1",
        datetime: "Mar 25, 2021",
        type: "BLOOD SUGAR ESTIMATION",
        labName: "Health Screen Pvt. Ltd",
        labAddress:
          "E-241/3, Allama Shibli Nomani Road, Shaheen Bagh, Okhla, New Delhi, Delhi 110025",
        labPhone: "088009 11234",
        refByDoctor: "Dr. Rama",
      },

      {
        id: "2",
        datetime: "Mar 26, 2021",
        type: "CARDIAC PROFILE",
        labName: "Quest Diagnostics Centre Delhi",
        labAddress:
          "Diagnostic centre near me Shop No 20A, Kashmiri Market Yusuf Sarai, Near AIIMS, New Delhi, Delhi 110029",
        labPhone: "099831 55546",
        refByDoctor: "Dr. Om",
      },

      {
        id: "3",
        datetime: "Mar 27, 2021",
        type: "HAV- IgM Ab TO HEPATITIS 'A' VIRUS",
        labName: "Delhi Health Labs",
        labAddress: "816/7 Govind Puri, Kalkaji, New Delhi, Delhi 110019",
        labPhone: "079827 99936",
        refByDoctor: "Dr. Krishna",
      },
    ];
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
            appointments={this.getAppointments()}
            onAddAppointment={this.handleAddAppointment}
          />
        ) : null}
        {this.state.showBookAppointment ? (
          <BookAppointment onBookAppointment={this.handleBookAppointment} />
        ) : null}
        {this.state.showHealthReports ? (
          <HealthReports reports={this.getHealthReports()} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default App;
