import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { set } from '../../redux/modules/detail';
import { pushState } from 'redux-router';

@connect(
  null,
  (dispatch, props) => ({
    viewDetail: (school) => dispatch(set(school)) && dispatch(pushState(null, `/detail/${school._id}`))
  })
)
export default class ViewDetail extends Component {

  static propTypes = {
    school: PropTypes.object.isRequired,
    viewDetail: PropTypes.func.isRequired
  };

  viewDetail = (event) => {
    event.preventDefault();
    const { school, viewDetail } = this.props;
    viewDetail(school);
  }

  render() {
    const styles = require('./ViewDetailButton.less');
    return (
      <button onClick={this.viewDetail} className={styles.button}>Zobrazit detail</button>
    );
  }

}
