import React, {Component} from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from '../pages/Home';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import Transaction from '../pages/Transaction';
import AppLayout from './partials/AppLayout';
import AuthenticateRoute from './partials/AuthenticateRoute';
import UnAuthenticateRoute from './partials/UnAuthenticateRoute';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= { <AppLayout/> }>
              <Route index element= {<Home/>}/>
              <Route path='transaction' element= {
                <AuthenticateRoute>
                  <Transaction />
                </AuthenticateRoute>
              }/>
              <Route path='register' element= {
                <UnAuthenticateRoute>
                  <Register />
                </UnAuthenticateRoute>
              }/>
              <Route path='login' element= {
                <UnAuthenticateRoute>
                  <LogIn />
                </UnAuthenticateRoute>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
