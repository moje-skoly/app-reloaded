import React, { Component, PropTypes } from 'react';
import { MetaData, ViewDetailButton } from '../../containers';
import { ComparisonButton } from '../../components';
import { connect } from 'react-redux';
import './SchoolPreview.less';

@connect((state, props) => ({
  loading: !!state.filter.loading,
  loaded: !!state.filter.loaded,
  error: !!state.filter.error,
  school: state.filter.schools.find(
    school => school._id === props.params.previewId
  )
}))
export default class SchoolPreview extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.bool,
    school: PropTypes.object,
    params: PropTypes.shape({
      previewId: PropTypes.string.isRequired
    }).isRequired
  };

  viewDetail = event => {
    event.preventDefault();
    const { school, viewDetail } = this.props;
    viewDetail(school);
  };

  renderLoading() {
    return <p>Načítám data...</p>;
  }

  renderError() {
    return (
      <p className={'alert alert-warning'}>
        Informace o škole nejsou k dispozici.
      </p>
    );
  }

  renderPreview() {
    const { school } = this.props;
    return (
      <div className="preview">
        <div className="header">
          <span className="pull-right">
            <ComparisonButton school={school} className="green" />
          </span>
        </div>
        <div className="body">
          <MetaData data={school.metadata} />
        </div>
        <div className="footer">
          <ViewDetailButton school={school} />
        </div>
      </div>
    );
  }

  render() {
    const { error, loading, loaded } = this.props;

    if (error === true) {
      return this.renderError();
    }

    if (loading === true) {
      return this.renderLoading();
    }

    if (loaded === true) {
      return this.renderPreview();
    }

    return null;
  }
}
