import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProducts } from '../../store/products/products';
import { loadCountries } from '../../store/countries';
import { loadCategories } from '../../store/categories';
import CreateProduct from './CreateProduct';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  componentDidMount() {
    this.exchangeToken();
    this.props.load();
    this.props.loadCountries();
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
    const { countries } = this.props;
    const { products } = this.props.products;
    const { auth } = this.state;
    const {} = this;
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }

    return (
      <div id="manage-products">
        <h2>Manage Products</h2>
        <CreateProduct />
        <div>
          {products.map((product, idx) => {
            const {
              title,
              brand,
              description,
              price,
              inventory,
              imageUrl,
              countryId,
            } = product;

            return (
              <div key={idx}>
                <img src={imageUrl} alt="snack" width="100" />
                <ul id="product-manage">
                  <li>Title: {title}</li>
                  <li>Brand: {brand}</li>
                  <li>Description: {description}</li>
                  <li>Price: {price}</li>
                  <li>Inventory: {inventory}</li>
                  <li>
                    Country:{' '}
                    {countries
                      .filter((country) => country.id === countryId)
                      .map((country) => country.name)}
                  </li>
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
