import React, {Component, PropTypes} from 'react';
import SchoolDetail from '../../components/SchoolDetail/SchoolDetail';
import { connect } from 'react-redux';
import { load as loadDetail } from '../../redux/modules/detail';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './Detail.less';

@connect(
  state => ({
    loaded: !!state.detail.loaded,
    loading: !!state.detail.loading,
    error: !!state.detail.error,
    school: state.detail.school
  }),
  (dispatch, props) => ({
    load: () => dispatch(loadDetail(props.params.schoolId))
  })
)
export default class Detail extends Component {

  static propTypes = {
    error: PropTypes.bool,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object.isRequired,
    school: PropTypes.object,
    load: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { error, loaded, loading, load } = this.props;
    if (error === false
      && loaded === false
      && loading === false) {

      load();
    }
  }

  renderError() {
    return <p className="alert alert-warning">Detaily školy není možné zobrazit.</p>;
  }

  renderLoading() {
    return (
      <p>
        Načítám detail školy...
      </p>
    );
  }

  renderDetail() {
    const { school } = this.props;
    return (
      <SchoolDetail school={school} />
    );
  }

  render() {
    const { error, loading } = this.props;
    let data = null;

    if (error === true) {
      data = this.renderError();
    } else if (loading === true) {
      data = this.renderLoading();
    } else {
      data = this.renderDetail();
    }

    return (
      <div className={styles.detailPage}>
        <Grid>
          <Row>
            <Col md={8} mdOffset={2} sm={10} smOffset={1}>
              {data}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
