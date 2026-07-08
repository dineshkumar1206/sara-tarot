import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_DATA = [
  {
    id: 'crystal-rashi',
    name: 'Rashi Crystal',
    price: 1500,
    type: 'Blessed & Energized',
    desc: 'Harmonized for your specific zodiac sign (Rashi) to promote balance, aura cleansing, and positive celestial energy.',
    image: '/rashi.png',
    inclusions: [
      'Specially selected for your Rashi (Moon Sign)',
      'Spiritually cleansed and energized',
      'Couriered with sacred prasadham and care instructions'
    ]
  },
  {
    id: 'crystal-dhanyog',
    name: 'Dhanyog Crystal',
    price: 1800,
    type: 'Blessed & Energized',
    desc: 'Attracts financial growth, stability, and wealth abundance. Perfect for offices, lockers, and cash registers.',
    image: '/dhanyog.png',
    inclusions: [
      'Attracts wealth and success vibrations',
      'Spiritually cleansed and energized by Saraa',
      'Couriered with sacred prasadham and activation guide'
    ]
  },
  {
    id: 'crystal-bracelet',
    name: 'Crystal Bracelet',
    price: 1200,
    type: 'Blessed & Energized',
    desc: 'Elegant and powerful healing crystal bead bracelet to protect your aura and maintain daily emotional peace.',
    image: '/bracelet.png',
    inclusions: [
      'Premium hand-picked crystal beads',
      'Spiritually cleansed and energized for protection',
      'Couriered with sacred prasadham and care instructions'
    ]
  },
  {
    id: 'crystal-karungali',
    name: 'Karungali Malai / Bracelet',
    price: 1600,
    type: 'Blessed & Energized',
    desc: 'Handcrafted black ebony wood beads to absorb negativity, enhance willpower, and shield against evil eye.',
    image: '/karungali.png',
    inclusions: [
      'Authentic black ebony (Karungali) wood',
      'Spiritually energized for shielding and confidence',
      'Couriered with sacred prasadham'
    ]
  },
  {
    id: 'crystal-rudraksh',
    name: 'Blessed Rudraksh Bead',
    price: 1000,
    type: 'Blessed & Energized',
    desc: 'Sacred natural Rudraksh bead representing Lord Shiva. Instills deep mental peace, focus, and health.',
    image: '/rudraksh.png',
    inclusions: [
      'Sacred natural Rudraksh bead',
      'Spiritually energized for health and meditation focus',
      'Couriered with sacred prasadham and care guide'
    ]
  },
  {
    id: 'crystal-yantra',
    name: 'Energized Yantra',
    price: 2000,
    type: 'Blessed & Energized',
    desc: 'Sacred geometry plate for homes/temples. Channellizes positive energy flows and repels dark vibrations.',
    image: '/yantra.png',
    inclusions: [
      'Sacred geometric copper/brass yantra plate',
      'Spiritually energized for home protection and harmony',
      'Couriered with sacred prasadham and installation details'
    ]
  },
  {
    id: 'crystal-pyrite',
    name: 'Golden Pyrite',
    price: 1800,
    type: 'Blessed & Energized',
    desc: 'The golden stone of luck, abundance, and business growth. Ideal for work tables and wealth manifestation.',
    image: '/pyrite.png',
    inclusions: [
      'High-grade golden Pyrite crystal',
      'Spiritually energized for wealth attraction',
      'Couriered with sacred prasadham and care instructions'
    ]
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
  const [activeItemId, setActiveItemId] = useState(null);

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

  const handleOpenPopup = (itemId, e) => {
    e.stopPropagation();
    setActiveItemId(itemId);
  };

  const handleClosePopup = () => {
    setActiveItemId(null);
  };

  const currentItem = ITEMS_DATA.find((item) => item.id === activeItemId);

  return (
    <div style={{ backgroundColor: '#0f0c1b', minHeight: '100vh', color: '#f3f0ea', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem 6rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', fontSize: '13px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: 'rgba(243, 240, 234, 0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(243, 240, 234, 0.3)', margin: '0 8px' }}>/</span>
          <span style={{ color: '#dfba6b' }}>Crystals</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '4rem', borderBottom: '1px solid rgba(223, 186, 107, 0.15)', paddingBottom: '2.5rem' }}>
          <span style={{ color: '#dfba6b', letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            SACRED GEOMETRY & ENERGY TOOLS
          </span>
          <h1 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            Crystals
          </h1>
          <p style={{ color: 'rgba(243, 240, 234, 0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: 0 }}>
            A curated selection of natural crystals, hand-selected, cleansed, and programmed with specific intentions by Sara to support your healing and manifest your desires.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap' }}>
          
          {/* Items Listing Column */}
          <div style={{ flex: '2 1 600px' }}>
            <h3 style={{ color: '#dfba6b', fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(223, 186, 107, 0.1)', paddingBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Available Products
            </h3>

            {/* Cards Grid Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}>
              {ITEMS_DATA.map((item) => (
                <div 
                  key={item.id}
                  onClick={(e) => handleOpenPopup(item.id, e)}
                  style={{
                    backgroundColor: '#130f24',
                    border: '1px solid rgba(223, 186, 107, 0.15)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(223, 186, 107, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Card Image */}
                  {item.image && (
                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #130f24, transparent)' }} />
                    </div>
                  )}

                  {/* Card Content */}
                  <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#dfba6b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '4px' }}>
                        {item.type}
                      </div>
                      <h4 style={{ color: '#f3f0ea', fontSize: '1.15rem', margin: '0 0 0.5rem 0', fontWeight: '500', lineHeight: '1.3' }}>
                        {item.name}
                      </h4>
                      <p style={{ color: 'rgba(243, 240, 234, 0.7)', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1rem 0' }}>
                        {item.desc}
                      </p>
                    </div>

                    <div>
                      <div style={{ color: '#dfba6b', fontSize: '1.4rem', fontWeight: '600', margin: '0.75rem 0' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                        <button 
                          onClick={(e) => handleOpenPopup(item.id, e)}
                          style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: '#dfba6b',
                            border: '1px solid rgba(223, 186, 107, 0.4)',
                            padding: '0.6rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          Details
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          style={{
                            flex: 1,
                            backgroundColor: '#dfba6b',
                            color: '#0f0c1b',
                            border: 'none',
                            padding: '0.6rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
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
                  All products require pre-payment verification.
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

      {/* --- DETAILS MODAL POPUP --- */}
      {activeItemId && currentItem && (
        <div 
          onClick={handleClosePopup}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 8, 20, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Modal Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#130f24',
              border: '1px solid rgba(223, 186, 107, 0.25)',
              borderRadius: '8px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              padding: '2.5rem',
              boxSizing: 'border-box',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Elegant Cross Closing Button */}
            <button 
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#dfba6b',
                fontSize: '2rem',
                fontWeight: '300',
                cursor: 'pointer',
                lineHeight: '1',
                padding: '4px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              &times;
            </button>

            {/* Content Split Layout */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              
              {/* Left Column: Image */}
              {currentItem.image && (
                <div style={{ flex: '1 1 350px' }}>
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.name} 
                    style={{ 
                      width: '100%', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(223, 186, 107, 0.15)', 
                      objectFit: 'cover', 
                      height: '100%',
                      minHeight: '300px',
                      maxHeight: '400px'
                    }}
                  />
                </div>
              )}

              {/* Right Column: Text & Pricing Info */}
              <div style={{ flex: '1 2 400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '600' }}>
                    {currentItem.type}
                  </span>
                  <h2 style={{ color: '#f3f0ea', fontSize: '1.8rem', fontWeight: '300', margin: '0.5rem 0 0.75rem 0', lineHeight: '1.3' }}>
                    {currentItem.name}
                  </h2>
                  <div style={{ color: '#dfba6b', fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                    ₹{currentItem.price.toLocaleString('en-IN')}
                  </div>
                  
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(223, 186, 107, 0.15)', margin: '1rem 0' }} />
                  
                  <p style={{ color: 'rgba(243, 240, 234, 0.8)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {currentItem.desc}
                  </p>

                  <h4 style={{ color: '#dfba6b', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    What this product includes:
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0 0 2rem 0', color: 'rgba(243, 240, 234, 0.75)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                    {currentItem.inclusions.map((inc, index) => (
                      <li key={index} style={{ marginBottom: '0.4rem' }}>{inc}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={(e) => {
                    handleAddToCart(currentItem);
                    handleClosePopup();
                  }}
                  style={{
                    backgroundColor: '#dfba6b',
                    color: '#0f0c1b',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: '2px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Add To Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
