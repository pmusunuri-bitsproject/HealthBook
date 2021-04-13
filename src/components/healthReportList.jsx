import React from "react";
import { Accordion, Container, Card, Button } from "react-bootstrap";

const HealthReportList = ({ reports }) => {
  return (
    <React.Fragment>
      <Container className="mt-3 mb-3">
        <Accordion defaultActiveKey="0">
          {reports.map((rpt) => (
            <Card key={rpt.id}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="basic"
                  size="sm"
                  className="small text-primary"
                  eventKey={rpt.id}
                >
                  {rpt.type}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={rpt.id}>
                <Card.Body>
                  <p className="lab-name">{rpt.labName}</p>
                  <p>{rpt.labAddress}</p>
                  <p>
                    <a href={'tel:' + rpt.labPhone} className="fas fa-phone"> {rpt.labPhone}</a>
                  </p>
                  <p className="ref-doctor">
                    Ref. By: {rpt.refByDoctor} <br />
                    Date: {rpt.datetime}
                  </p>
                  <p></p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default HealthReportList;
