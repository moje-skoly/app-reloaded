import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import ComparisonStatusBar from '../../containers/ComparisonStatusBar/ComparisonStatusBar';

@connect(
  state => ({
    comparisonCount: state.comparison.schools.length
  })
)
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
    const styles = require('./App.less');
    const logoImg = require('../../theme/images/logo.png');
    const nadaceVodafoneImg = require('../../theme/images/vodafone_cs.png');
    const motejlImg = require('../../theme/images/fom.png');
    return (
      <div>
        <DocumentMeta {...config.app}/>
        <header id="top" className={styles.top}>
          <Grid>
            <Row>
              <Col xs={3}>
                <h1><IndexLink to="/"><img src={logoImg} alt="Moje školy"/></IndexLink></h1>
              </Col>
              <Col xs={9} className={styles.menuRight}>
                {this.menu('')}
              </Col>
            </Row>
          </Grid>
        </header>

        <div className={styles.appContent}>
          {this.props.children}
          <ComparisonStatusBar schoolsCount={this.props.comparisonCount} />
        </div>

        <footer className={styles.bottom}>
          <Grid>
            <Row>
              <Col md={4} mdOffset={4} xs={12} className={styles.sponsors}>
                <a href="http://nadacevodafone.cz/">
                  <img src={nadaceVodafoneImg} alt="Nadace Vodafone"/>
                </a>
                <a href="http://motejl.cz/">
                  <img src={motejlImg} alt="Fond Otakara Motejla"/>
                </a>
              </Col>
              <Col md={4} xs={12} className={styles.menuBottom}>
                {this.menu('pull-right')}
              </Col>
            </Row>
          </Grid>
        </footer>
      </div>
    );
  }
}
