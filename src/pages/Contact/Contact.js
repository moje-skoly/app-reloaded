import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Contact = () => {
  const styles = require('./Contact.less');
  return (
    <Grid className={styles.about}>
      <Row>
        <h1><strong>Kontakt</strong></h1>
        <Col md={3} mdOffset={3} sm={5} smOffset={2} xs={10} xsOffset={1}>
          <p>
            <strong>Marek Lisý</strong><br/>
            <i>Koordinátor projektu</i><br/>
            e-mail: <a href="mailto:marek.lisy@vcelka.cz">marek.lisy@vcelka.cz</a><br/>
            blog: <a href="http://www.mareklisy.cz">www.mareklisy.cz</a>
          </p>
        </Col>
        <Col md={6} sm={5} smOffset={0} xs={10} xsOffset={1}>
          <p>
            <strong>Šimon Rozsíval</strong><br/>
            <i>Hlavní vývojář</i><br/>
            e-mail: <a href="mailto:simon.rozsival@vcelka.cz">simon.rozsival@vcelka.cz</a><br/>
            GitHub: <a href="https://github.com/simonrozsival">simonrozsival</a>
          </p>
        </Col>
        <Col md={9} mdOffset={3} sm={10} smOffset={2} xs={10} xsOffset={1}>
          <p>
            <strong>Michal Tošovský</strong><br/>
            <i>Koordinátor Fondu Otakara Motejla</i><br/>
            e-mail: <a href="mailto:marek.lisy@vcelka.cz">michal.tosovsky@motejl.cz</a><br/>
          </p>
        </Col>
      </Row>
    </Grid>
  );
};

export default Contact;
