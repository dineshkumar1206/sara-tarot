import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_DATA = [
  {
    id: 'healing-relationship',
    name: 'Relationship Healing Session',
    price: 7000,
    type: 'Duration: 40 minutes',
    desc: 'Clears toxic residue, heals emotional wounds, and opens heart chakra channels to restore relationship peace.'
  },
  {
    id: 'healing-money',
    name: 'Money Attraction Healing',
    price: 7000,
    type: 'Duration: 40 minutes',
    desc: 'Removes financial blockages, aligns root and solar plexus chakra frequencies to attract career growth and wealth.'
  },
  {
    id: 'healing-peace',
    name: 'Mental Peace & Aura Cleansing',
    price: 7000,
    type: 'Duration: 40 minutes',
    desc: 'Dissolves stress, anxiety, and external negative vibes. Restores sleep cycles and mental clarity.'
  },
  {
    id: 'healing-protection',
    name: 'Protection Healing Shield',
    price: 7000,
    type: 'Duration: 40 minutes',
    desc: 'Builds a protective auric shield to neutralize negative thoughts, evil eyes, and external psychic attacks.'
  }
];

const POLICY_DATA = {
  intro: 'Spiritual Healing Guidelines:',
  points: [
    'Conducted online via Zoom or WhatsApp video/audio call.',
    'Includes pre-session energy scan and post-session guidelines.',
    'Appointments scheduled within 10 days of payment confirmation. Express slots available (+Rs. 1,000).'
  ]
};

export default function SpiritualHealing({ cart = [], setCart }) {
  const [expressChecked, setExpressChecked] = useState(false);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    let finalPrice = item.price;
    let nameSuffix = '';

    if (expressChecked) {
      finalPrice += 1000;
      nameSuffix = ' (Express 24H)';
    }

    const cartItemId = expressChecked ? `${item.id}-express` : item.id;
    const existingItem = cart.find((c) => c.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === cartItemId
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: `${item.name}${nameSuffix}`,
          price: finalPrice,
          image: '/saraa-logo.jpeg',
          quantity: 1
        }
      ]);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
          <span style={{ color: '#dfba6b' }}>Spiritual Healing</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
          <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            RESTORE ENERGY AND HARMONY
          </span>
          <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            Spiritual Healing
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: 0 }}>
            Experience deep energy cleansing and aura healing. Clear mental blockages, dissolve negative energies, and invite wealth, love, and protection into your life.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap' }}>
          
          {/* Items Listing Column */}
          <div style={{ flex: '2 1 600px' }}>
            <h3 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Available Bookings
            </h3>

            {/* Express Booking Toggle */}
            <div 
              style={{ 
                backgroundColor: 'rgba(223, 186, 107, 0.05)', 
                border: '1px solid rgba(223, 186, 107, 0.3)', 
                borderRadius: '4px',
                padding: '1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setExpressChecked(!expressChecked)}
            >
              <input 
                type="checkbox" 
                checked={expressChecked}
                onChange={() => {}}
                style={{ 
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                  accentColor: '#dfba6b'
                }} 
              />
              <div>
                <div style={{ fontWeight: '600', color: '#dfba6b', fontSize: '14px', letterSpacing: '0.5px' }}>
                  ADD EXPRESS BOOKING (+ Rs. 1,000)
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(243, 240, 234, 0.7)', marginTop: '2px' }}>
                  Guarantees your appointment within 24 hours of payment verification (instead of the standard 10 days wait).
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {ITEMS_DATA.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    backgroundColor: '#130f24',
                    border: '1px solid rgba(223, 186, 107, 0.15)',
                    borderRadius: '4px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.4)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ flex: '1 1 280px' }}>
                    <div style={{ color: '#dfba6b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                      {item.type}
                    </div>
                    <h4 style={{ color: '#f3f0ea', fontSize: '1.35rem', margin: '4px 0 8px 0', fontWeight: '500' }}>
                      {item.name}
                    </h4>
                    <p style={{ color: 'rgba(243, 240, 234, 0.75)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '0.75rem', minWidth: '150px' }}>
                    <div style={{ color: '#dfba6b', fontSize: '1.75rem', fontWeight: '600' }}>
                      ₹{(item.price + (expressChecked ? 1000 : 0)).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      style={{
                        backgroundColor: '#dfba6b',
                        color: '#0f0c1b',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '0.75rem 1.5rem',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Book & Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Sidebar Column */}
          <div style={{ flex: '1 1 300px' }}>
            <div 
              style={{
                backgroundColor: '#130f24',
                border: '1px solid rgba(223, 186, 107, 0.25)',
                borderRadius: '6px',
                padding: '2rem',
                position: 'sticky',
                top: '120px',
                backgroundImage: 'linear-gradient(to bottom, rgba(223, 186, 107, 0.02), transparent)'
              }}
            >
              <h4 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Important Notes
              </h4>
              <p style={{ color: 'rgba(243, 240, 234, 0.9)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {POLICY_DATA.intro}
              </p>
              
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'rgba(243, 240, 234, 0.75)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                {POLICY_DATA.points.map((pt, i) => (
                  <li key={i} style={{ marginBottom: '0.8rem', listStyleType: 'square' }}>
                    {pt}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid rgba(223, 186, 107, 0.15)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: 'rgba(243, 240, 234, 0.5)', display: 'block', marginBottom: '1rem' }}>
                  All sessions require pre-payment verification.
                </span>
                <Link 
                  to="/checkout" 
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    color: '#dfba6b',
                    border: '1px solid rgba(223, 186, 107, 0.5)',
                    padding: '0.75rem',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
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
                  View My Cart / Pay
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
