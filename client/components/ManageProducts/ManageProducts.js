import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProducts } from '../../store/products/products';
import { loadCountries } from '../../store/countries';
import { loadCategories } from '../../store/categories';
import CreateProduct from './CreateProduct';
import { Button, Card } from '@material-ui/core';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  async componentDidMount() {
    this.exchangeToken();
    this.props.loadCountries();
    this.props.load();
    this.props.loadCategories();
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

  render() {
    const {
      login: { admin },
    } = this.props;
    const { products } = this.props.products;
    const { auth } = this.state;
    const {} = this;
    if (!admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div>
        <h2>Manage Products</h2>
        <CreateProduct />
        <div id="manage-products">
          {products.map((product, idx) => {
            const {
              title,
              brand,
              description,
              price,
              inventory,
              imageUrl,
              country,
            } = product;
            let { categories } = product || [];
            categories = categories
              ? categories.map((category) => category.name)
              : [];
            return (
              <div key={idx} className="product-manage">
                <img src={imageUrl} alt="snack" width="100" />
                <ul id="product-manage">
                  <li>Title: {title}</li>
                  <li>Brand: {brand}</li>
                  <li>Description: {description}</li>
                  <li>Price: {price}</li>
                  <li>Inventory: {inventory}</li>
                  {/* <li>Country:{country ? country.name : ''}</li> */}
                  {/* <li>Categories: {categories.join(', ')}</li> */}
                </ul>
                <Link to={`/manage-products/${product.id}`}>Edit</Link>
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
    load: () => dispatch(loadProducts()),
    loadCountries: () => dispatch(loadCountries()),
    loadCategories: () => dispatch(loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
