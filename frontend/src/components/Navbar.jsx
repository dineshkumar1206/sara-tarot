import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar({ cartItems = [], setCartItems, isCartOpen, setIsCartOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown toggle
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false); // Mobile sub-menu toggle

  // Select admin auth state from Redux
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = itemsTotalAmount;

  // Direct removal function for the drawer items
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Reusable Cart Icon SVG component
  const CartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

  return (
    <nav 
      style={{
        backgroundColor: '#0f0c1b',
        borderBottom: '1px solid rgba(223, 186, 107, 0.15)',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.5rem 2rem', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo Identity */}
        <Link 
          to="/"
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}
        >
          <img 
            src="/saraa-logo.jpeg" 
            alt="Saraa Tarot Logo" 
            style={{
              height: '85px', 
              width: 'auto',
              display: 'block',
              borderRadius: '4px' 
            }} 
          />
        </Link>

        {/* Desktop & Tablet Navigation Menu */}
        <div 
          className="desktop-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <ul 
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '2.25rem',
              margin: 0,
              padding: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}
          >
            <li>
              <Link 
                to="/" 
                style={{ color: '#f3f0ea', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#f3f0ea'}
              >
                Home
              </Link>
            </li>
            
            {/* Products Hover Dropdown */}
            <li 
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              style={{ position: 'relative', padding: '1.5rem 0', cursor: 'pointer' }}
            >
              <span 
                style={{ 
                  color: isDropdownOpen ? '#dfba6b' : '#f3f0ea', 
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Spiritual Services
                <svg width="8" height="5" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              
              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#130f24',
                    border: '1px solid rgba(223, 186, 107, 0.25)',
                    borderRadius: '4px',
                    width: '280px',
                    padding: '0.75rem 0',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                    zIndex: 1100,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                  }}
                >
                  {[
                    { label: 'Tarot Private Consultation', path: '/products/tarot-consultation' },
                    { label: 'Spiritual Healing', path: '/products/spiritual-healing' },
                    { label: 'Crystals', path: '/products/crystals' },
                    { label: 'Murugar Cards', path: '/products/murugar-cards' },
                    { label: 'Tarot Reading Classes', path: '/products/tarot-classes' },
                    { label: 'Spiritual Counseling', path: '/products/counseling-classes' },
                    { label: 'Kali Pooja', path: '/products/kali-pooja' }
                  ].map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      style={{
                        padding: '0.75rem 1.5rem',
                        color: '#f3f0ea',
                        textDecoration: 'none',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.1)';
                        e.currentTarget.style.color = '#dfba6b';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#f3f0ea';
                      }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link 
                to="/about" 
                style={{ color: '#f3f0ea', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#f3f0ea'}
              >
                About
              </Link>
            </li>

            <li>
              <Link 
                to="/contact" 
                style={{ color: '#f3f0ea', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#f3f0ea'}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Login/Logout Action */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ color: '#f3f0ea', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Hi, {user.name.split(' ')[0]}
                </span>
                <Link
                  to="/dashboard"
                  style={{
                    color: '#dfba6b',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f3f0ea'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#dfba6b'}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dfba6b',
                    border: '1px solid rgba(223, 186, 107, 0.4)',
                    borderRadius: '2px',
                    padding: '0.6rem 1.2rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: '#dfba6b',
                  color: '#0f0c1b',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '0.6rem 1.2rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f0ea'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dfba6b'}
              >
                Login
              </button>
            )}

            {/* Updated Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                backgroundColor: 'rgba(223, 186, 107, 0.1)',
                color: '#dfba6b',
                border: '1px solid rgba(223, 186, 107, 0.3)',
                borderRadius: '2px',
                padding: '0.6rem 1.2rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.1)'}
            >
              <CartIcon />
              <span>Cart</span>
              <span style={{
                backgroundColor: '#dfba6b',
                color: '#0f0c1b',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700'
              }}>
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 991px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle-box { display: flex !important; gap: 1rem; align-items: center; }
          }
          @media (min-width: 992px) {
            .mobile-toggle-box { display: none !important; }
            .mobile-menu-dropdown { display: none !important; }
          }
        `}</style>

        {/* Mobile & Tablet Action Corner */}
        <div className="mobile-toggle-box" style={{ display: 'none' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              backgroundColor: 'transparent',
              color: '#dfba6b',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '8px'
            }}
          >
            <CartIcon />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              backgroundColor: '#dfba6b',
              color: '#0f0c1b',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: '700'
            }}>
              {totalItems}
            </span>
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#dfba6b',
              padding: '4px'
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div 
          className="mobile-menu-dropdown"
          style={{
            backgroundColor: '#130f24',
            borderBottom: '1px solid rgba(223, 186, 107, 0.15)',
            padding: '1.5rem 2rem',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 999
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li>
              <Link 
                to="/"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#f3f0ea',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'block'
                }}
              >
                Home
              </Link>
            </li>

            {/* Mobile Products Accordion Trigger */}
            <li>
              <button 
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#f3f0ea',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>Spiritual Services</span>
                <svg 
                  width="10" 
                  height="6" 
                  viewBox="0 0 10 6" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: isMobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Mobile Products Sub-menu Links */}
              {isMobileProductsOpen && (
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                    padding: '0.8rem 0 0.2rem 1rem',
                    borderLeft: '1px solid rgba(223, 186, 107, 0.2)',
                    marginTop: '0.5rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {[
                    { label: 'Tarot Private Consultation', path: '/products/tarot-consultation' },
                    { label: 'Spiritual Healing', path: '/products/spiritual-healing' },
                    { label: 'Crystals', path: '/products/crystals' },
                    { label: 'Murugar Cards', path: '/products/murugar-cards' },
                    { label: 'Tarot Reading Classes', path: '/products/tarot-classes' },
                    { label: 'Spiritual Counseling', path: '/products/counseling-classes' },
                    { label: 'Kali Pooja', path: '/products/kali-pooja' }
                  ].map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileProductsOpen(false);
                      }}
                      style={{
                        color: 'rgba(243, 240, 234, 0.85)',
                        textDecoration: 'none',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'block'
                      }}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link 
                to="/about"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#f3f0ea',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'block'
                }}
              >
                About
              </Link>
            </li>

            <li>
              <Link 
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#f3f0ea',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'block'
                }}
              >
                Contact
              </Link>
            </li>
            
            {user ? (
              <>
                <li style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                  <span style={{ color: '#f3f0ea', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Hi, {user.name}
                  </span>
                </li>
                <li>
                  <Link 
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      color: '#dfba6b',
                      textDecoration: 'none',
                      padding: '0.8rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: '#dfba6b',
                      border: '1px solid rgba(223, 186, 107, 0.4)',
                      padding: '0.8rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => { setIsOpen(false); navigate('/login'); }}
                  style={{
                    width: '100%',
                    backgroundColor: '#dfba6b',
                    color: '#0f0c1b',
                    border: 'none',
                    padding: '0.8rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Login
                </button>
              </li>
            )}

            <li style={{ marginTop: '0.75rem' }}>
              <button 
                onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(223, 186, 107, 0.1)',
                  color: '#dfba6b',
                  border: '1px solid rgba(223, 186, 107, 0.3)',
                  padding: '0.8rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <CartIcon />
                <span>Cart</span>
                <span style={{
                  backgroundColor: '#dfba6b',
                  color: '#0f0c1b',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '700'
                }}>
                  {totalItems}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ==================== RIGHT SIDE CART SLIDE-OUT DRAWER ==================== */}
      {isCartOpen && (
        <>
          {/* Dark Blurred Backdrop Overlay */}
          <div 
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 2000
            }}
          />

          {/* Drawer Panel Container */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '420px',
              height: '100vh',
              backgroundColor: '#130f24',
              borderLeft: '1px solid rgba(223, 186, 107, 0.2)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
              zIndex: 2001,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Inter', sans-serif",
              color: '#f3f0ea',
              boxSizing: 'border-box'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}>My Cart</span>
                <span style={{ backgroundColor: 'rgba(223, 186, 107, 0.15)', color: '#dfba6b', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {cartItems.length > 0 && (
                  <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#a09ba2', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                    Clear All
                  </button>
                )}
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#dfba6b', cursor: 'pointer', fontSize: '20px' }}>
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Dynamic Body Scroll List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', color: '#a09ba2' }}>
                  <CartIcon />
                  <p style={{ marginTop: '1rem', fontSize: '14px' }}>Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img 
                        src={item.image || "/placeholder-item.jpg"} 
                        alt={item.name} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(223, 186, 107, 0.1)' }} 
                      />
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '500', color: '#f3f0ea' }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#dfba6b', fontWeight: '600' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Red Removal button instead of adjustment switches */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#ef5353', 
                        cursor: 'pointer', 
                        fontSize: '16px', 
                        padding: '4px', 
                        display: 'flex', 
                        alignItems: 'center' 
                      }}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Bill Structure */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', backgroundColor: '#0c0917', borderTop: '1px solid rgba(223, 186, 107, 0.15)' }}>
                <h5 style={{ margin: '0 0 1rem 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a09ba2' }}>Bill Details</h5>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '1rem' }}>
                  <span style={{ color: '#a09ba2' }}>Items Total</span>
                  <span>₹{itemsTotalAmount.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', borderTop: '1px dashed rgba(223, 186, 107, 0.2)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#dfba6b' }}>To Pay</span>
                  <span style={{ color: '#dfba6b' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                {/* Primary Proceed Action button */}
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#dfba6b',
                    color: '#0f0c1b',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '1rem',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <span>Proceed to Checkout</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')} ➔</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}