import React, { Component, PropTypes } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './ComparisonStatusBar.less';

@connect(
  state => ({
    schoolsCount: state.comparison.schools.length,
    schoolIds: state.comparison.schools.map(school => school._id).join(',')
  }),
  dispatch => ({
    compare: ids => dispatch(push(`/comparison/${ids}`))
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
    const buttonClassName = schoolsCount <= 1 ? 'empty' : 'ready';
    return (
      <button
        id="comparison-status-bar-tooltip"
        className={buttonClassName}
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

    return (
      <div>
        {this.renderButton()}
        <UncontrolledTooltip
          target="comparison-status-bar-tooltip"
          placement="top"
        >
          Přidejte alespoň dvě školy k porovnání.
        </UncontrolledTooltip>
      </div>
    );
  }
}
