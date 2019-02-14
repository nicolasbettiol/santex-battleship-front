// Package dependencies
import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class SurrenderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {modalOpen: props.isOpen || false};
  }

  toggleModal = () => this.setState(prevState => ({modalOpen: !prevState.modalOpen}));

  onClickHandler = () => {
    const { onClick } = this.props;

    onClick && onClick();
    // Close modal
    this.toggleModal();
  };

  renderModal = () => {
    return (
      <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} backdrop={false}>
        <ModalHeader toggle={this.toggleModal}>Surrender</ModalHeader>
        <ModalBody>
          Are you sure you want to surrender ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onClickHandler}>Surrender</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderModal()}
        <Button color="warning" onClick={this.toggleModal}>Surrender</Button>
      </Fragment>
    );
  }
}


export default SurrenderModal;
