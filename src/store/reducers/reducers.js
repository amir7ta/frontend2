import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import sizeReducer from './sizeSlice';
import userReducer from "./userSlice"
import wishlistReducer from "./wishlistSlice"
import searchReducer from "./wishlistSlice"
import paymentReducer from "./paymentSlice"

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'wishlist', 'card','payment']
}


const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  productSize: sizeReducer,
  user: userReducer,
  wishlist: wishlistReducer,
  payment:paymentReducer
});

export default persistReducer(persistConfig, rootReducer)
;