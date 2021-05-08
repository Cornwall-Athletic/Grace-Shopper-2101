/* eslint-disable*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleProduct } from '../../store/products/singleProduct';
import Reviews from './Reviews';
import NewReview from './NewReviewForm';
import axios from 'axios';
import { addToCart } from '../../store/cart';
import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToCart: false,
    };

    this.updateReviews = this.updateReviews.bind(this);
    this.checkIfReviewed = this.checkIfReviewed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.getProduct(id);
    }
  }

  updateReviews() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const amount = parseInt(evt.target.amount.value);
    const product = this.props.product;
    let cart = null;
    if (this.props.login.cart) {
      cart = this.props.login.cart;
    }

    //ADD AMOUNT
    this.props.addItem(product, cart, amount);
    this.setState({ addedToCart: true });
  }

  checkIfReviewed(userId, reviews) {
    return reviews.some((review) => review.userId === userId);
  }

  render() {
    const { product, login } = this.props;
    const countryName = product.country ? product.country.name : ' ';
    const flag = product.country ? product.country.flag : ' ';
    const reviews = product.reviews || [];

    // const history = this.props.history;
    return product ? (
      <div id="single-contain">
        <div id="singleProduct" key={product.id}>
          <h1>{product.title}</h1>
          <hr />
          <p>
            Brand:
            {product.brand}
          </p>
          <p>
            Country:
            {countryName}
          </p>

          <i className={`em ${flag}`} />
          <hr />
          <p>
            Description:
            {[product.description]}
          </p>

          {this.state.addedToCart ? (
            <Link to="/cart">
              <button>Continue To Checkout</button>
            </Link>
          ) : (
            <div></div>
          )}
          <h1>Reviews</h1>

          {login.id ? (
            this.checkIfReviewed(login.id, reviews) ? (
              <div>Thanks! You've reviewed this already! </div>
            ) : (
              <NewReview
                productId={product.id}
                userId={login.id}
                updateReviews={this.updateReviews}
                checkIfReviewed={this.checkIfReviewed}
                reviews={reviews}
              />
            )
          ) : (
            <div>Please log in to leave a review</div>
          )}
          <Reviews reviews={reviews} />
        </div>
        <div id="singleProduct">
          {' '}
          <img
            id="single-product-img"
            src={product.imageUrl}
            alt={product.description}
          />
        </div>
        <div id="singleProduct">
          <h2>${product.price}</h2>
          <hr></hr>
          <form onSubmit={this.handleSubmit}>
            <FormControl variant="outlined">
              <InputLabel id="add-to-cart">Qty</InputLabel>
              <Select name="amount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>
            <br />
            <Button variant="contained" id="add-to-cart-btn" type="submit">
              Add to Cart
            </Button>
          </form>
        </div>
      </div>
    ) : (
      <div>
        (<h1>Product not found</h1>
        );
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    product: state.currProduct,
    reviews: state.currProduct.reviews,
    user: state.user,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
    addItem: (product, cart, amount) => {
      dispatch(addToCart(product, cart, amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
