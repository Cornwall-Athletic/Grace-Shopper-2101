import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DESTROY_USER = 'DESTROY_USER';
const TRIGGER_PASSWORD_RESET = 'TRIGGER_PASSWORD_RESET';
const RESET_PASSWORD = 'RESET_PASSWORD';

//Create Action Creators & Thunks

const loadUsersActionCreator = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

// Load Users Thunk
const loadUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('api/users');
    const users = response.data;
    dispatch(loadUsersActionCreator(users));
  };
};

const createUserActionCreator = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

//Create User Thunk
const createUser = (email, password, firstName, lastName, history) => {
  return async (dispatch) => {
    const response = await axios.post('/api/users', {
      email,
      password,
      firstName,
      lastName,
    });
    const user = response.data;
    dispatch(createUserActionCreator(user));
  };
};

//Update User Action Creator and Thunk
const updateUserActionCreator = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const updateUser = (user, history) => {
  let { id, firstName, lastName, email, admin, password } = user;
  return async (dispatch) => {
    const userToUpdate = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        email,
        admin,
        password,
      })
    ).data;
    const updated = {
      id: userToUpdate.id,
      email: userToUpdate.email,
      cart: userToUpdate.car,
      firstName: userToUpdate.firstName,
      lastName: userToUpdate.lastName,
      admin: userToUpdate.admin,
    };

    dispatch(updateUserActionCreator(updated));
  };
};

//Destroy User Action Creator and Thunk
const destroyUserActionCreator = (user) => {
  return {
    type: DESTROY_USER,
    user,
  };
};

const destroyUser = (user) => {
  return async (dispatch) => {
    await axios.delete(`api/users/${user.id}`);
    dispatch(destroyUserActionCreator(user));
  };
};
//Trigger Password Reset
const triggerPasswordResetActionCreator = (user) => {
  return {
    type: TRIGGER_PASSWORD_RESET,
    user,
  };
};

const triggerPasswordReset = (user) => {
  return async (dispatch) => {
    const userToReturn = (
      await axios.put(`api/users/${user.id}`, { passwordResetTriggered: true })
    ).data;
    dispatch(triggerPasswordResetActionCreator(userToReturn));
  };
};

//Reset Password
const ResetPasswordActionCreator = (user) => {
  return {
    type: RESET_PASSWORD,
    user,
  };
};

const resetPassword = (auth, password) => {
  return async (dispatch) => {
    const userToReturn = (
      await axios.put(`api/users/${auth.id}`, {
        password,
        passwordResetTriggered: false,
      })
    ).data;
    dispatch(resetPasswordActionCreator(userToReturn));
  };
};

//Reducer
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  if (action.type === DESTROY_USER) {
    state = state.filter((user) => {
      return user.id !== action.user.id;
    });
  }
  if (action.type === UPDATE_USER) {
    const users = state.map((user) => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    });
    state = users;
  }
  if (action.type === TRIGGER_PASSWORD_RESET) {
    const users = state.map((user) => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    });

    state = users;
  }
  if (action.type === RESET_PASSWORD) {
    const users = state.map((user) => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    });
    state = users;
  }
  return state;
};

export {
  LOAD_USERS,
  loadUsersActionCreator,
  loadUsers,
  CREATE_USER,
  createUserActionCreator,
  createUser,
  destroyUserActionCreator,
  destroyUser,
  updateUserActionCreator,
  updateUser,
  usersReducer,
  triggerPasswordReset,
  resetPassword,
};
