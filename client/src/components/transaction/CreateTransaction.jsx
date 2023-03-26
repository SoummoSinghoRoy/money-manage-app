import React, {Component} from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createTransactionAction } from '../../store/actions/transactionAction'

class CreateTransactionModal extends Component {
  state = {
    date: '',
    amount: 0,
    transactionType: '',
    description: '',
    error: {},
  }


  static getDerivedStateFromProps(props, state) {
    if(JSON.stringify(props.error) !== JSON.stringify(state.error)) {
      return {
        error: props.error
      }
    }
    return null
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const {date, amount, transactionType, description} = this.state
    this.props.createTransactionAction({date, amount, transactionType, description})
    this.setState({
      date: '',
      amount: 0,
      transactionType: '',
      description: '',
      error: {}
    })
  }

  render() {
    const {date, amount, transactionType, description, error} = this.state
    return (
      <Modal size='lg' show ={ this.props.isShow } onHide= {this.props.isHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create new transaction</Modal.Title>
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
                  isInvalid={error.date} 
                />
                {error.date && <Form.Control.Feedback type="invalid">{error.date}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group as={Col} controlId="amount">
                <Form.Label>Transaction amount</Form.Label>
                <Form.Control 
                  type="number"
                  name="amount"
                  value={ amount }
                  onChange = {this.changeHandler}
                  isInvalid={error.amount} 
                />
                {error.amount && <Form.Control.Feedback type="invalid">{error.amount}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group as={Col} controlId="amount">
                <Form.Label>Transaction type</Form.Label>
                <Form.Control 
                  type="text"
                  name="transactionType"
                  placeholder='Income/Expense'
                  value={ transactionType }
                  onChange = {this.changeHandler}
                  isInvalid={error.transactionType} 
                />
                {error.transactionType && <Form.Control.Feedback type="invalid">{error.transactionType}</Form.Control.Feedback>}
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
                  isInvalid={error.description} 
                />
                {error.description && <Form.Control.Feedback type="invalid">{error.description}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group as={Col} controlId="submitBtn" md={4} className='align-self-center'>
                <Button variant="secondary" type="submit" className='mx-auto d-block'>Save now</Button>
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
    error: state.createTransaction.error,
  }
}

export default connect(mapStateToProps, {createTransactionAction})(CreateTransactionModal);