import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { DocumentMeta } from '../../components';
import { ComparisonStatusBar } from '../../containers';

import './Layout.less';

const Menu = props => {
  return (
    <ul className={props.className}>
      <li><Link to="/manifest">manifest</Link></li>
      <li><Link to="/o-projektu/babylon">o projektu</Link></li>
      <li><Link to="/kontakt">kontakt</Link></li>
    </ul>
  );
};

@connect(state => ({ comparisonCount: state.comparison.schools.length }))
export default class App extends Component {
  static propTypes = {
    comparisonCount: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const logoImg = require('../../theme/images/logo.png');
    const nadaceVodafoneImg = require('../../theme/images/vodafone_cs.png');
    const motejlImg = require('../../theme/images/fom.png');
    return (
      <div>
        <DocumentMeta />
        <header id="top" className="top">
          <Container>
            <Row>
              <Col xs={3}>
                <h1>
                  <Link to="/">
                    <img src={logoImg} alt="Moje školy" />
                  </Link>
                </h1>
              </Col>
              <Col xs={9} className="menuRight">
                <Menu />
              </Col>
            </Row>
          </Container>
        </header>

        <div className="appContent">
          {this.props.children}
          <ComparisonStatusBar schoolsCount={this.props.comparisonCount} />
        </div>

        <footer className="bottom">
          <Container>
            <Row>
              <Col md={{ size: 4, offset: 4 }} xs={12} className="sponsors">
                <a href="http://nadacevodafone.cz/">
                  <img src={nadaceVodafoneImg} alt="Nadace Vodafone" />
                </a>
                <a href="http://motejl.cz/">
                  <img src={motejlImg} alt="Fond Otakara Motejla" />
                </a>
              </Col>
              <Col md={4} xs={12} className="menuBottom">
                <Menu className="pull-right" />
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}
