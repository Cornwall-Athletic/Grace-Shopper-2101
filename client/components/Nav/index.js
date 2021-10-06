/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, AppBar, Toolbar, Grid, Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { logoutUser } from '../../store/loginstate';
import { resetCart } from '../../store/cart';
import NavButton from './NavButton';

const Nav = () => {
  const home = window.location.hash === 'disabled';
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);

  const theme = useTheme();

  const useStyles = makeStyles({
    logo: {
      fontFamily: 'Courier Prime',
      fontSize: '30',
      width: 420,
    },
    button: {
      color: theme.palette.text.primary,
      fontSize: 'medium',
      fontWeight: 200,
      fontFamily: theme.typography.fontFamily,
    },
  });

  const classes = useStyles();

  return home ? (
    <div></div>
  ) : login.admin ? (
    <AppBar position="static">
      <Toolbar>
        <NavButton
          className={classes.logo}
          component={Link}
          to="/"
          disableFocusRipple={true}
          disableRipple={true}
        >
          The Global Snacker
        </NavButton>
        <Grid container justifyContent="flex-end">
          <NavButton
            className={classes.button}
            component={Link}
            to="/products"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Products
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-products"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Products
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-orders"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Orders
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-users"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Users
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-countries"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Countries
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/cart"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Cart({cart.length})
          </NavButton>

          {login.email ? (
            <NavButton
              className={classes.button}
              component={Link}
              to="/view-account"
              disableFocusRipple={true}
              disableRipple={true}
            >
              View Account
            </NavButton>
          ) : (
            <NavButton
              className={classes.button}
              component={Link}
              to="/login"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Log In
            </NavButton>
          )}
          {login.email ? (
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(logoutUser());
                dispatch(resetCart());
              }}
            >
              Logout
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="static">
      <Toolbar>
        <NavButton
          className={classes.logo}
          component={Link}
          to="/"
          disableFocusRipple={true}
          disableRipple={true}
        >
          The Global Snacker
        </NavButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <NavButton
              className={classes.button}
              component={Link}
              to="/products"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Products
            </NavButton>
          </Grid>
          <Grid item>
            <NavButton
              className={classes.button}
              component={Link}
              to="/cart"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Cart({cart.length})
            </NavButton>
          </Grid>
          {login.email ? (
            <Link to="/view-account">
              <span id="logged">
                {`
          logged in as:
          ${login.email}`}
              </span>
            </Link>
          ) : (
            <Grid item>
              <NavButton
                className={classes.button}
                component={Link}
                to="/login"
                disableFocusRipple={true}
                disableRipple={true}
              >
                Log In
              </NavButton>
            </Grid>
          )}
        </Grid>
        {login.email ? (
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(logoutUser());
              dispatch(resetCart());
            }}
          >
            logout
          </Button>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
