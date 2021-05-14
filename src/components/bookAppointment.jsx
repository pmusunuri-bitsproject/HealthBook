import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "./header";
import SelectDoctor from "./selectDoctor";
import SelectHospital from "./selectHospital";
import SelectTimeSlot from "./selectTimeSlot";

class BookAppointment extends Component {
  state = { 
    hospitals: [],
    doctors: [],
    timeSlots: [],
    selectedHospitalId: '',
    selectedDoctorId: '',
    selectedTimeSlot: ''
  }

  componentDidMount() {
    this.getHospitals();
  }

  getHospitals = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://services.healthbook.anikumar.net/organizations", requestOptions)
    .then(response => response.json())
    .then(result => {
      this.setState({hospitals: result})
      //console.log(result)
    })
    .catch(error => console.log(error))
  }

  getDoctorAvailability = (doctorId) => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`http://services.healthbook.anikumar.net/providers/${doctorId}/${this.state.selectedHospitalId}/availability`, requestOptions)
    .then(response => response.json())
    .then(availability => {
      let slots = []
      for (let day in availability) {
        slots = availability[day].map(time => {
          return `${time} on ${day}`
        })
      }
      this.setState({timeSlots: slots})
      //console.log(slots)
    })
    .catch(error => console.log(error))
  }

  handleHospitalSelect = (e) => {
    let hospitalId = e.target.value;
    this.setState({selectedHospitalId: hospitalId});
    console.log(`Selected hospital id: ${hospitalId}`);

    let hospital = this.state.hospitals.filter(hospital => {
      return hospital.id === hospitalId
    });

    if (hospital.length > 0) this.setState({doctors: hospital[0].providers});
  }

  handleDoctorSelect = (e) => {
    let doctorId = e.target.value;
    this.setState({selectedDoctorId: doctorId});
    console.log(`Selected doctor id: ${doctorId}`);

    this.getDoctorAvailability(doctorId);
  }

  handleTimeSlotSelect = (e) => {
    let timeSlot = e.target.value;
    this.setState({selectedTimeSlot: timeSlot});
    console.log(`Selected time  slot: ${timeSlot}`);
  }

  handleBookAppointment = () => {
    let timings = this.state.selectedTimeSlot.split(' on ');
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "providerId": `${this.state.selectedDoctorId}`,
      "organizationId": `${this.state.selectedHospitalId}`,
      "appointmentDate": timings[1] || '',
      "timeSlot": timings[0] || ''
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://services.healthbook.anikumar.net/user/${this.props.client.id}/appointments`, requestOptions)
    .then(response => response.json())
    .then(result => {
      this.props.onBookAppointment();
    })
    .catch(error => {
      console.log('[ERROR] - failed to book appointement.');
      console.log(error.stack);
      this.props.onBookAppointment();
    });
  }

  render() { 
    return (
      <React.Fragment>
        <Header title="Book Appointment" />
        <Container className="mt-5">
          <Form>
              <SelectHospital controlId="hospital"
                hospitals={this.state.hospitals}
                onSelect={this.handleHospitalSelect} />
              <SelectDoctor controlId="doctor" 
                doctors={this.state.doctors}
                onSelect={this.handleDoctorSelect}
                />
              <SelectTimeSlot controlId="timeslot" 
                timeSlots={this.state.timeSlots}
                onSelect={this.handleTimeSlotSelect}
                />
              <div className="text-right">
                  <Button variant="success" onClick={this.handleBookAppointment} type="submit" size="sm">
                      Book
                  </Button>
              </div>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default BookAppointment;
