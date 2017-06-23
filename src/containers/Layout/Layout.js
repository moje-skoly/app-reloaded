import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import ComparisonStatusBar
  from '../containers/ComparisonStatusBar/ComparisonStatusBar';

import './Layout.less';

@connect(state => ({
  comparisonCount: state.comparison.schools.length
}))
export default class App extends Component {
  static propTypes = {
    comparisonCount: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  menu(menuClass) {
    return (
      <ul className={menuClass}>
        <li><a href="/manifest">manifest</a></li>
        <li><a href="/o-projektu">o projektu</a></li>
        <li><a href="/kontakt">kontakt</a></li>
      </ul>
    );
  }

  render() {
    const logoImg = require('../../theme/images/logo.png');
    const nadaceVodafoneImg = require('../../theme/images/vodafone_cs.png');
    const motejlImg = require('../../theme/images/fom.png');
    return (
      <div>
        <DocumentMeta {...config.app} />
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
                {this.menu('')}
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
              <Col md={4} mdOffset={4} xs={12} className="sponsors">
                <a href="http://nadacevodafone.cz/">
                  <img src={nadaceVodafoneImg} alt="Nadace Vodafone" />
                </a>
                <a href="http://motejl.cz/">
                  <img src={motejlImg} alt="Fond Otakara Motejla" />
                </a>
              </Col>
              <Col md={4} xs={12} className="menuBottom">
                {this.menu('pull-right')}
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}
