/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card } from '@material-ui/core';
import {
  loadProducts,
  loadFilteredProducts,
  filterByCategory,
  filterByPrice,
  filterByRating,
  sortByAlpha,
  sortByPrice,
  sortBySearch,
} from '../store/products/products';
import { addToCart } from '../store/cart';
import { loadCountries } from '../store/countries';
import { loadCategories } from '../store/categories';
import Filters from './Filters';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.byCategory = this.byCategory.bind(this);
    this.byPrice = this.byPrice.bind(this);
    this.byCountry = this.byCountry.bind(this);
    this.sortByInput = this.sortByInput.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const {
      loadAllProducts,
      loadAllCountries,
      loadAllCategories,
      loadFilteredProducts,
    } = this.props;
    const { name } = this.props.match.params;
    loadAllCategories();
    loadAllCountries();
    if (name) {
      loadFilteredProducts(name);
    } else {
      loadAllProducts();
    }
  }

  componentDidUpdate(prevProps) {
    const prev = prevProps.match.params.name;
    const curr = this.props.match.params.name;
    if (!curr && prev !== curr) {
      this.props.loadAllProducts();
    } else if (prev !== curr) {
      if (curr === 'all') {
        this.props.loadAllProducts();
      } else {
        this.props.loadFilteredProducts(curr);
      }
    }
  }

  handleClick(product) {
    let cart = null;
    if (this.props.login.cart) {
      cart = this.props.login.cart;
    }
    this.props.addItem(product, cart);
  }

  // byRating(ev) {}

  byCountry(ev) {
    const country = ev.target.value;
    if (country === 'all') {
      this.props.history.push('/products');
    } else {
      this.props.history.push(`/products/c/${country}`);
    }
  }

  byCategory(ev) {
    const category = ev.target.value;
    this.props.filterByCategory(category);
  }

  byPrice(ev) {
    const max = ev.target.value;
    this.props.filterByPrice(max);
  }

  sortByInput(ev) {
    const sortBy = ev.target.value;
    if (sortBy.includes('alpha')) {
      this.props.sortByAlpha(sortBy);
    } else {
      this.props.sortByPrice(sortBy);
    }
  }

  reset(ev) {
    const form = ev.target;
    ev.preventDefault();
    form.reset();
    this.props.filterByPrice(Infinity);
    this.props.filterByCategory('ALL');
    this.props.loadAllProducts();
    this.props.history.push('/products');
  }

  render() {
    const { products, categories, countries } = this.props;
    const name = this.props.match.params.name || 'default';
    if (products.length) {
      return (
        <div id="main">
          <Filters
            countries={countries}
            categories={categories}
            filterByCategory={this.byCategory}
            // filterByRating={this.byRating}
            filterByPrice={this.byPrice}
            filterByCountry={this.byCountry}
            sortByInput={this.sortByInput}
            filterByValue={this.props.filterByValue}
            reset={this.reset}
            name={name}
          />
          <h1 id="products-title">Products</h1>

          <div id="allProducts">
            {products.map((product) => {
              return (
                <div key={product.id} className="product">
                  <Link to={`/products/${product.id}`}>
                    <h2 id="product-link">{`${product.title}`}</h2>
                  </Link>

                  <span>
                    {product.country.name}
                    <i className={`em ${product.country.flag}`} />
                  </span>
                  <span id="item-category">
                    {product.categories
                      .map((category) => {
                        return category.name;
                      })
                      .join(', ')}
                  </span>

                  <span id="price">
                    $
                    {product.price}
                  </span>

                  <br />
                  <img
                    className="allProductImage"
                    src={product.imageUrl}
                    alt={product.description}
                  />
                  <br />
                  <Button
                    id="quick-add"
                    variant="contained"
                    onClick={() => {
                      this.handleClick(product);
                    }}
                  >
                    Add Product
                  </Button>
                </div>
              );
            })}
          </div>
          {/* <productCreate history={history} /> */}
        </div>
      );
    }
    return (
      <div>
        <Filters
          countries={countries}
          categories={categories}
          filterByCategory={this.byCategory}
            // filterByRating={this.byRating}
          filterByPrice={this.byPrice}
          filterByCountry={this.byCountry}
          sortByInput={this.sortByInput}
          reset={this.reset}
          name={name}
        />
        <p>No products match that description.</p>
        ;
      </div>
    );
  }
}

const filterHelper = (products, max, categoryName) => {
  let results = products.filter((product) => {
    return Number(product.price) < max;
  });

  if (categoryName !== 'ALL') {
    results = results.filter((product) => {
      return product.categories.some((category) => {
        return category.name === categoryName;
      });
    });
  }
  return results;
};
const mapStateToProps = (state) => {
  const {
    products: { max, category },
    login,
    countries,
    categories,
    cart,
    user,
  } = state;
  let products = state.products.filteredProducts;
  products = filterHelper(products, max, category);
  if (!products) {
    return "There's no products now...";
  }
  return {
    countries,
    products,
    login,
    cart,
    user,
    categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  // const { history } = ownProps;
  return {
    loadAllProducts: () => {
      dispatch(loadProducts());
    },
    loadFilteredProducts: (country) => {
      dispatch(loadFilteredProducts(country));
    },

    loadAllCountries: () => {
      dispatch(loadCountries());
    },
    loadAllCategories: () => {
      dispatch(loadCategories());
    },
    addItem: (productId, cart) => {
      dispatch(addToCart(productId, cart, 1));
    },

    filterByRating: (rating) => {
      return dispatch(filterByRating(rating));
    },

    filterByPrice: (max) => {
      dispatch(filterByPrice(max));
    },
    filterByCategory: (category) => {
      dispatch(filterByCategory(category));
    },

    sortByPrice: (direction) => {
      return dispatch(sortByPrice(direction));
    },
    sortByAlpha: (direction) => {
      return dispatch(sortByAlpha(direction));
    },
    filterByValue: (input) => {
      return dispatch(sortBySearch({ value: input }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
