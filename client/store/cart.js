/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const PURCHASE_ITEMS = 'PURCHASE_ITEMS';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CART: {
      return [...action.cart];
    }
    case ADD_TO_CART: {
      console.log(action)
      const key = state.find((e) => { return e.id === action.product.id; });
      if (key) {
        // eslint-disable-next-line operator-assignment
        key.amount = key.amount + action.amount;
        return [...state];
      }
      return [...state, { ...action.product, amount: action.amount }];
    }
    case UPDATE_AMOUNT: {
      const key = state.find((e) => { return e.id === action.update.productId; });
      key.amount = action.update.amount;
      return [...state];
    }
    case REMOVE_FROM_CART: {
      return state.filter((product) => { return product.id !== action.productId; });
    }
    case CLEAR_CART: {
      return action.cart;
    }
    case PURCHASE_ITEMS: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const _loadCart = (cart) => {
  return { type: LOAD_CART, cart };
};

const loadCart = (id) => {
  return async (dispatch) => {
    try {
      if (id) {
        const { data } = await axios.get(`/api/order/cart/${id}`);
        dispatch(_loadCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const _addToCart = (product, amount) => {
  return { type: ADD_TO_CART, product, amount };
};

const addToCart = (product, cart = null, amount) => {
  return async (dispatch) => {
    try {
      if (cart) {
        await axios.put('/api/order/addToCart', { orderId: cart, products: [[product.id, amount]] });
      }
      dispatch(_addToCart(product, amount));
    } catch (err) {
      console.log(err);
    }
  };
};

const _updateCart = (update) => {
  return { type: UPDATE_AMOUNT, update };
};

const updateCart = (orderId, productId, amount) => {
  return async (dispatch) => {
    try {
      if (orderId) {
        await axios.put('/api/order/updateCart', { orderId, productId, amount });
      }
      dispatch(_updateCart({ productId, amount }));
    } catch (err) {
      console.log(err);
    }
  };
};

const _removeItem = (productId) => {
  return { type: REMOVE_FROM_CART, productId };
};

const removeItem = (orderId, productId) => {
  return async (dispatch) => {
    try {
      if (orderId) {
        await axios.put('/api/order/updateCart', { orderId, productId, amount: 0 });
      }

      dispatch(_removeItem(productId));
    } catch (err) {
      console.log(err);
    }
  };
};
const _resetCart = (cart = []) => {
  return { type: CLEAR_CART, cart };
};

const resetCart = () => {
  return (dispatch) => {
    dispatch(_resetCart());
  };
};

const _purchaseItems = (id = null) => {
  return { type: PURCHASE_ITEMS, id };
};

const purchaseItems = (date, items, orderId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post('api/order/purchase', {
      date, items, orderId, userId,
    });
    dispatch(_purchaseItems(data));
  };
};

export {
  loadCart, addToCart, updateCart, removeItem, resetCart, purchaseItems,
};
export default cartReducer;
