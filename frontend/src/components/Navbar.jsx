import React, { useState } from 'react';

export default function Navbar() {
  // Mobile menu open/close toggle state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      style={{
        backgroundColor: '#0f0c1b',
        borderBottom: '1px solid rgba(223, 186, 107, 0.15)',
        width: '100%',
        position: 'relative',
        zIndex: 100,
        boxSizing: 'border-box'
      }}
    >
      {/* Navbar Container Container */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.5rem 2rem', // Slightly reduced vertical padding to perfectly frame the larger logo
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        
        {/* Brand Logo Identity - Points to public/saraa-logo.jpeg */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img 
            src="/saraa-logo.jpeg" 
            alt="Saraa Tarot Logo" 
            style={{
              height: '85px', 
              width: 'auto',
              display: 'block',
              borderRadius: '4px' // Subtle rounding to fit the canvas image corners
            }} 
          />
        </div>

        {/* Desktop Navigation Links */}
        <div 
          className="desktop-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Nav Links */}
          <ul 
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '2.5rem',
              margin: 0,
              padding: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
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

          {/* Premium Right-Aligned Action CTA Button */}
          <button 
            style={{
              backgroundColor: 'transparent',
              color: '#dfba6b',
              border: '1px solid rgba(223, 186, 107, 0.4)',
              borderRadius: '2px',
              padding: '0.6rem 1.4rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginLeft: '1rem'
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
          </button>
        </div>

        {/* Small Helper Style block to handle the responsive hide-and-seek toggling */}
        <style>{`
          @media (max-width: 767px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
          @media (min-width: 768px) {
            .mobile-toggle { display: none !important; }
            .mobile-menu-dropdown { display: none !important; }
          }
        `}</style>

        {/* Mobile Hamburger Button Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#dfba6b',
            padding: '4px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Responsive Mobile Menu Dropdown drawer */}
      {isOpen && (
        <div 
          className="mobile-menu-dropdown"
          style={{
            backgroundColor: '#130f24',
            borderBottom: '1px solid rgba(223, 186, 107, 0.1)',
            padding: '1rem 2rem 2rem 2rem',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 99
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
            <li style={{ marginTop: '0.5rem' }}>
              <button 
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
              </button>
            </li>
          </ul>
        </div>
      )}

    </nav>
  );
}