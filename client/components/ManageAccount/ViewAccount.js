import React from 'react';
import { connect } from 'react-redux';
import { loadPurchases } from '../../store/purchases';
import LogInPage from '../LogInPage';
import SinglePurchase from './SinglePurchase';
import { updateUser } from '../../store/users';
import { TextField, Button, ThemeProvider } from '@material-ui/core';

class ViewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      updated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id, firstName, lastName, email } = this.props.login;
    if (id) {
      this.props.loadPurchases(id);
      this.setState({ id, firstName, lastName, email });
    }
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    const form = ev.target;
    ev.preventDefault();
    const { id, email, firstName, lastName, password } = this.state;
    if (!password.trim().length) {
      this.props.updateUser({ id, email, firstName, lastName });
    } else {
      this.props.updateUser({ id, email, firstName, lastName, password });
    }

    this.setState({ password: '', updated: true });
    form.reset();
  }

  render() {
    const { login } = this.props;
    if (!login.id) {
      return <LogInPage />;
    }

    const purchases = this.props.purchases.purchases || [];
    return (
      <div id="manage-account">
        <h2>Account Info</h2>
        <form onSubmit={this.handleSubmit} className="account">
          <TextField
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            variant="outlined"
            label="First Name"
          />
          <br />
          <TextField
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            variant="outlined"
            label="Last Name"
          />
          <br />

          <TextField
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            variant="outlined"
            label="Email"
          />
          <br />

          <TextField
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            variant="outlined"
            label="New Password"
          />

          <Button type="submit" variant="contained" id="quick-add">
            Create Account
          </Button>
        </form>

        <h2>Past Orders</h2>

        {purchases.length ? (
          <div id="accountOrders">
            {purchases.map((purchase) => {
              return <SinglePurchase key={purchase.id} purchase={purchase} />;
            })}
          </div>
        ) : (
          <div>No Past Orders</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadPurchases: (id) => dispatch(loadPurchases(id)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);
