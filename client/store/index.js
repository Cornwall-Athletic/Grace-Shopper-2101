// Create Store Here
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cart';
import { usersReducer } from './users';
import productReducer from './products/products';
import singleProductReducer from './products/singleProduct';
import countriesReducer from './countries';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const initialState = {
  products: [],
  users: [],
  singleProduct: {},
  loading: true,
};

// Loading check
const LOADED = 'LOADED';

const loaded = (state = true, action) => {
  if (action.type === LOADED) {
    state = { ...state, loading: false };
    return state;
  }
};

// enter different reducers into combineReducers({}) as a key-value pair.
// e.g. 'products: productsReducer'
export const reducer = combineReducers({
  cart: cartReducer,
  users: usersReducer,
  products: productReducer,
  currProduct: singleProductReducer,
  countries: countriesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// Create Store

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export default { store, persistor };
