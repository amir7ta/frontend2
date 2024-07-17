import React, { Suspense, lazy } from 'react';
import './styles/main.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomMenu from './components/layout/BottomMenu';

import { Routes, Route, useLocation } from 'react-router-dom';
import { CardProvider } from './components/common/CardContext';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPageGpt'));
const CartPage = lazy(() => import('./pages/Cart'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const Admin = lazy(() => import('./pages/AdminPanel'));
const Account = lazy(() => import('./pages/Account'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Categories = lazy(() => import('./pages/Categories'));

function App() {
  const location = useLocation();
  const showHeader = location.pathname !== '/checkout' ;
  const showFooter = location.pathname !== '/checkout' &&  location.pathname !== '/categories';

  return (
    <CardProvider>
      {showHeader && <Header />}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home location={location} />} />
          <Route path="/product/:id/:slug" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:categoryRoute" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Suspense>
      <BottomMenu/>
      {showFooter && <Footer />}
    </CardProvider>
  );
}

export default App;
