import { combineReducers } from 'redux';
import productsInfoReducer from './ProductsInfoReducer';

const reducer = combineReducers({ productsInfo: productsInfoReducer });

export default reducer;
