import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './home/Products';
import Home from './pages/Home';
import Checkout from './components/Checkout';

export default function App() {
  // Global Shared States passed into child configurations
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState({ page: 'list', serviceId: null });

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
          <Home/>
          <Products 
            cart={cart} 
            setCart={setCart} 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
          />
        </>
      )}
    </div>
  );
}