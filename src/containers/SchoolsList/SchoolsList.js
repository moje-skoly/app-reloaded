import React, { Component, PropTypes } from 'react';
import { SchoolsListItem } from '../';
import { connect } from 'react-redux';

@connect(
  state => ({
    error: !!state.filter.error,
    loading: !!state.filter.loading,
    loaded: !!state.filter.loaded,
    schools: state.filter.schools
  })
)
export default class SchoolsList extends Component {

  static propTypes = {
    error: PropTypes.bool,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    schools: PropTypes.array,
    select: PropTypes.func
  };

  renderError() {
    return <p className="alert alert-warning">Nastala chyba při komunikaci se úložištěm dat o školách.</p>;
  }

  renderLoading() {
    return (
      <div>Probíhá načítání dat...</div>
    );
  }

  renderList() {
    const { schools, select } = this.props;
    const styles = require('./SchoolsList.less');
    return (
      <div className={styles.schoolsList}>
        {schools.map(school =>
          <SchoolsListItem key={school._id} school={school} select={select} />
        )}

        {schools.length === 0 && (
          <p className={'alert alert-warning'}>
            V databázi nejsou žádné školy odpovídající Vašim požadavkům.
          </p>
        )}
      </div>
    );
  }

  render() {
    if (this.props.error === true) {
      return this.renderError();
    }

    if (this.props.loaded) {
      return this.renderList();
    }

    if (this.props.loading) {
      return this.renderLoading();
    }

    return null; // do not render anything until the data is ready
  }

}
