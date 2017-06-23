import React, {PropTypes, Component} from 'react';
import {add as addToComparison, remove as removeFromComparison} from '../../redux/modules/comparison';
import {connect} from 'react-redux';

@connect(
  (state, props) => ({
    isIncluded: state.comparison.schools.find(school => school._id === props.school._id) !== undefined
  }),
  (dispatch, props) => ({
    add: () => dispatch(addToComparison(props.school)),
    remove: () => dispatch(removeFromComparison(props.school))
  })
)
export default class ComparisonButton extends Component {

  static propTypes = {
    school: PropTypes.object.isRequired,
    isIncluded: PropTypes.bool,
    remove: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    onClick: PropTypes.func
  };

  toggle = () => {
    const { isIncluded, add, remove, onClick } = this.props;
    const toggle = isIncluded === false ? add : remove;
    toggle();

    if (!!onClick) {
      onClick();
    }
  };

  render() {
    const { isIncluded } = this.props;
    const styles = require('./ComparisonButton.less');
    const text = isIncluded ? 'Odebrat z porovnávání' : 'Přidat k porovnání';
    const btnStyle = isIncluded ? styles.removeFromComparison : styles.addToComparison;

    return (
      <button onClick={this.toggle} className={btnStyle}>{text}</button>
    );
  }

}
