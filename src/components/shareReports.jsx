import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import Header from "./header";

class ShareReports extends Component {
  state = {
    providers: [],
  };

  handleCheckbox = (e) => {
    let providers = [];
    if (e.target.checked) {
      this.state.providers.forEach((id) => providers.push(id));
      providers.push(e.target.id);
    } else {
      providers = this.state.providers.filter((id) => id !== e.target.id);
    }
    this.setState({ providers: providers });
  };

  handleShare = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "providers": this.state.providers
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`https://services.healthbook.anikumar.net/user/${this.props.client.id}/healthRecordAccess`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.onShareReports();
      })
      .catch(error => {
          console.log('error', error)
          this.props.onShareReports();
      });
    
  };

  render() {
    return (
      <React.Fragment>
        <Header title="Share Reports" />
        {this.props.doctors.length > 0 ? (
          <React.Fragment>
            <Container className="mb-2 text-right">
              <Button variant="success" size="sm" onClick={this.handleShare}>
                Share
              </Button>
            </Container>
            {this.props.doctors.map((doc) => (
              <Container key={doc.providerid} className="mb-2 text-muted lead">
                <label>
                  <input
                    type="checkbox"
                    id={doc.providerid}
                    onChange={this.handleCheckbox}
                  />{" "}
                  {doc.providerName}
                </label>
              </Container>
            ))}
          </React.Fragment>
        ) : (
          <p className="lead mt-5 text-center text-muted">No known doctor!</p>
        )}
      </React.Fragment>
    );
  }
}

export default ShareReports;
