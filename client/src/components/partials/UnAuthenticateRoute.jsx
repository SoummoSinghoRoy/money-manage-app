import React from 'react';
import {Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUserAction } from '../../store/actions/authAction';

const UnAuthenticateRoute = ({children, authenticatedUser}) => {
  if(authenticatedUser === false) {
    return children
  }
  return <Navigate to='/transaction'/>
}

const mapStateToProps= (state) => {
  return {
    authenticatedUser: state.logIn.isAuthenticated 
  }
}
export default connect(mapStateToProps, {logInUserAction})(UnAuthenticateRoute);


