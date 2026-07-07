import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './home/Products';
import Home from './pages/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProductCategoryDetail from './pages/ProductCategoryDetail';

export default function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Scroll to top on path change
  useEffect(() => {
    // If there is a hash (e.g., #about), handle scrolling after route changes
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Default to top scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, location.hash]);

  return (
    <div>
      <Navbar cartItems={cart} setCartItems={setCart} />
      <ScrollToTop />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Home />
              <Products cart={cart} setCart={setCart} />
            </>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout 
              cartItems={cart} 
              setCartItems={setCart} 
            />
          } 
        />
        <Route 
          path="/products/:category" 
          element={
            <ProductCategoryDetail 
              cart={cart} 
              setCart={setCart} 
            />
          } 
        />
      </Routes>
      
      <Footer />
    </div>
  );
}