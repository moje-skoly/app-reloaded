import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Sticky from 'react-stickynode';

import { search } from '../../redux/modules/filter';
import {
  select as selectPreview,
  unselect as unselectPreview
} from '../../redux/modules/preview';

import {
  SchoolFilter,
  SchoolsList,
  SuggestedAddresses
} from '../../containers';
import { SchoolsMap } from '../../components';

import './Filter.less';

const FilterWrapper = ({ children }) => (
  <div className="homepage">
    <Container>
      <Row>
        {children}
      </Row>
    </Container>
  </div>
);

@connect(
  (state, props) => ({
    schools: state.filter.schools,
    addresses: state.filter.addresses || [],
    center: state.filter.center,
    loaded: state.filter.loaded,
    loading: state.filter.loading,
    error: state.filter.error
  }),
  dispatch => ({
    select: selectPreview(dispatch),
    unselect: unselectPreview(dispatch),
    filter: (address, schoolType) => dispatch(search(address, schoolType))
  })
)
export default class Filter extends Component {
  static propTypes = {
    center: PropTypes.object,
    children: PropTypes.object,
    schools: PropTypes.array.isRequired,
    addresses: PropTypes.array,

    select: PropTypes.func.isRequired,
    unselect: PropTypes.func.isRequired,

    params: PropTypes.shape({
      address: PropTypes.string.isRequired,
      schoolType: PropTypes.string.isRequired,
      previewId: PropTypes.string
    }).isRequired
  };

  componentWillMount = () => {
    this.runSearch();
  };

  componentDidUpdate(prevProps) {
    const { params } = prevProps;
    if (
      params.address !== this.props.params.address ||
      params.schoolType !== this.props.params.schoolType
    ) {
      this.runSearch();
    }
  }

  runSearch = () => {
    const { params: { address, schoolType } } = this.props;
    this.props.filter(address, schoolType);
  };

  selectSchool = school => {
    const { select, unselect, params } = this.props;
    const { address, schoolType, previewId } = params;
    if (school._id === previewId) {
      unselect(school, address, schoolType);
    } else {
      select(school, address, schoolType);
    }
  };

  renderError() {
    return (
      <FilterWrapper>
        <Col>Nastala chyba při vyhledávání.</Col>
      </FilterWrapper>
    );
  }

  renderLoading() {
    return (
      <FilterWrapper>
        <Col>Probíhá vyhledávání nejbližších škol...</Col>
      </FilterWrapper>
    );
  }

  render() {
    const {
      schools,
      children,
      center,
      params,
      addresses,
      loaded,
      loading,
      error
    } = this.props;

    if (error) {
      return this.renderError();
    } else if (!loaded || loading) {
      return this.renderLoading();
    }

    const { schoolType, previewId } = params;
    const filteredAddresses = addresses.filter((addr, index) => index !== 0);
    const address = addresses[0];

    const unitsOnMap = schools.map(school => {
      const unitOfType = school.units.find(
        unit => unit.unitType === schoolType
      );
      if (!!unitOfType && !!unitOfType.metadata.address.location) {
        // change the location of the school to the location of the unit
        school.metadata.address.location = unitOfType.metadata.address.location;
      }

      return school;
    });

    return (
      <div className="homepage">
        <Container>
          <Row>
            <Col sm={6}>
              <h1 className="underlinedTitle">{'Nejbližší školy'}</h1>
              <p className="radiusParagraph">od místa {address}</p>
              <SchoolFilter address={address} schoolType={schoolType} />
              <SuggestedAddresses
                currentAddress={address}
                addresses={filteredAddresses}
                type={schoolType}
              />
              <SchoolsList
                schools={schools}
                select={this.selectSchool}
                previewId={previewId}
              />
            </Col>
            <Col sm={6}>
              <div className="map">
                <SchoolsMap
                  schools={unitsOnMap}
                  select={this.selectSchool}
                  center={center}
                  centerTitle={address}
                />
              </div>
              <Sticky top={20}>
                <div>
                  {children}
                </div>
              </Sticky>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
