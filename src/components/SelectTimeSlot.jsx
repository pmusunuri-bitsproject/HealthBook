import React, { Component } from "react";
import { Form } from "react-bootstrap";

class SelectTimeSlot extends Component {
  state = {};

  handleChange = (e) => {
    this.setState({ selectValue: e.target.value });
  };

  render() {
    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Control
          value={this.state.selectValue}
          onChange={this.handleChange}
          as="select"
          className="mt-3"
        >
          <option value="a">Select time slot</option>
        </Form.Control>
      </Form.Group>
    );
  }
}

export default SelectTimeSlot;
