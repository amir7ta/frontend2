import './styles/main.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// import pages
import Home from "./pages/Home";
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPageGpt';
import CartPage from "./pages/Cart"
import CheckoutPage from './pages/Checkout';
import Admin from "./pages/AdminPanel"
import Account from './pages/Account';
import Authentication from './pages/Authentication';
import Wishlist from './pages/Wishlist';
import { Routes, Route, useLocation } from 'react-router-dom';
import { createRef } from 'react';

function App() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/checkout';
  const cardRef = createRef();

  return (
<>
   
      {showHeaderFooter && <Header cardRef = {cardRef}/>}
      <Routes>
        <Route path="/" element={<Home location={location} />} />
        <Route path="/product/:id/:slug" element={<ProductPage cardReference = {cardRef}/>} /> 
        <Route path="/product/:id" element={<ProductPage cardReference = {cardRef}/>} /> 
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      {showHeaderFooter && <Footer />}
  </>  
  );
}

export default App;