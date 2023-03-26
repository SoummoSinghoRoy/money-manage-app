import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store/index';
import * as Types from './store/actions/types';
import sendAuthenticateUserToken from './utils/sendAuthencticateUserToken';

const root = ReactDOM.createRoot(document.getElementById('root'));

const token = localStorage.getItem('loggedIn_user_token')
sendAuthenticateUserToken(token)

if(token) {
  const decode = jwtDecode(token)
  store.dispatch({
    type: Types.LogIn_User,
    payload: {
      user: decode
    }
  })
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
