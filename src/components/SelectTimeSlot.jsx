import React from "react";
import { Form } from "react-bootstrap";

const SelectTimeSlot = ({controlId, timeSlots, onSelect}) => {
  return ( 
    <Form.Group controlId={controlId}>
      <Form.Control
        onChange={onSelect}
        as="select"
        className="mt-3"
      >
        <option value="a">Select time slot</option>
        {timeSlots.map((slot) => (
            <option value={slot} key={slot}>{slot}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default SelectTimeSlot;
