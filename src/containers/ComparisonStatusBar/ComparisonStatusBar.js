import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(
  state => ({
    schoolsCount: state.comparison.schools.length,
    schoolIds: state.comparison.schools.map(school => school._id).join(',')
  }),
  dispatch => ({
    compare: ids => dispatch(push(null, `/comparison/${ids}`))
  })
)
export default class ComparisonStatusBar extends Component {
  static propTypes = {
    schoolsCount: PropTypes.number.isRequired,
    schoolIds: PropTypes.string.isRequired,
    compare: PropTypes.func.isRequired
  };

  goToComparison = () => {
    const { schoolsCount, schoolIds, compare } = this.props;
    if (schoolsCount >= 1) {
      compare(schoolIds);
    }
  };

  renderButton() {
    const { schoolsCount } = this.props;
    const style = require('./ComparisonStatusBar.less');
    const disabled = schoolsCount <= 1;
    return (
      <button
        className={disabled ? style.empty : style.ready}
        onClick={this.goToComparison}
      >
        Porovnání {schoolsCount} škol
      </button>
    );
  }

  render() {
    const { schoolsCount } = this.props;
    if (schoolsCount > 1) {
      return this.renderButton();
    }

    const tooltip = (
      <Tooltip id={'tooltip'}>Přidejte alespoň dvě školy k porovnání.</Tooltip>
    );

    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        {this.renderButton()}
      </OverlayTrigger>
    );
  }
}
