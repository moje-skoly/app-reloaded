import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

export default class BetaAlert extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert bsStyle="warning">
              Aplikaci jsme právě spustili. Budeme proto rádi za hlášení všech nedostatků na adresu
              {' '}
              <a href="mailto:marek.lisy@vcelka.cz">marek.lisy@vcelka.cz</a>
              .
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
}
