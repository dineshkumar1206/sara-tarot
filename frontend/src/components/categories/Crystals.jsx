import React from 'react';
import { Link } from 'react-router-dom';

const ITEMS_DATA = [
  {
    id: 'crystal-pyrite',
    name: 'Golden Pyrite Cluster',
    price: 1800,
    type: 'Blessed and Energized',
    desc: 'The ultimate stone for wealth, abundance, and business opportunities. Place it on your work desk or home locker.',
    image: '/Golden-Pyrite-Cluster.png'
  },
  {
    id: 'crystal-amethyst',
    name: 'Raw Amethyst Geode',
    price: 1500,
    type: 'Blessed and Energized',
    desc: 'Promotes deep calm, stress relief, and opens the third-eye chakra. Perfect for your home temple or meditation room.',
    image: '/Raw-Amethyst-Geode.png'
  },
  {
    id: 'crystal-rose-quartz',
    name: 'Rose Quartz Love Bowl / Tumbles',
    price: 1400,
    type: 'Blessed and Energized',
    desc: 'Emits gentle vibes of unconditional love, compassion, and emotional healing. Harmonizes relationship conflicts.',
    image: '/Rose-Quartz-Love-Bowl-Tumbles.png'
  },
  {
    id: 'crystal-tourmaline',
    name: 'Raw Black Tourmaline Shield',
    price: 1600,
    type: 'Blessed and Energized',
    desc: 'The strongest grounding and protective stone. Deflects psychic attack, evil-eye, and absorbs electromagnetic haze.',
    image: '/Raw-Black-Tourmaline-Shield.png'
  },
  {
    id: 'crystal-clear-quartz',
    name: 'Clear Quartz Generator Point',
    price: 1200,
    type: 'Blessed and Energized',
    desc: 'The master healer. Amplifies the energy of other crystals and purifies the local environment of stagnant energy.',
    image: '/Clear-Quartz-Generator-Point.png'
  }
];

const POLICY_DATA = {
  intro: 'Crystal Delivery Details:',
  points: [
    'All crystals are physically cleansed and spiritually energized in India prior to dispatch.',
    'Shipped with sacred prasadham and instructions on crystal care and reprogramming.',
    'Dispatched within 3-5 working days of booking confirmation.'
  ]
};

export default function Crystals({ cart = [], setCart, setIsCartOpen }) {
  const handleAddToCart = (item) => {
    if (!setCart) return;

    const existingItem = cart.find((c) => c.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image || '/saraa-logo.jpeg',
          quantity: 1
        }
      ]);
    }

    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
          <span style={{ color: '#dfba6b' }}>Blessed & Energized Crystals</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
          <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            SACRED GEOMETRY & ENERGY TOOLS
          </span>
          <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            Blessed & Energized Crystals
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: 0 }}>
            A curated selection of natural crystals, hand-selected, cleansed, and programmed with specific intentions by Sara to support your healing and manifest your desires.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap' }}>
          
          {/* Items Listing Column */}
          <div style={{ flex: '2 1 600px' }}>
            <h3 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Available Bookings
            </h3>

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
                  {item.image && (
                    <div style={{ width: '120px', height: '120px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(223, 186, 107, 0.2)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
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
                      ₹{item.price.toLocaleString('en-IN')}
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
