import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  // Reusable payment SVGs
  const VisaIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
      <rect width="32" height="20" rx="3" fill="#1A1F71"/>
      <path d="M12.2 13.6h1.6l1-6.1h-1.6l-1 6.1zm6.9-6.1c-.4-.2-.9-.3-1.4-.3-1.5 0-2.6.8-2.6 2 0 .9.8 1.4 1.4 1.7.6.3.8.5.8.7 0 .4-.5.6-1 .6-.6 0-1.2-.1-1.7-.4l-.2 1.2c.4.2 1.1.3 1.8.3 1.6 0 2.7-.8 2.7-2 0-1-.6-1.5-1.9-1.9-.7-.3-1.1-.4-1.1-.7 0-.3.3-.5.9-.5.5 0 1 .1 1.4.3l.2-1.4zm4.1 2.3c0-.1-.1-.2-.2-.3l-2.4-3.5h-1.3c-.3 0-.5.2-.6.4L17 12.8h1.6l.3-1h2l.2 1h1.4l-1.3-4.9zm-2.4 1.2l.6-2.1c0 0 .1-.2.1-.3l.3 2.4h-1zm-13-3.5h-1.5L4 12.6c-.1.2-.2.3-.3.4l-.8.4v.2h2.5c.3 0 .6-.2.7-.5l1.6-4.9zm5.5 4.9L16.2 7.5h-1.6L12 11.2l-.7-3.7c0-.2-.2-.4-.5-.4H7.8v.3c.4.1.9.3 1.2.5.2.2.3.4.2.7l-1.6 5.3h1.7z" fill="white"/>
    </svg>
  );

  const MasterCardIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
      <rect width="32" height="20" rx="3" fill="#1E1E1E"/>
      <circle cx="12.5" cy="10" r="6" fill="#EB001B"/>
      <circle cx="19.5" cy="10" r="6" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
  );

  const PayPalIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
      <rect width="32" height="20" rx="3" fill="#003087"/>
      <path d="M12.2 13.9l.9-5.7H15c1.4 0 2.2.6 2 2-.2 1.3-1.1 2-2.3 2h-1.6l-.9 1.7zm1.6-2.5h1.2c.7 0 1.2-.3 1.3-1 .1-.7-.3-1-.9-1h-1.2l-.4 2zm2-2.5l.8-5.2h2.8c1.4 0 2.2.6 2 2-.2 1.3-1.1 2-2.3 2h-1.6l-.9 1.2zm1.6-2.5h1.2c.7 0 1.2-.3 1.3-1 .1-.7-.3-1-.9-1h-1.2l-.4 2z" fill="#0079C1"/>
    </svg>
  );

  const AmexIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
      <rect width="32" height="20" rx="3" fill="#01A6CA"/>
      <path d="M6 14V6h1.2l2.3 4 2.3-4H13v8h-1.1v-5.6l-2.1 3.7h-.5l-2.1-3.7V14H6zm10.7-3.8h1.6L20 14h1.2l-2.1-4.7 1.8-3.3h-1.2l-1.3 2.5-1.3-2.5H16l1.8 3.3L15.6 14h1.2l1.6-3.8zm-5.8 3.8v-8h3.3c.7 0 1.2.2 1.5.5.3.3.5.7.5 1.2 0 .6-.3 1.1-.9 1.3.6.2.9.7.9 1.4v.6c0 .4.1.7.2.9V14h-1.2c-.1-.2-.2-.5-.2-.9v-.8c0-.7-.3-1.1-1-1.1h-1.8V14H10.9zm1.3-4.7H14c.7 0 1.1-.3 1.1-.8s-.4-.8-1.1-.8h-1.8v1.6z" fill="white"/>
    </svg>
  );

  return (
    <footer 
      id="contact"
      style={{
        backgroundColor: '#0c0917',
        borderTop: '1px solid rgba(223, 186, 107, 0.15)',
        color: '#f3f0ea',
        padding: '5rem 2rem 2.5rem 2rem',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundImage: 'radial-gradient(circle at center, rgba(223, 186, 107, 0.03) 0%, transparent 70%)'
      }}
    >
      {/* Background Zodiac Wheel Watermark Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          opacity: 0.015,
          pointerEvents: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27none%27 stroke=%27white%27 stroke-width=%270.5%27/%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2738%27 fill=%27none%27 stroke=%27white%27 stroke-width=%270.5%27/%3E%3Cpath d=%27M50 5 L50 95 M5 50 L95 50 M18.18 18.18 L81.82 81.82 M18.18 81.82 L81.82 18.18%27 stroke=%27white%27 stroke-width=%270.25%27/%3E%3C/svg%3E")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* TOP ROW: 3 Columns Grid */}
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.6fr 1.2fr', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Column 1: Updated Address */}
          <div>
            <h4 style={{ color: '#dfba6b', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '8px' }}>
              Address
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: 'rgba(243, 240, 234, 0.75)', lineHeight: '2' }}>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Address:</span> No. 45, Burkit Road, T. Nagar</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>City:</span> Chennai ( Tamil Nadu )</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Country:</span> India</li>
            </ul>
            
            {/* Payment Icons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
              <VisaIcon />
              <MasterCardIcon />
              <PayPalIcon />
              <AmexIcon />
            </div>
          </div>

          {/* Column 2: Logo and Bio */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div 
              style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: '2.5rem', 
                color: '#dfba6b', 
                letterSpacing: '3px', 
                textTransform: 'uppercase',
                fontWeight: '300',
                marginBottom: '1rem'
              }}
            >
              Saraa Tarot
            </div>
            
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(243, 240, 234, 0.7)', maxWidth: '440px', margin: '0 auto 2rem auto' }}>
              Unlock the secrets of the cosmos and transform your life today! Connect with me for personalized consultations that reveal your unique strengths and help you navigate challenges with confidence.
            </p>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <a href="#facebook" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#twitter" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#youtube" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.556a3.002 3.002 0 00-2.11 2.107C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 002.11 2.107C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.556a3.002 3.002 0 002.11-2.107C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Updated Chennai Contact Info */}
          <div>
            <h4 style={{ color: '#dfba6b', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '8px' }}>
              Info
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: 'rgba(243, 240, 234, 0.75)', lineHeight: '2' }}>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Support:</span> support@saraatarot.in</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Email:</span> contact@saraatarot.in</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Phone:</span> +91 98400 12345</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Services & Action Button */}
        <div 
          className="footer-bottom-row"
          style={{
            borderTop: '1px solid rgba(223, 186, 107, 0.15)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div 
            style={{
              display: 'flex',
              gap: '1rem',
              fontSize: '13px',
              color: 'rgba(243, 240, 234, 0.6)',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic'
            }}
          >
            <span>Card Reading</span>
            <span>•</span>
            <span>Chakra Balancing</span>
            <span>•</span>
            <span>Mineralotherapy</span>
          </div>
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const productsSection = document.getElementById('products-section');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            style={{
              backgroundColor: 'transparent',
              color: '#dfba6b',
              border: '1px solid rgba(223, 186, 107, 0.5)',
              borderRadius: '2px',
              padding: '0.8rem 1.8rem',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.1)';
              e.currentTarget.style.borderColor = '#dfba6b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.5)';
            }}
          >
            Purchase Now
          </button>
        </div>

        {/* Copyright notice */}
        <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '11px', color: 'rgba(243, 240, 234, 0.35)', letterSpacing: '0.5px' }}>
          © {new Date().getFullYear()} Saraa Tarot. All rights reserved.
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center !important;
          }
          .footer-cols > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}