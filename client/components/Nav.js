/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/loginstate';
import { resetCart } from '../store/cart';

import { AppBar, Button, ThemeProvider, Tab } from '@material-ui/core';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const home = window.location.hash === 'disabled';

    return home ? (
      <div></div>
    ) : this.props.login.admin ? (
      <div className="navBar">
        <Link to="/">The Global Snacker</Link>
        <Link to="/products"> Products</Link>
        <Link to="/manage-products">Manage Products</Link>
        <Link to="/manage-orders">Manage Orders</Link>
        <Link to="/manage-users">Manage Users</Link>
        <Link to="/manage-countries"> Manage Countries</Link>
        <Link to="/cart">
          Cart(
          {this.props.cart.length})
        </Link>

        {this.props.login.email ? (
          <Link to="/view-account">
            <span id="logged">
              {`
             logged in as:
             ${this.props.login.email}`}
            </span>
          </Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        {this.props.login.email ? (
          <Button
            id="quick-add"
            onClick={() => {
              this.props.logOut();
              this.props.clearCart();
            }}
          >
            logout
          </Button>
        ) : (
          ''
        )}
      </div>
    ) : (
      <div className="navBar">
        <Link to="/">The Global Snacker</Link>
        <Link to="/products"> Products</Link>

        <Link to="/cart">
          Cart(
          {this.props.cart.length})
        </Link>
        {this.props.login.email ? (
          <Link to="/view-account">
            <span id="logged">
              {`
          logged in as:
          ${this.props.login.email}`}
            </span>
          </Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        {this.props.login.email ? (
          <Button
            id="quick-add"
            onClick={() => {
              this.props.logOut();
              this.props.clearCart();
            }}
          >
            logout
          </Button>
        ) : (
          ''
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { login, cart } = state;
  return { login, cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logoutUser());
    },
    clearCart: () => {
      dispatch(resetCart());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
