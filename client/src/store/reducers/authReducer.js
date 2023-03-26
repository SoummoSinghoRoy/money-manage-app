import * as Types from '../actions/types';

let initialState = {
  user: {},
  isAuthenticated: false,
  error: {}
}

export const signUpReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.Register_User: {
      return {
        user: action.payload.registeredUser,
        isAuthenticated: Object.keys(action.payload.registeredUser).length !== 0,
        error: {}
      }
    };
    case Types.Registration_Error: {
      return {
        ...state,
        error: action.payload.error
      }
    };
    default: return state
  }
}

export const logInReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.LogIn_User: {
      return {
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        error: {}
      }
    };
    case Types.LogIn_Error: {
      return {
        ...state,
        error: action.payload.error
      }
    };
    case Types.Logout_User: {
      return {
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        error: action.payload.error
      }
    }
    default: return state
  }
}