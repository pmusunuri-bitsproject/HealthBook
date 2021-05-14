import React from 'react';
import { Form } from 'react-bootstrap';

const SelectHospital = ({controlId, hospitals, onSelect}) => {
    return ( 
        <Form.Group controlId={controlId}>
            <Form.Control as="select" className="selectpicker mt-3" onChange={onSelect}>
                <option>Select hospital</option>
                {hospitals.map((hospital) => (
                    <option value={hospital.id} key={hospital.id}>{hospital.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}
 
export default SelectHospital;