
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import cartReducer from './reducers/cartSlice';
import productReducer from './reducers/productSlice';
import sizeReducer from './reducers/sizeSlice';
import userReducer from './reducers/userSlice';
import wishlistReducer from './reducers/wishlistSlice';
import paymentReducer from './reducers/paymentSlice';
import commentReducer from './reducers/commentSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'wishlist', 'card','payment']
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  productSize: sizeReducer,
  comment: commentReducer,
  user: userReducer,
  wishlist: wishlistReducer,
  payment: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
