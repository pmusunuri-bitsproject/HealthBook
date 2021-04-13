import React from "react";
import { Accordion, Container, Card, Button } from "react-bootstrap";

const AppointmentList = ({ appointments }) => {
  return (
    <React.Fragment>
      <Container className="mb-3">
        <Accordion defaultActiveKey="0">
          {appointments.map((ap) => (
            <Card key={ap.id}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="basic"
                  size="sm"
                  className="small text-primary"
                  eventKey={ap.id}
                >
                  {ap.datetime}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={ap.id}>
                <Card.Body>
                  <p className="doctor">{ap.doctorName}</p>
                  <p className="hospital">{ap.hospitalName}</p>
                  <p>{ap.hospitalAddress}</p>
                  <p>
                    <a
                      href={"tel:" + ap.hospitalPhone}
                      className="fas fa-phone"
                    >&nbsp;
                      {ap.hospitalPhone}
                    </a>
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default AppointmentList;
