/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import axios from 'axios';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const PURCHASE_ITEMS = 'PURCHASE_ITEMS';
const UPDATE_USER = 'UPDATE_USER';
// Create Action Creators & Thunks

const _loginUser = (user_data) => {
  return {
    type: LOGIN_USER,
    user_data,
  };
};

const intialstate = {};
// Load Users Thunk
const loginUser = (email, password) => {
  return async (dispatch) => {
    const { token } = (await axios.post('/api/auth', { email, password })).data;
    window.localStorage.setItem('token', token);
    const response = await axios.get('/api/auth', {
      headers: {
        authorization: token,
      },
    });
    const user = response.data;
    dispatch(_loginUser(user));
  };
};

const _logoutUser = (user_data) => {
  return {
    type: LOGOUT_USER,
    user_data,
  };
};

// Load Users Thunk
const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch(_logoutUser());
  };
};

// Create Reducers
const loginReducer = (state = [], action) => {
  if (action.type === LOGIN_USER) {
    return { ...state, ...action.user_data };
  }
  if (action.type === UPDATE_USER) {
    console.log(action);
    return { ...state, ...action.user };
  }
  if (action.type === LOGOUT_USER) {
    return intialstate;
  }
  if (action.type === PURCHASE_ITEMS) {
    return { ...state, cart: action.id };
  }

  return state;
};

export { loginUser, logoutUser };

export default loginReducer;
