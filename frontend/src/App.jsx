import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './home/Products';
import Home from './pages/Home';

export default function App() {
  // Global Shared States passed into child configurations
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState({ page: 'list', serviceId: null });

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <Home/>
      <Products 
        cart={cart} 
        setCart={setCart} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
    </div>
  );
}