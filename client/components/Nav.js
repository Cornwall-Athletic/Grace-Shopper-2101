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
    const home = window.location.hash === 'disabledfornow';
    return home ? (
      <div> </div>
    ) : this.props.login.admin ? (
      <div className="navBar">
        <Link to="/">The Global Snacker</Link>
        <Link to="/products"> Products</Link>
        {this.props.login.email ? (
          <div>
            <h5 id="logged">
              logged in as:
              {this.props.login.email}
            </h5>
            <button
              onClick={() => {
                this.props.logOut();
                this.props.clearCart();
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        <Link to="/manage-countries">Manage Country</Link>
        <Link to="/manage-products">Manage Products</Link>
        <Link to="/manage-orders">Manage Orders</Link>
        <Link to="/manage-users">Manage Users</Link>
        <Link to="/cart">
          Cart(
          {this.props.cart.length})
        </Link>
      </div>
    ) : (
      <div className="navBar">
        <Link to="/">The Global Snacker</Link>
        <Link to="/products"> Products</Link>

        {this.props.login.email ? (
          <div>
            <h5 id="logged">
              logged in as:
              {this.props.login.email}
            </h5>
            <button
              type="submit"
              onClick={() => {
                this.props.logOut();
                this.props.clearCart();
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        <Link to="/cart">
          Cart(
          {this.props.cart.length})
        </Link>
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
