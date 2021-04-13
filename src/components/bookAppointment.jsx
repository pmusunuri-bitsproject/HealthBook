import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "./header";
import SelectDoctor from "./selectDoctor";
import SelectHospital from "./selectHospital";
import SelectTimeSlot from "./selectTimeSlot";

const BookAppointment = ({onBookAppointment}) => {
  return (
    <React.Fragment>
      <Header title="Book Appointment" />
      <Container className="mt-5">
        <Form>
            <SelectHospital controlId="hospital"/>
            <SelectDoctor controlId="doctor" />
            <SelectTimeSlot controlId="timeslot" />
            <div className="text-right">
                <Button variant="success" onClick={onBookAppointment} type="submit" size="sm">
                    Book
                </Button>
            </div>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default BookAppointment;
