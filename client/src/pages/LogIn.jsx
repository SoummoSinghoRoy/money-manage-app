import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { logInUserAction } from '../store/actions/authAction';
import withNavigateHook from '../components/withNavigateHook';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    error: {},
    messageAlert: true,
    message: ''
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
    if(this.props.error.Message !== '') {
      this.setState({
        messageAlert: true,
        message: this.props.error.Message
      })
    }
    const { email, password } = this.state
    this.props.logInUserAction({ email, password }, this.props.navigation)
  }

  messageAlertClose = () => {
    this.setState({
      messageAlert: false,
      message: '',
      email: '',
      password: ''
    })
  }

  render() {
    let { email, password, error, message } = this.state
    return (
       <div className="container">
        <div className="row my-5">
          <div className="col-4"></div>
          <div className="col-4">
          {message ? <Alert 
                                        variant="success" 
                                        show={this.state.messageAlert} 
                                        onClose=  {this.messageAlertClose} 
                                        dismissible
                                      >
                                        <p className="my-0 fw-bolder">{ message }</p>
                                      </Alert>: null }
            <div className="card px-3 py-3">
              <h5 className="text-center">Log in here</h5>
              <p className="text-center">Don't have an account? <Link to="/register" className="card-link">Registration now</Link> </p>
              <div className="card-body">
                <form method="post" onSubmit={this.submitHandler}>

                  <div className="mb-3">
                  <label htmlFor= "email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={error.email ? 'form-control is-invalid' : 'form-control'}
                      value={ email } 
                      onChange={this.changeHandler}/>
                      { error.email &&  <div className="invalid-feedback">
                                          {error.email}
                                        </div>
                      }
                  </div>

                  <div className="mb-3">
                  <label htmlFor= "password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className={error.password ? 'form-control is-invalid' : 'form-control'}
                      value={ password } 
                      onChange={this.changeHandler}/>
                      {error.password && <div className="invalid-feedback">
                                            {error.password}
                                          </div>
                      }
                  </div>

                  <button type="submit" className="btn btn-primary">Log in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.logIn.error
  }
}

export default connect(mapStateToProps, {logInUserAction})(withNavigateHook(LogIn));