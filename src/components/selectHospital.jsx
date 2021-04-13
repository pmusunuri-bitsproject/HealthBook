import React from 'react';
import { Form } from 'react-bootstrap';

const SelectHospital = ({controlId}) => {
    return ( 
        <Form.Group controlId={controlId}>
            <Form.Control as="select" className="selectpicker mt-3">
                <option>Select hospital</option>
            </Form.Control>
        </Form.Group>
    );
}
 
export default SelectHospital;