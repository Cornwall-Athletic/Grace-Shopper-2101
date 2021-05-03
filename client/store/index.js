import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { usersReducer } from './usersStore';

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'users: usersReducer'
const reducer = combineReducers({ users: usersReducer });

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export { reducer };
