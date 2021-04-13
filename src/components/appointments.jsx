import React from "react";
import { Button, Container } from "react-bootstrap";
import AppointmentList from "./appointmentList";
import Header from "./header";

const Appointments = ({ appointments, onAddAppointment }) => {
  return (
    <React.Fragment>
      <Header title="My Appointments" />
      {appointments.length > 0 ? (
        <React.Fragment>
          <Container className="mb-2 text-right">
            <Button
              variant="success"
              size="sm"
              onClick={onAddAppointment}
            >
              Add
            </Button>
          </Container>
          <AppointmentList appointments={appointments} />
        </React.Fragment>
      ) : (
        <p className="lead mt-5 text-center text-muted">No appointment!</p>
      )}
    </React.Fragment>
  );
};

export default Appointments;
