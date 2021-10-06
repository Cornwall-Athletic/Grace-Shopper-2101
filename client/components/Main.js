/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './AllProducts';
import Cart from './Cart';
import SingleProduct from './SingleProduct/SingleProduct';
import LogInPage from './LogInPage';
import ManageProducts from './ManageProducts/ManageProducts';
import EditProduct from './ManageProducts/EditProduct';
import ManageUsers from './ManageUsers';
import ManageOrders from './ManageOrders/ManageOrders';
import EditOrder from './ManageOrders/EditOrder';
import Nav from './Nav';
import Home from './Home';
import CreateAccountPage from './CreateAccountPage';
import Map from './Map';
import CreateCountry from './ManageCountries/CreateCountry';
import ViewAccount from './ManageAccount/ViewAccount';

import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `${window.localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
class Main extends React.Component {
  render() {
    return (
      <Router>
        <div id="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/manage-countries" component={CreateCountry} />
            <Route exact path="/products/c/:name" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/manage-products" component={ManageProducts} />
            <Route exact path="/manage-products/:id" component={EditProduct} />
            <Route exact path="/manage-users" component={ManageUsers} />
            <Route exact path="/manage-orders" component={ManageOrders} />
            <Route exact path="/manage-orders/:id" component={EditOrder} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/createaccount" component={CreateAccountPage} />
            <Route exact path="/view-account" component={ViewAccount} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Main);
