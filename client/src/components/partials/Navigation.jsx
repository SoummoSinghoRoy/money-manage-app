import React from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUserAction } from '../../store/actions/authAction';

const Navigation = (props) => {
  const navgiation = useNavigate()
  
  const logoutBtnClickHandler = () => {
    props.logoutUserAction(navgiation)
  }

  return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-warning-subtle">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Money-Management-App</NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/">Home</NavLink>
            </li>
            {
              props.user.isAuthenticated ? 
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/transaction">Transaction</NavLink>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-danger" onClick={logoutBtnClickHandler} style={{background: "none", color: "#333129", border: "none"}}>Logout</button>
                </li>
              </React.Fragment> :
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/register">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/login">LogIn</NavLink>
                </li>
              </React.Fragment> 
            }
          </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.logIn
  }
}

export default connect(mapStateToProps, {logoutUserAction})(Navigation);