import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Container, Row, Col, Alert } from 'reactstrap';
import {
  loadComparison,
  remove as removeFromComparison
} from '../../redux/modules/comparison';
import { MetaData } from '../../containers';
import { SchoolsMap, ComparisonButton } from '../../components';
import './Comparison.less';

const scrollStep = 400;

const getUnitType = type => {
  switch (type) {
    case 'materska_skola':
      return 'Mateřská škola';

    case 'zakladni_skola':
      return 'Základní škola';

    case 'stredni_skola':
      return 'Střední škola';

    default:
      return type;
  }
};

const getSchoolIdsArray = schoolIds => {
  return schoolIds.split(',');
};

@connect(
  (state, props) => ({
    error: !!state.comparison.error,
    loading: state.comparison.loading === true,
    loaded: state.comparison.loaded === true,
    schools: state.comparison.schools
  }),
  dispatch => ({
    load: ids => dispatch(loadComparison(getSchoolIdsArray(ids))),
    compare: schools => {
      const ids = schools.map(school => school._id).join(',');
      dispatch(push(`/comparison/${ids}`));
    },
    remove: school => dispatch(removeFromComparison(school)),
    returnToHomepage: () => dispatch(push('/'))
  })
)
export default class Comparison extends Component {
  static propTypes = {
    error: PropTypes.bool,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    schools: PropTypes.array,
    params: PropTypes.object,
    load: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    returnToHomepage: PropTypes.func.isRequired
  };

  state = {
    focusedSchool: 0,
    showArrows: true
  };

  componentDidMount = () => {
    const { error, loaded, loading, load, params: { schoolIds } } = this.props;
    if (error === false && loaded === false && loading === false) {
      load(schoolIds); // load the comparison data again according to the URL params
    }

    window.addEventListener('resize', this.checkArrowsNecessity);
    this.checkArrowsNecessity();
  };

  componentWillReceiveProps = newProps => {
    // reflect URL changes
    if (
      this.props.params.schoolIds !== newProps.params.schoolIds ||
      this.props.loaded === false
    ) {
      const { loaded, load, params: { schoolIds }, schools } = newProps;
      const schoolIdsArray = getSchoolIdsArray(schoolIds);
      const loadedSchoolsIds = schools.map(school => school._id);

      if (loaded === true && loadedSchoolsIds.length < schoolIdsArray.length) {
        load(schoolIds); // load the comparison data again according to the URL params
      } else if (
        loaded === true && loadedSchoolsIds.length > schoolIdsArray.length
      ) {
        // remove the schools, which are redundant! :-)
        const { remove } = this.props;
        schools
          .filter(school => schoolIdsArray.indexOf(school._id) === -1)
          .map(remove);
      }
    }

    if (this.props.schools.length !== newProps.schools.length) {
      this.checkArrowsNecessity();
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.checkArrowsNecessity);
  };

  checkArrowsNecessity = () => {
    if (
      !!this.refs.table &&
      !!this.refs.page &&
      this.refs.table.getBoundingClientRect().width <=
        this.refs.page.getBoundingClientRect().width
    ) {
      this.setState({
        showArrows: false,
        focusedSchool: 0
      });
    } else if (this.state.showArrows === false) {
      this.setState({
        showArrows: true
      });
    }
  };

  hasInfo(school) {
    const { units } = school;
    let has = false;
    units.map(unit => {
      if (!!unit.sections) {
        has = true;
      }
    });
    return has;
  }

  missingInfoWarning(school) {
    if (!this.hasInfo(school)) {
      return (
        <Alert color="warning" className="comparisonAlert">
          Omlouváme se, tato škola nemá vyplněný podrobný profil. Data přebíráme z
          {' '}
          <a href="https://portal.csicr.cz/" target="_blank">
            Portálu České Školní Inspekce
          </a>
          .
        </Alert>
      );
    }
    return '';
  }

  prevSchool() {
    this.setState({
      focusedSchool: Math.max(0, this.state.focusedSchool - 1)
    });
  }

  nextSchool() {
    this.setState({
      focusedSchool: Math.min(
        this.props.schools.length - 1,
        this.state.focusedSchool + 1
      )
    });
  }

  removeSchool = removedSchool => {
    const { schools, compare, returnToHomepage } = this.props;
    const remainingSchools = schools.filter(
      school => school._id !== removedSchool._id
    );

    if (remainingSchools.length === 0) {
      returnToHomepage();
    } else {
      compare(remainingSchools);
    }
  };

  renderLoading() {
    return <p className="loading">Načítám srovnání škol...</p>;
  }

  renderError() {
    return (
      <p className="alert alert-warning">
        Došlo k chybě při komunikaci se serverem.
      </p>
    );
  }

  renderNoSchools() {
    return (
      <p className="alert alert-warning">
        Nejsou vybrány žádné školy k porovnávání.
      </p>
    );
  }

