import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { HelmetProvider } from 'react-helmet-async';
import  Svg from "./pages/svg"

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Vazirmatn',
    ].join(','),
  },
});

global.Buffer = global.Buffer || require('buffer').Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
            <Svg />

                <App />
            </ThemeProvider>
          </CacheProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </HelmetProvider>

);

reportWebVitals();
