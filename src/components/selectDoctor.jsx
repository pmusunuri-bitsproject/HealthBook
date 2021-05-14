import React from 'react';
import { Form } from 'react-bootstrap';

const SelectDoctor = ({controlId, doctors, onSelect}) => {
    return ( 
        <Form.Group controlId={controlId}>
            <Form.Control as="select" className="mt-3" onChange={onSelect}>
                <option>Select doctor</option>
                {doctors.map((doctor) => (
                    <option value={doctor.id} key={doctor.id}>{doctor.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}
 
export default SelectDoctor;