import React, { Component } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import Header from "./header";

class Profile extends Component {
  state = {
    phoneValue: this.props.user.contact ,
    locationValue: this.props.user.location,
  };

  handleLocationChange = (e) => {
    this.setState({
      locationValue: e.target.value,
    });
  };

  handlePhoneChange = (e) => {
    this.setState({
      phoneValue: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header title="Profile" imageUrl={this.props.user.imageUrl} />
        <Container className="mt-5">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="bg-light text-muted"
              readOnly
              value={this.props.user.name}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Phone</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={this.state.phoneValue}
              onChange={this.handlePhoneChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="bg-light text-muted"
              readOnly
              value={this.props.user.email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Location</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={this.state.locationValue}
              onChange={this.handleLocationChange}
            />
          </InputGroup>
          <div className="text-right">
            <Button
              onClick={() => {
                this.props.onProfileUpdate({
                  location: this.state.locationValue,
                  contact: this.state.phoneValue,
                });
              }}
              variant="success"
              type="submit"
              size="sm"
            >
              Update
            </Button>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
