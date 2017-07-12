import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { search } from '../../redux/modules/filter';
import './SchoolFilter.less';

@connect(
  state => ({
    loading: !!state.filter.loading,
    loaded: !!state.filter.loaded,
    error: !!state.filter.error,
    schoolsCount: state.filter.schools.length
  }),
  dispatch => ({
    search: (address, schoolType) =>
      dispatch(
        push(
          `/filter/${encodeURIComponent(address)}/${encodeURIComponent(schoolType)}`
        )
      )
  })
)
export default class SchoolFilter extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.bool,
    schoolsCount: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    schoolType: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const { address, schoolType } = this.props;
    this.setState({
      address,
      schoolType,
      showFilter: false
    });
  };

  // componentDidMount = () => {
  //   const { loading, loaded, error } = this.props;
  //   if (error === false && loaded === false && loading === false) {
  //     this.load();
  //   }
  // };

  componentWillReceiveProps = props => {
    if (
      props.address !== this.state.address ||
      props.schoolType !== this.state.schoolType
    ) {
      this.setState({
        address: props.address,
        schoolType: props.schoolType
      });
    }
  };

  onClick = event => {
    event.preventDefault();

    const { search } = this.props;
    const { address, schoolType } = this.state;
    search(address, schoolType);
  };

  getResultCountable = resultCount => {
    if (resultCount === 0 || resultCount > 4) {
      return 'nejbližších škol';
    }
    return resultCount > 1 ? 'nejbližší školy' : 'nejbližší škola';
  };

  toggleFilter = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

  changeAddress = event => this.setState({ address: event.target.value });
  changeType = event => this.setState({ schoolType: event.target.value });

  render() {
    const { showFilter, address, schoolType } = this.state;
    const { loading, schoolsCount } = this.props;

    return (
      <div>
        <p className={'text-right'}>
          <span className="countTag">
            {schoolsCount} {this.getResultCountable(schoolsCount)}
          </span>
          <button className="toggleSettings" onClick={this.toggleFilter}>
            {'podrobné filtrování'}
            <span className="arrow">
              <i
                className={'fa fa-' + (showFilter ? 'angle-up' : 'angle-down')}
              />
            </span>
          </button>
        </p>

        {showFilter &&
          <form className="advancedFiltering">
            <h3>Lokalita</h3>
            <p className={'form-group'}>
              <input
                value={address}
                onChange={this.changeAddress}
                className={'form-control'}
              />
            </p>

            <h3>Typ školy</h3>
            <p className={'form-group'}>
              <select
                id="type"
                name="school_type"
                className={'form-control'}
                value={schoolType}
                onChange={this.changeType}
              >
                <option value="materska_skola">Mateřská</option>
                <option value="zakladni_skola">Základní</option>
                <option value="stredni_skola">Střední</option>
              </select>
            </p>
            <hr />
            <p className={'text-right'}>
              <button
                disabled={loading}
                className="filterBtn"
                onClick={this.onClick}
              >
                {loading === true
                  ? 'Probíhá vyhledávání...'
                  : 'Změnit kritéria'}
              </button>
            </p>
          </form>}
      </div>
    );
  }
}
