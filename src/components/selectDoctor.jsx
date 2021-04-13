import React from 'react';
import { Form } from 'react-bootstrap';

const SelectDoctor = ({controlId}) => {
    return ( 
        <Form.Group controlId={controlId}>
            <Form.Control as="select" className="mt-3">
                <option>Select doctor</option>
            </Form.Control>
        </Form.Group>
    );
}
 
export default SelectDoctor;