import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { set } from '../../redux/modules/detail';
import { push } from 'react-router-redux';
import './ViewDetailButton.less';

@connect(null, (dispatch, props) => ({
  viewDetail: school =>
    dispatch(set(school)) && dispatch(push(`/detail/${school._id}`))
}))
export default class ViewDetail extends Component {
  static propTypes = {
    school: PropTypes.object.isRequired,
    viewDetail: PropTypes.func.isRequired
  };

  viewDetail = event => {
    event.preventDefault();
    const { school, viewDetail } = this.props;
    viewDetail(school);
  };

  render() {
    return (
      <button onClick={this.viewDetail} className="button">
        Zobrazit detail
      </button>
    );
  }
}