  renderSchools(schools) {
    // find the unit types of all the schools
    const unitTypes = schools
      .reduce(
        (schoolAcc, school) => [
          ...schoolAcc,
          ...school.units.reduce(
            (unitAcc, unit) => [...unitAcc, unit.unitType],
            []
          )
        ],
        []
      )
      .reduce(
        (acc, item) => (acc.indexOf(item) < 0 ? [...acc, item] : acc),
        []
      );

    return (
      <table className="comparisonTable" ref={'table'}>
        <tbody>
          {/* Metadata */}
          <tr>
            {schools.map((school, index) => (
              <td key={index} className="comparisonSegment">
                <div className="comparisonBlock">
                  <span className="pull-right">
                    <ComparisonButton
                      school={school}
                      onClick={() => this.removeSchool(school)}
                    />
                  </span>
                </div>
                <div className="comparisonBlock">
                  <MetaData data={school.metadata} isTitle />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            {schools.map((school, index) => (
              <td key={index}>
                {school.metadata.address.location &&
                  <SchoolsMap
                    schools={[school]}
                    center={school.metadata.address.location}
                    allowZoom={false}
                    centerTitle={school.metadata.name}
                    scrollWheelZoom={false}
                  />}
              </td>
            ))}
          </tr>

          <tr>
            {schools.map((school, index) => (
              <td key={'school-' + index}>
                {this.missingInfoWarning(school)}
              </td>
            ))}
          </tr>

          {/* Unit types */}
          {unitTypes.map(type => this.renderUnit(type, schools))}
        </tbody>
      </table>
    );
  }

  renderUnit(type, schools) {
    const units = schools.map(school =>
      school.units.find(unit => unit.unitType === type)
    );
    return [
      <tr key={'type-' + type + '-title'}>
        {units.map((unit, unitId) => (
          <td key={unitId}>
            <h3 className="unitTitle">{getUnitType(type)}</h3>
          </td>
        ))}
      </tr>,
      <tr key={'type-' + type + '-content'}>
        {units.map((unit, unitId) => (
          <td key={unitId} className="unit">
            {unit && unit.metadata
              ? <MetaData data={unit.metadata} />
              : <div className="missingUnit">
                  {getUnitType(type)} na této škole není.
                </div>}
          </td>
        ))}
      </tr>,
      this.renderUnitSections(units)
    ];
  }

  renderUnitSections(units) {
    const sections = units
      .map(unit => (!!unit ? unit.sections : []))
      .reduce(
        (acc, unit) =>
          (!unit
            ? acc
            : [
                ...acc,
                ...unit.reduce(
                  (unitAcc, section) => [...unitAcc, section.title],
                  []
                )
              ]),
        []
      )
      .reduce(
        (acc, item) => (acc.indexOf(item) < 0 ? [...acc, item] : acc),
        []
      );

    return sections
      .map((section, sectionId) => [
        <tr key={'section-' + sectionId}>
          {units.map((unit, unitId) => (
            <td key={unitId}>
              <h4 className="sectionTitle">{section}</h4>
            </td>
          ))}
        </tr>,
        this.renderUnitSection(
          units.map(
            unit =>
              (!unit || !unit.sections
                ? []
                : unit.sections.find(sec => sec.title === section))
          )
        )
      ])
      .reduce((acc, item) => [...acc, item[0], item[1]], []);
  }

  renderUnitSection(sections) {
    const questions = sections
      .map(
        section => (!section || !section.information ? [] : section.information)
      )
      .reduce(
        (sectionsAcc, information) => [
          ...sectionsAcc,
          ...information.reduce(
            (informationAcc, { key }) => [...informationAcc, key],
            []
          )
        ],
        []
      )
      .reduce(
        (acc, item) => (acc.indexOf(item) < 0 ? [...acc, item] : acc),
        []
      );

    return questions.map((question, questionId) => (
      <tr key={'question-' + questionId}>
        {sections.map((section, sectionId) => {
          const answer = !section || !section.information
            ? null
            : section.information.find(({ key }) => key === question);
          return (
            <td
              className={!answer ? 'missing' : null}
              key={'section-' + sectionId}
            >
              <p className="question">{question}{':'}</p>
              <p className="answer">{!answer ? '-' : answer.value}</p>
            </td>
          );
        })}
      </tr>
    ));
  }

  renderComparison() {
    const { schools } = this.props;
    const { focusedSchool, showArrows } = this.state;

    return (
      <div className="comparisonPage" ref="page">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="title comparisonTitle">Srovnání škol</h2>
            </Col>
          </Row>
          {showArrows &&
            <Row>
              <Col xs={6}>
                <button
                  onClick={() => this.prevSchool()}
                  className="moveLeft"
                />
              </Col>
              <Col xs={6}>
                <button
                  onClick={() => this.nextSchool()}
                  className="moveRight"
                />
              </Col>
            </Row>}
        </Container>

        <div
          className="comparisonRow"
          style={{ left: -1 * scrollStep * focusedSchool }}
        >
          {schools.length > 0
            ? this.renderSchools(schools)
            : this.renderNoSchools()}
        </div>
      </div>
    );
  }

  render() {
    const { loading, loaded, error } = this.props;
    if (error === true) {
      return this.renderError();
    }

    if (loading === true) {
      return this.renderLoading();
    }

    if (loaded === true) {
      return this.renderComparison();
    }

    return null; // do not render anything until something is happening
  }
}
