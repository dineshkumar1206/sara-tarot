import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();


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
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Centre:</span> SARA HEALING CENTRE</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Address:</span> Shri sathya nagar, Othivakkam</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Location:</span> Guduvanchery, Chengalpattu</li>
            </ul>
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
              {/* Facebook Link */}
              <a href="#facebook" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              {/* Instagram Link */}
              <a href="#instagram" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* X Link */}
              <a href="#x" style={{ color: '#dfba6b', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Email:</span> tamiltarotmagic@gmail.com</li>
              <li style={{ marginBottom: '8px' }}><span style={{ color: '#dfba6b', fontWeight: '500' }}>Phone:</span> +91 96551 99507</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Services */}
        <div 
          className="footer-bottom-row"
          style={{
            borderTop: '1px solid rgba(223, 186, 107, 0.15)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
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