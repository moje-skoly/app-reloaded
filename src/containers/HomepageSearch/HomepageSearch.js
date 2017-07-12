import React, { Component, PropTypes } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { load as filter } from '../../redux/modules/filter';

import './HomepageSearch.less';

@connect(state => ({}))
export default class HomepageSearch extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    loc: '',
    type: 'zakladni_skola',
    canSearch: false
  };

  changeLoc = event => {
    this.setState({
      loc: event.target.value,
      canSearch: event.target.value.length > 0
    });
  };

  changeType = event => {
    this.setState({
      type: event.target.value
    });
  };

  searchSchool = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { loc, type, canSearch } = this.state;
    if (canSearch) {
      dispatch(
        push(`/filter/${encodeURIComponent(loc)}/${encodeURIComponent(type)}`)
      );
    }
  };
  render() {
    const { loc, type, canSearch } = this.state;
    return (
      <Container>
        <div className="searchBox">
          <form className="form form-horizontal">
            <Row>
              <Col md={8} xs={12}>
                <label htmlFor="loc">Vaše adresa</label>
                <Input
                  id="loc"
                  type="text"
                  value={loc}
                  onChange={this.changeLoc}
                  placeholder="zadejte adresu vašeho bydliště nebo lokalitu, ve které hledáte školu"
                />
              </Col>
              <Col md={2} xs={6}>
                <label htmlFor="type">Typ školy</label>
                <Input
                  id="type"
                  type="select"
                  name="school_type"
                  value={type}
                  onChange={this.changeType}
                >
                  <option value="materska_skola">Mateřská</option>
                  <option value="zakladni_skola">Základní</option>
                  <option value="stredni_skola">Střední</option>
                </Input>
              </Col>
              <Col md={2} xs={6}>
                <label>&nbsp;</label>
                <button
                  className="searchBtn"
                  onClick={this.searchSchool}
                  disabled={!canSearch}
                >
                  Najít Školu
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    );
  }
}
