import React, { Component } from 'react';

import { Container } from 'reactstrap';

export default class NotFound extends Component {
  render() {
    return (
      <Container>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </Container>
    );
  }
}
