import React from 'react';
import {Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUserAction } from '../../store/actions/authAction';

const AuthenticateRoute = ({children, authenticatedUser}) => {
  if(authenticatedUser === true) {
    return children
  }
  return <Navigate to='/login'/>
}

const mapStateToProps= (state) => {
  return {
    authenticatedUser: state.logIn.isAuthenticated 
  }
}
export default connect(mapStateToProps, {logInUserAction})(AuthenticateRoute);


