import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';
import { persistStore, persistReducer } from 'redux-persist'



// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production'
// });


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),

})

export const persistor = persistStore(store);

export default {store, persistor}
