import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Run ONCE on initial page mount/refresh to ensure it starts at the top cleanly
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Standard native smooth scroll without locking loops
    });
  }, []);

  // 2. Toggle manual button visibility based on user scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Safe non-blocking scroll handler for manual click
  const handleManualScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleManualScrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 999,
            backgroundColor: '#130f24',
            color: '#dfba6b',
            border: '1px solid rgba(223, 186, 107, 0.4)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.15)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#130f24';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          title="Scroll to Top"
        >
          {/* Elegant arrow up icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
}