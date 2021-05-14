import React from "react";
import { Accordion, Container, Card, Button } from "react-bootstrap";

const PrescriptionReportList = ({ reports }) => {
  return (
    <React.Fragment>
      <Container className="mt-3 mb-3">
        <Accordion defaultActiveKey={reports[0].id || "0"}>
          {reports.map((rpt) => (
            <Card key={rpt.id}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="basic"
                  size="sm"
                  className="small text-primary text-capitalize"
                  eventKey={rpt.id}
                >
                  {`${rpt.clinicianName} / ${rpt.datetime}`}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={rpt.id}>
                <Card.Body>
                  <p className="text-capitalize"><b>{rpt.hospitalName}</b></p>
                  <p>{rpt.hospitalAddress}<br/>
                  <a href={'tel:' + rpt.phone} className="fas fa-phone"> {rpt.phone}</a>
                  </p>
                    <hr/>
                  <p>
                    <b>Lab Test(s):</b>
                     {rpt.labReportsOrdered.map((lab) => (
                         <li>{lab}</li>
                     ))}
                  </p>
                  <p>
                    <b>Medication:</b>
                     {rpt.medication.map((med) => (
                         <li>{med}</li>
                     ))}
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

export default PrescriptionReportList;
