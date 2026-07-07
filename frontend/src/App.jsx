import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Products from './home/Products';
import Home from './pages/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // Updated import name

export default function App() {
  // Global Shared States passed into child configurations
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState({ page: 'list', serviceId: null });
  const isFirstRender = useRef(true);

  // Safe, non-blocking page transition scroll handling
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Uses native smooth scrolling that releases immediately, allowing users to scroll down!
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentView.page]);

  return (
    <div>
      <Navbar cartItems={cart} setCartItems={setCart} setCurrentView={setCurrentView} />
      
      {currentView.page === 'checkout' ? (
        <Checkout 
          cartItems={cart} 
          setCartItems={setCart} 
          setCurrentView={setCurrentView} 
        />
      ) : (
        <>
          <ScrollToTop/>
          <Home/>
          <Products 
            cart={cart} 
            setCart={setCart} 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
          />
        </>
      )}
      
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}