import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

export default class BetaAlert extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Alert color="warning">
              Aplikaci jsme právě spustili. Budeme proto rádi za hlášení všech nedostatků na adresu
              {' '}
              <a href="mailto:marek.lisy@vcelka.cz">marek.lisy@vcelka.cz</a>
              .
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}
