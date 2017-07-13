import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(null, (dispatch, props) => ({
  load: address => {
    dispatch(
      push(
        `/filter/${encodeURIComponent(address)}/${encodeURIComponent(props.type)}`
      )
    );
  }
}))
export default class SuggestedAdresses extends Component {
  static propTypes = {
    currentAddress: PropTypes.string.isRequired,
    addresses: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired
  };

  state = {
    shown: false
  };

  hide = () => {
    this.setState({
      shown: false
    });
  };

  toggle = () => {
    this.setState({
      shown: !this.state.shown
    });
  };

  search = address => {
    const { load } = this.props;
    load(address);
    this.hide();
  };

  echoSimilar(count) {
    if (count === 1) {
      return 'podobnou adresu';
    } else if (count >= 2 && count <= 4) {
      return 'podobné adresy';
    }

    return 'podobných adres';
  }

  render() {
    const { currentAddress, addresses } = this.props;
    if (addresses.length === 0) {
      return null; // do not render anything
    }

    const firstAddr = addresses[0];
    if (addresses.length === 1 && firstAddr === currentAddress) {
      return null;
    }

    return (
      <div>
        <Alert color={'info'}>
          Mysleli jste
          {' '}
          <a onClick={() => this.search(firstAddr)} href={'#'}>{firstAddr}</a>
          {addresses.length > 1 &&
            <span>
              {' nebo '}
              <a href={'#'} onClick={this.toggle}>
                {addresses.length - 1}
                {' '}
                {this.echoSimilar(addresses.length - 1)}
              </a>
            </span>}
          {'?'}
        </Alert>
        <Modal isOpen={this.state.shown} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Navrhované adresy
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {addresses.map((address, index) => (
                <ListGroupItem key={index} onClick={() => this.search(address)}>
                  {address}
                </ListGroupItem>
              ))}
            </ListGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
