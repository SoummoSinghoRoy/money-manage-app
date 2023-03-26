import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../store/actions/authAction';
import withNavigateHook from "../components/withNavigateHook";

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {}
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
    const { name, email, password, confirmPassword } = this.state
    this.props.registerUserAction({name, email, password, confirmPassword}, this.props.navigation)
  }

  render() {
    let { name, email, password, confirmPassword, error } = this.state
    return (
       <div className="container">
        <div className="row my-3">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="card px-3 py-3">
              <h5 className="text-center">Registration here</h5>
              <p className="text-center">Have an account? <Link to="/login" className="card-link">Login now</Link> </p>
              <div className="card-body">
                <form method="post" onSubmit={this.submitHandler}>
                  <div className="mb-3">
                    <label htmlFor= "name" className="form-label">Fullname</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className={error.name ? 'form-control is-invalid' : 'form-control'}
                      value={ name } 
                      onChange={this.changeHandler}/>
                      { error.name && <div className="invalid-feedback">
                                        {error.name}
                                      </div> 
                      }
                      
                  </div>

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
                      <p className="text-warning">Note: password must be between 6 to 12 character</p>
                      {error.password && <div className="invalid-feedback">
                                            {error.password}
                                          </div>
                      }
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "confirmPassword" className="form-label">Confirm password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                      value={ confirmPassword } 
                      onChange={this.changeHandler}/>
                      {error.confirmPassword && <div className="invalid-feedback">
                                                  {error.confirmPassword}
                                                </div>
                      }
                  </div>

                  <button type="submit" className="btn btn-primary">Register</button>
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
    error: state.signUp.error,
  }
}
export default connect(mapStateToProps, {registerUserAction})(withNavigateHook(Register));