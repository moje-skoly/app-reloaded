import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './Contact.less';

const Contact = () => {
  return (
    <Container className="about">
      <Row>
        <Col xs={12}>
          <h1><strong>Kontakt</strong></h1>
        </Col>
      </Row>
      <Row>
        <Col
          md={{ size: 3, offset: 3 }}
          sm={{ size: 5, offset: 2 }}
          xs={{ size: 10, offset: 1 }}
        >
          <p>
            <strong>Marek Lisý</strong><br />
            <i>Koordinátor projektu</i><br />
            e-mail:
            {' '}
            <a href="mailto:marek.lisy@vcelka.cz">marek.lisy@vcelka.cz</a>
            <br />
            blog: <a href="http://www.mareklisy.cz">www.mareklisy.cz</a>
          </p>
        </Col>
        <Col md={6} sm={{ size: 5, offset: 0 }} xs={{ size: 10, offset: 1 }}>
          <p>
            <strong>Šimon Rozsíval</strong><br />
            <i>Hlavní vývojář</i><br />
            e-mail:
            {' '}
            <a href="mailto:simon.rozsival@vcelka.cz">
              simon.rozsival@vcelka.cz
            </a>
            <br />
            GitHub: <a href="https://github.com/simonrozsival">simonrozsival</a>
          </p>
        </Col>
        <Col
          md={{ size: 9, offset: 3 }}
          sm={{ size: 10, offset: 2 }}
          xs={{ size: 10, offset: 1 }}
        >
          <p>
            <strong>Michal Tošovský</strong><br />
            <i>Koordinátor Fondu Otakara Motejla</i><br />
            e-mail:
            {' '}
            <a href="mailto:marek.lisy@vcelka.cz">michal.tosovsky@motejl.cz</a>
            <br />
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
