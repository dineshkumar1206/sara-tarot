import React, { useState } from 'react';

export default function Navbar({ cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

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
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
        </div>

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
              gap: '2rem',
              margin: 0,
              padding: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}
          >
            {['Home', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: item === 'Home' ? '#dfba6b' : '#f3f0ea',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'}
                  onMouseLeave={(e) => {
                    if (item !== 'Home') e.currentTarget.style.color = '#f3f0ea';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
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
              <span>View Cart</span>
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
                {cartCount}
              </span>
            </button>

            {/* <button 
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
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dfba6b';
                e.currentTarget.style.color = '#0f0c1b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#dfba6b';
              }}
            >
              Card Reading
            </button> */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
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
              {cartCount}
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
            {['Home', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: item === 'Home' ? '#dfba6b' : '#f3f0ea',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block'
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
            
            <li style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
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
                <span>View Cart</span>
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
                  {cartCount}
                </span>
              </button>

              {/* <button 
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
                  cursor: 'pointer'
                }}
              >
                Card Reading
              </button> */}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}