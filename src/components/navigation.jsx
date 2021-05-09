import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = (props) => {
  return (
    <Navbar collapseOnSelect variant="dark" bg="dark" expand="sm" fixed="top">
      <Navbar.Toggle type="button" aria-controls="responsive-navbar-nav" />
      <Navbar.Brand href="#home" className="text-muted">HealthBook</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <h5 className="text-white-50 mt-3 text-left">{props.username}</h5>
        <Nav defaultActiveKey="my-appointments" className="lead">
          <Nav.Link
            href="#profile"
            eventKey="profile"
            onClick={props.onProfile}
          >
            Profile
          </Nav.Link>
          <Nav.Link
            href="#my-appointments"
            eventKey="my-appointments"
            onClick={props.onMyAppointments}
          >
            My Appointments
          </Nav.Link>
          <Nav.Link
            href="#book-appointment"
            eventKey="book-appointment"
            onClick={props.onBookAppointment}
          >
            Book Appointment
          </Nav.Link>
          <Nav.Link
            href="#health-reports"
            eventKey="health-reports"
            onClick={props.onHealthReports}
          >
            Lab Reports
          </Nav.Link>
          <Nav.Link href="#signin" eventKey="logout" onClick={props.onSignOut}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
