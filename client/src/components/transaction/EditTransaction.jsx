import React, {Component} from 'react';
import { Modal, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { editTransactionAction } from '../../store/actions/transactionAction'

class EditTransactionModal extends Component {
  state = {
    date: '',
    amount: 0,
    transactionType: '',
    description: '',
    messageAlert: true,
    updateSuccessMsg: '',
    updateErrorMsg: ''
  }

  componentDidMount() {
    this.setState({
      date: this.props.currentTransactionInfo.date,
      amount: this.props.currentTransactionInfo.amount,
      transactionType: this.props.currentTransactionInfo.transactionType,
      description: this.props.currentTransactionInfo.description,
    })
  }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const {date, amount, description, transactionType} = this.state
    this.props.editTransactionAction(this.props.currentTransactionInfo._id, {date, amount, description, transactionType})
    this.setState({
      messageAlert: true,
      updateSuccessMsg: this.props.updateSuccessMsg,
      updateErrorMsg: this.props.updateErrorMsg
    })
    // this.props.isHide()
  }

  messageAlertClose = () => {
    this.setState({
      messageAlert: false,
      updateSuccessMsg: '',
      updateErrorMsg: ''
    })
  }

  render() {
    const {date, amount, transactionType, description, updateSuccessMsg, updateErrorMsg } = this.state
    return (
      <Modal size='lg' show ={ this.props.isShow } onHide= {this.props.isHide}>
        {updateSuccessMsg ? <Alert 
                                        variant="success" 
                                        show={this.state.messageAlert} 
                                        onClose=  {this.messageAlertClose} 
                                        dismissible
                                      >
                                        <p className="my-0 fw-bolder">{ updateSuccessMsg }</p>
                                      </Alert>: null }
        {updateErrorMsg ? <Alert 
                                        variant="success" 
                                        show={this.state.messageAlert} 
                                        onClose=  {this.messageAlertClose} 
                                        dismissible
                                      >
                                        <p className="my-0 fw-bolder">{ updateErrorMsg }</p>
                                      </Alert>: null }
        <Modal.Header closeButton>
          <Modal.Title>Update transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method='post' onSubmit={this.submitHandler} className='pt-3 pb-5'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Transaction date</Form.Label>
                <Form.Control 
                  type="date"
                  name="date"
                  value={ date }
                  onChange = {this.changeHandler} 
                />
              </Form.Group>  

              <Form.Group as={Col} controlId="amount">
                <Form.Label>Transaction amount</Form.Label>
                <Form.Control 
                  type="number"
                  name="amount"
                  value={ amount }
                  onChange = {this.changeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="amount">
                <Form.Label>Transaction type</Form.Label>
                <Form.Control 
                  type="text"
                  name="transactionType"
                  placeholder='Income/Expense'
                  value={ transactionType }
                  onChange = {this.changeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="description" md={8}>
                <Form.Label>Short description</Form.Label>
                <Form.Control 
                  as="textarea"
                  style={{ height: '100px'}}
                  name="description"
                  value={ description }
                  onChange = {this.changeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="submitBtn" md={4} className='align-self-center'>
                <Button variant="secondary" type="submit" className='mx-auto d-block'>Update now</Button>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    updateSuccessMsg: state.editTransaction.successMessage,
    updateErrorMsg: state.editTransaction.errorMessage,
    // updateSuccessMsg: state.allTransactions.updateSuccessMsg,
    // updateErrorMsg: state.allTransactions.errorMessage,

  }
}

export default connect(mapStateToProps, { editTransactionAction })(EditTransactionModal);