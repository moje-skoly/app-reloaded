import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'reactstrap';

import './SchoolsListItem.less';

export default class SchoolsListItem extends Component {
  static propTypes = {
    school: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    select: PropTypes.func.isRequired
  };

  onClick = event => {
    const { select, school } = this.props;
    select(school);
  };

  getAddressString = school => {
    if (school.metadata.address === undefined) {
      return ''; // the address is missing
    }

    const { street, city, postalCode } = school.metadata.address;
    let address = [street, city, postalCode].filter(s => Boolean(s));
    return address.join(', ');
  };

  getDistance = distance => {
    if (distance >= 1) {
      return `${distance.toFixed(1).toLocaleString().replace('.', ',')} km`;
    }

    return `${(distance * 1000)
      .toFixed(0)
      .toLocaleString()
      .replace('.', ',')} m`;
  };

  render() {
    const { school, isSelected } = this.props;
    const { contact = null } = school.metadata;
    const websites = school.metadata.contact !== undefined
      ? school.metadata.contact.websites
      : [];
    return (
      <button
        className={isSelected ? 'selectedItem' : 'unselectedItem'}
        onClick={this.onClick}
      >
        <Row>
          <Col xs={9}>
            <h2>{school.metadata.name}</h2>
          </Col>
          <Col xs={3}>
            <span className="distance">
              {this.getDistance(school.distance)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={1}><i className="fa fa-map-marker" /></Col>
          <Col xs={11}>{this.getAddressString(school)}</Col>
        </Row>
        {contact !== null &&
          'websites' in contact &&
          contact.websites.length >= 1 &&
          <Row>
            <Col xs={1}><i className="fa fa-link" /></Col>
            <Col xs={11}>
              {websites.map(web => (
                <a
                  href={(!web.startsWith('http') ? 'http://' : '') + web}
                  key={web}
                  target={'_blank'}
                >
                  {web}
                </a>
              ))}
            </Col>
          </Row>}
      </button>
    );
  }
}
