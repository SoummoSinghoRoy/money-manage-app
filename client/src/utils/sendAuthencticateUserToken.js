import axios from "axios";

const sendAuthenticateUserToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token;
  }else {
    axios.defaults.headers.common['Authorization'] = null;
  }
}

export default sendAuthenticateUserToken;