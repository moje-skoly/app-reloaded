import React, {Component, PropTypes} from 'react';
import MetaData from '../../containers/MetaData/MetaData';
import ComparisonButton from '../../components/ComparisonButton/ComparisonButton';
import { connect } from 'react-redux';
import ViewDetailButton from '../../containers/ViewDetailButton/ViewDetailButton';

@connect(
  (state, props) => ({
    loading: !!state.filter.loading,
    loaded: !!state.filter.loaded,
    error: !!state.filter.error,
    school: state.filter.schools.find(school => school._id === props.params.previewId)
  })
)
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

  viewDetail = (event) => {
    event.preventDefault();
    const { school, viewDetail } = this.props;
    viewDetail(school);
  }

  renderLoading() {
    return (
      <p>Načítám data...</p>
    );
  }

  renderError() {
    return (
      <p className={'alert alert-warning'}>Informace o škole nejsou k dispozici.</p>
    );
  }

  renderPreview() {
    const { school } = this.props;
    const styles = require('./SchoolPreview.less');
    return (
      <div className={styles.preview}>
        <div className={styles.header}>
          <span className={'pull-right'}>
            <ComparisonButton school={school} className={styles.green} />
          </span>
        </div>
        <div className={styles.body}>
          <MetaData data={school.metadata} />
        </div>
        <div className={styles.footer}>
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
