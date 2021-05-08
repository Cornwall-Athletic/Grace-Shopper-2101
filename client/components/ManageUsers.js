import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  destroyUser,
  loadUsers,
  updateUser,
  triggerPasswordReset,
} from '../store/users';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
    this.makeAdmin = this.makeAdmin.bind(this);
  }

  componentDidMount() {
    const { load } = this.props;
    this.exchangeToken();
    load();
  }

  async exchangeToken() {
    const token = window.localStorage.getItem('token');

    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      const user = response.data;

      this.setState({ auth: user });
    }
  }

  // async loadUsers() {
  //   const response = await axios.get('/api/users');
  //   const users = response.data;
  //    this.setState({ users });
  // }

  async makeAdmin(user) {
    const { update } = this.props;
    if (user.admin === false) {
      user.admin = true;
      await update(user);
    } else {
      user.admin = false;
      await update(user);
    }
  }

  render() {
    const { auth } = this.state;
    const { makeAdmin } = this;
    const {
      users,
      destroy,
      load,
      trigger,
      login: { admin },
    } = this.props;
    if (!admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div id="manage-users">
        <h2>Manage Users</h2>
        <div>
          {users.map((user, idx) => {
            return (
              <div key={idx}>
                <ul id="user">
                  <li key="first-name">First Name: {user.firstName}</li>
                  <li key="last-name">Last Name: {user.lastName}</li>
                  <li key="email">Email: {user.email}</li>
                  <li key="admin">Admin: {user.admin ? 'Yes' : 'No'}</li>
                  {/* <li key="passwordResetTriggered">
                    Password Reset Triggered:{' '}
                    {user.passwordResetTriggered.toString()}
                  </li> */}
                </ul>
                <button
                  type="button"
                  id="mainButtons"
                  onClick={() => destroy(user)}
                >
                  Delete
                </button>
                <button type="button" onClick={() => makeAdmin(user)}>
                  {user.admin ? 'Remove Admin Status' : 'Make Admin'}
                </button>

                {/* {user.passwordResetTriggered ? (
                  ''
                ) : (
                  <button type="button" onClick={() => trigger(user)}>
                    Trigger Password Reset
                  </button>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (user) => {
      return dispatch(destroyUser(user, history));
    },
    update: (user) => {
      return dispatch(updateUser(user, history));
    },
    load: () => {
      return dispatch(loadUsers());
    },
    trigger: (user) => {
      return dispatch(triggerPasswordReset(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
