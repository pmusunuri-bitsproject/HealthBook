import React, { Component } from "react";
import "./App.css";
import Appointments from "./components/appointments";
import BookAppointment from "./components/bookAppointment";
import UserSignIn from "./components/userSignin";
import Navigation from "./components/navigation";
import Profile from "./components/Profile";
import LabReports from "./components/labReports";
import PrescriptionReports from "./components/prescriptionReports";
import ShareReports from "./components/shareReports";

class App extends Component {
  state = {
    showUserLogin: true,
    showNavigation: false,
    showProfile: false,
    showAppointments: false,
    showBookAppointment: false,
    showLabReports: false,
    showPrescriptionReports: false,
    showShareReports: false,
    user: {},
    client: {},
    data: {
      labReports: [],
      appointments: [],
      hospitals: [],
      prescriptionReports: [],
      knownDoctors: [],
    },
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
        showLabReports: false,
        showPrescriptionReports: false,
        showShareReports: false,
      });
    });
  };

  handleProfile = () => {
    this.setState({
      showProfile: true,
      showAppointments: false,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleHealthBook = () => {
    this.getAppointments();
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleAddAppointment = () => {
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: true,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleBookAppointment = () => {
    this.getAppointments();
    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleOnLabReports = () => {
    this.getLabReports();
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: false,
      showLabReports: true,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleOnPrescriptionReports = () => {
    this.getPrescriptionReports()
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: true,
      showShareReports: false,
    });
  }

  handleOnProfileUpdate = (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: this.state.client.email,
      name: this.state.client.name,
      contact: data.contact,
      location: data.location,
      // dob: this.state.client.dob
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://services.healthbook.anikumar.net/user/", requestOptions)
      .then((response) => response.json())
      .then((user) => {
        //console.log(user);
        this.setState({ client: user });
      })
      .catch((error) => console.log("error", error));

    this.setState({
      showProfile: false,
      showAppointments: true,
      showBookAppointment: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  };

  handleSignInSuccess = (googleUser) => {
    this.setState({
      showUserLogin: false,
      showNavigation: true,
      showAppointments: true,
      showPrescriptionReports: false,
      showShareReports: false,
      user: googleUser.getBasicProfile(),
    });
    this.verifyLoggedInUser();
  };

  handleShareReports = () => {
    this.getKnownDoctors();
    this.setState({
      showProfile: false,
      showAppointments: false,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: true,
    });
  }

  handleOnShareReports  = () => {
    this.setState({
      showUserLogin: true,
      showNavigation: false,
      showProfile: false,
      showAppointments: false,
      showBookAppointment: false,
      showLabReports: false,
      showPrescriptionReports: false,
      showShareReports: false,
    });
  }

  getKnownDoctors = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://services.healthbook.anikumar.net/user/${this.state.client.id}/referredProviders`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result)
        this.setState({data:{knownDoctors: result.referredProviders}});
      })
      .catch(error => console.log('error', error));
  }

  verifyLoggedInUser = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: this.state.user.getEmail(),
      name: this.state.user.getName(),
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://services.healthbook.anikumar.net/user/", requestOptions)
      .then((response) => response.json())
      .then((user) => {
        //console.log(user);
        this.setState({ client: user });
        this.getAppointments(user.id);
      })
      .catch((error) => console.log("error", error));
  };

  handleSignInFailure = (error) => {
    console.log(error);
  };

  getAppointments = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://services.healthbook.anikumar.net/user/${this.state.client.id}/appointments`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: { appointments: result } });
        //console.log(result)
      })
      .catch((error) => console.log(error));
  };

  getLabReports = () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://services.healthbook.anikumar.net/user/${this.state.client.id}/healthRecord?type=LAB_REPORT`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: { labReports: result } });
        //console.log(result)
      })
      .catch((error) => console.log(error));
  };

  getPrescriptionReports = () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://services.healthbook.anikumar.net/user/${this.state.client.id}/healthRecord?type=PRESCRIPTION`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        this.setState({ data: { prescriptionReports: result } });
      })
      .catch((error) => console.log(error));
  }

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
            onLabReports={this.handleOnLabReports}
            onPrescriptionReports={this.handleOnPrescriptionReports}
            onShareReports={this.handleShareReports}
          />
        ) : null}
        {this.state.showProfile ? (
          <Profile
            user={this.state.client}
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
          <BookAppointment
            onBookAppointment={this.handleBookAppointment}
            client={this.state.client} />
        ) : null}
        {this.state.showLabReports ? (
          <LabReports reports={this.state.data.labReports || []} />
        ) : null}
        {this.state.showShareReports ? (
          <ShareReports 
            doctors={this.state.data.knownDoctors || []} 
            onShareReports={this.handleOnShareReports}
            client={this.state.client}
          />
        ) : null}
        {this.state.showPrescriptionReports ? (
          <PrescriptionReports reports={this.state.data.prescriptionReports || []} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default App;
