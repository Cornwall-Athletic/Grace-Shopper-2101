/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  loadCart, updateCart, removeItem, purchaseItems,
} from '../store/cart';

const stripePromise = loadStripe('pk_test_51InvgGCzEJe0jWa9qmsLFyAIhV0dMwJeA59eCJtu4leBd9h8TcouHwM2OG1c691aHwIWcSebkNRCKTboOy2frM0p001MLpy1xK');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.login.cart) {
      this.props.getCart(this.props.login.cart);
    }

    const query = new URLSearchParams(this.props.location.search);
    if (query.get('success')) {
      const items = this.props.cart.map((e) => { return { amount: e.amount, item: e }; });

      const orderId = this.props.login.cart || null;
      const userId = this.props.login.id || null;
      const date = new Date().toISOString().split('T')[0];

      this.props.purchase(date, items, orderId, userId);
    }
    if (query.get('canceled')) {
      window.alert(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }

  handleRemove(id) {
    let orderId = null;
    if (this.props.login.cart) {
      orderId = this.props.login.cart;
    }
    this.props.removeItem(orderId, id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name } = evt.target.querySelector('input');
    let orderId = null;
    if (this.props.login.cart) {
      orderId = this.props.login.cart;
    }
    this.props.updateItem(orderId, name, this.state[name]);
    window.location.reload();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleClick(event) {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios.post('api/order/create-checkout-session', this.props.cart);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
  }

  render() {
    const { cart } = this.props;
    return (
      <div id="cart_container">
        <h1>Cart</h1>
        <div id="Cart">
          {cart.map((product) => {
            return (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <h3>{`${product.title}`}</h3>
                </Link>
                <h4>
                  {product.country.name}
                  <i className={`em ${product.country.flag}`} />
                </h4>

                <img
                  className="allProductImage"
                  src={product.imageUrl}
                  alt={product.description}
                />
                <h4>{product.amount}</h4>
                <form onSubmit={this.handleSubmit}>
                  <input name={`${product.id}`} type="number" min="1" defaultValue={null} onChange={this.handleChange} />
                  <button type="submit">
                    Update Amount
                  </button>
                </form>
                <button onClick={() => { return this.handleRemove(product.id); }}>
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={this.handleClick}>Checkout</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login, cart } = state;
  return {
    login, cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => {
      dispatch(loadCart(id));
    },
    updateItem: (cart, product, amount) => {
      dispatch(updateCart(cart, product, amount));
    },
    removeItem: (cart, productId) => {
      dispatch(removeItem(cart, productId));
    },
    purchase: (date, items, orderId, userId) => {
      dispatch(purchaseItems(date, items, orderId, userId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
